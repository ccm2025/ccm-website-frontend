import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from '../events/$types';

export interface Event {
	id: number;
	title: string;
	hero_image: StrapiMedia;
	date: string;
	slug: string;
	content: StyledTextProps[];
	content_media: StrapiMedia;
}

interface Category {
	id: number;
	title: string;
	image: StrapiMedia;
	slug: string;
}

interface GatheringsPageAttributes {
	hero_title: string;
	hero_image: StrapiMedia;
	categories_subtitle: string;
	categories_title: string;
	categories: Category[];
	upcoming_events_subtitle: string;
	upcoming_events_title: string;
	upcoming_events_empty_text: string;
	past_events_subtitle: string;
	past_events_title: string;
	past_events_empty_text: string;
}

export const load: PageServerLoad = async ({ platform, request, cookies }) => {
	const today = new Date().toISOString();

	const callbackEvents = (events: Event[]) => ({
		page: events.map((event) => ({
			...event,
			date: new Date(event.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}),
			hero_image: getMedia(event.hero_image, 'Event hero image'),
			content_media: getMedia(event.content_media, 'Event content media')
		}))
	});

	const callbackEventsPage = (data: GatheringsPageAttributes) => ({
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
			endpoint: '/api/events-page',
			params: {
				locale: cookies.get('locale'),
				populate: { hero_image: true, categories: { populate: { image: true } } }
			},
			callback: callbackEventsPage
		}),
		fetch<Event[]>({
			platform,
			request,
			endpoint: '/api/events',
			params: {
				locale: cookies.get('locale'),
				populate: { content_media: true, content: true },
				sort: 'date:asc',
				filters: { date: { $gte: today }, slug: { $ne: 'gospel-activities' } }
			},
			callback: callbackEvents
		}),
		fetch<Event[]>({
			platform,
			request,
			endpoint: '/api/events',
			params: {
				locale: cookies.get('locale'),
				populate: { content_media: true },
				sort: 'date:desc',
				filters: { date: { $lt: today }, slug: { $ne: 'gospel-activities' } }
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
