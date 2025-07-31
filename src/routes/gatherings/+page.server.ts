import { apiUrl, fetch } from '$lib';
import type { StrapiImage, StyledTextProps } from '$lib/types';
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
	categories: Category[];
	events_subtitle: string;
	events_title: string;
	events_empty_text: string;
	past_events_subtitle: string;
	past_events_title: string;
	past_events_empty_text: string;
}

export const load: PageServerLoad = async () => {
	const today = new Date().toISOString();

	const callbackEvents = (events: Event[]) => ({
		page: events.map((event) => ({
			...event,
			date: new Date(event.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}),
			image: {
				url: event.image
					? event.image.url.startsWith('https')
						? event.image.url
						: `${apiUrl}${event.image.url}`
					: 'https://placehold.co/600x400?text=Event',
				alt: event.image?.alt || event.title
			}
		}))
	});

	const callbackGatheringsPage = (data: GatheringsPageAttributes) => ({
		page: {
			...data,
			hero_image: {
				url: data.hero_image
					? data.hero_image.url.startsWith('https')
						? data.hero_image.url
						: `${apiUrl}${data.hero_image.url}`
					: 'https://placehold.co/1200x600?text=Hero+Image',
				alt: data.hero_image?.alt || data.hero_title
			},
			categories: data.categories?.map((category) => ({
				...category,
				image: {
					url: category.image
						? category.image.url.startsWith('https')
							? category.image.url
							: `${apiUrl}${category.image.url}`
						: 'https://placehold.co/600x400?text=Category',
					alt: category.image?.alt || category.title
				}
			}))
		}
	});

	const [pageRes, upcomingEventsRes, pastEventsRes] = await Promise.all([
		fetch<GatheringsPageAttributes>({
			endpoint: '/api/gatherings-page',
			params: {
				locale: 'en',
				populate: { hero_image: true, categories: { populate: { image: true } } }
			},
			callback: callbackGatheringsPage
		}),
		fetch<Event[]>({
			endpoint: '/api/events',
			params: {
				locale: 'en',
				populate: { image: true },
				sort: 'date:asc',
				filters: { date: { $gte: today } }
			},
			callback: callbackEvents
		}),
		fetch<Event[]>({
			endpoint: '/api/events',
			params: {
				locale: 'en',
				populate: { image: true },
				sort: 'date:desc',
				filters: { date: { $lt: today } }
			},
			callback: callbackEvents
		})
	]);

	return {
		page: {
			...pageRes.page,
			upcoming_events: upcomingEventsRes.page,
			past_events: pastEventsRes.page
		}
	};
};
