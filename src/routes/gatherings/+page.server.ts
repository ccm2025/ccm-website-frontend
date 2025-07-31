import { fetch, getMedia } from '$lib';
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

export const load: PageServerLoad = async ({ platform, request }) => {
	const today = new Date().toISOString();

	const callbackEvents = (events: Event[]) => ({
		page: events.map((event) => ({
			...event,
			date: new Date(event.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}),
			image: getMedia(event.image, 'Event image')
		}))
	});

	const callbackGatheringsPage = (data: GatheringsPageAttributes) => ({
		page: {
			...data,
			hero_image: getMedia(data.hero_image, 'Hero image'),
			categories: data.categories?.map((category) => ({
				...category,
				image: getMedia(category.image, 'Category image')
			}))
		}
	});

	const [pageRes, upcomingEventsRes, pastEventsRes] = await Promise.all([
		fetch<GatheringsPageAttributes>({
			platform,
			request,
			endpoint: '/api/gatherings-page',
			params: {
				locale: 'en',
				populate: { hero_image: true, categories: { populate: { image: true } } }
			},
			callback: callbackGatheringsPage
		}),
		fetch<Event[]>({
			platform,
			request,
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
			platform,
			request,
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
