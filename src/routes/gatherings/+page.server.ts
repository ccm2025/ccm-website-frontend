import { api, apiUrl } from '$lib';
import type { StrapiImage, StrapiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import type { PageServerLoad } from './$types';

interface Category {
	id: number;
	name: string;
	cover_image: StrapiImage;
}

interface Event {
	id: number;
	title: string;
	date: string;
	location: string;
	description: string;
	image: StrapiImage;
}

interface GatheringsPageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	categories_subtitle: string;
	categories_title: string;
	events_subtitle: string;
	events_title: string;
	past_events_subtitle: string;
	past_events_title: string;
	categories?: Category[];
}

type GatheringsPageResponse = StrapiResponse<GatheringsPageAttributes>;

export const load: PageServerLoad = async () => {
	const today = new Date().toISOString();

	try {
		const [pageRes, upcomingEventsRes, pastEventsRes] = await Promise.all([
			api.get<GatheringsPageResponse>('/api/gatherings-page', {
				params: {
					locale: 'en',
					populate: { hero_image: true, categories: { populate: { cover_image: true } } }
				}
			}),
			api.get<{ data: Event[] }>('/api/events', {
				params: {
					locale: 'en',
					populate: { image: true },
					sort: 'date:asc',
					filters: { date: { $gte: today } }
				}
			}),
			api.get<{ data: Event[] }>('/api/events', {
				params: {
					locale: 'en',
					populate: { image: true },
					sort: 'date:desc',
					filters: { date: { $lt: today } }
				}
			})
		]);

		const pageData = pageRes.data.data;

		if (!pageData) {
			throw error(404, 'Gatherings page data not found.');
		}

		const mapEvent = (event: Event) => ({
			id: event.id,
			title: event.title,
			date: new Date(event.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}),
			location: event.location,
			description: event.description,
			imageUrl: event.image?.url
				? `${apiUrl}${event.image.url}`
				: 'https://placehold.co/600x400?text=Event',
			imageAlt: event.image?.alternativeText || event.title
		});

		return {
			page: {
				heroTitle: pageData.hero_title,
				heroImageUrl: pageData.hero_image?.url
					? `${apiUrl}${pageData.hero_image.url}`
					: 'https://placehold.co/1200x600?text=Hero+Image',
				heroImageAlt: pageData.hero_image?.alternativeText || 'Hero image',
				categoriesSubtitle: pageData.categories_subtitle,
				categoriesTitle: pageData.categories_title,
				categories: pageData.categories?.map((category) => ({
					id: category.id,
					name: category.name,
					coverImageUrl: category.cover_image?.url
						? `${apiUrl}${category.cover_image.url}`
						: 'https://placehold.co/600x400?text=Category',
					coverImageAlt: category.cover_image?.alternativeText || category.name
				})),
				eventsSubtitle: pageData.events_subtitle,
				eventsTitle: pageData.events_title,
				pastEventsSubtitle: pageData.past_events_subtitle,
				pastEventsTitle: pageData.past_events_title
			},
			events: {
				upcoming: upcomingEventsRes.data.data.map(mapEvent),
				past: pastEventsRes.data.data.map(mapEvent)
			}
		};
	} catch (e) {
		console.error('Error fetching:', e);
		if (axios.isAxiosError(e)) {
			const status = e.response?.status || 500;
			const message = e.response?.data?.error?.message || 'Failed to load page data.';
			throw error(status, message);
		}
		throw error(500, 'An unexpected error occurred.');
	}
};
