import { api, apiUrl } from '$lib';
import type { StrapiImage, StrapiResponse, StyledTextProps } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import type { PageServerLoad } from './$types';

interface Category {
	id: number;
	title: string;
	image: StrapiImage;
	slug: string;
}

interface Event {
	id: number;
	title: string;
	date: string;
	slug: string;
	content: StyledTextProps[];
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
	categories: Category[];
}

type GatheringsPageResponse = StrapiResponse<GatheringsPageAttributes>;

export const load: PageServerLoad = async () => {
	const today = new Date().toISOString();

	try {
		const [pageRes, upcomingEventsRes, pastEventsRes] = await Promise.all([
			api.get<GatheringsPageResponse>('/api/gatherings-page', {
				params: {
					locale: 'en',
					populate: { hero_image: true, categories: { populate: { image: true } } }
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
			...event,
			date: new Date(event.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}),
			imageUrl: event.image
				? event.image.url.startsWith('https')
					? event.image.url
					: `${apiUrl}${event.image.url}`
				: 'https://placehold.co/600x400?text=Event',
			imageAlt: event.image?.alternativeText || event.title
		});

		return {
			page: {
				heroTitle: pageData.hero_title,
				heroImageUrl: pageData.hero_image
					? pageData.hero_image.url.startsWith('https')
						? pageData.hero_image.url
						: `${apiUrl}${pageData.hero_image.url}`
					: 'https://placehold.co/1200x600?text=Hero+Image',
				heroImageAlt: pageData.hero_image?.alternativeText || 'Hero image',
				categoriesSubtitle: pageData.categories_subtitle,
				categoriesTitle: pageData.categories_title,
				categories: pageData.categories?.map((category) => ({
					...category,
					imageUrl: category.image
						? category.image.url.startsWith('https')
							? category.image.url
							: `${apiUrl}${category.image.url}`
						: 'https://placehold.co/600x400?text=Category',
					imageAlt: category.image?.alternativeText || category.title
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
