import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

export interface Event {
	id: number;
	title: string;
	hero_image: StrapiMedia;
	date: string;
	slug: string;
	content: StyledTextProps[];
	content_image: StrapiMedia;
	content_video_url: string;
}

interface GatheringsPageAttributes {
	hero_title: string;
	hero_image: StrapiMedia;
	upcoming_events_subtitle: string;
	upcoming_events_title: string;
	upcoming_events_empty_text: string;
	past_events_subtitle: string;
	past_events_title: string;
	past_events_empty_text: string;
}

export const load: PageServerLoad = async ({ platform, request, params }) => {
	const today = new Date().toISOString();
	const { lang } = params;
	const callbackEvents = (events: Event[]) => ({
		page: events.map((event) => ({
			...event,
			date: new Date(event.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}),
			hero_image: getMedia(event.hero_image, 'Event hero image'),
			content_image: getMedia(event.content_image, 'Event content image')
		}))
	});

	const callbackEventsPage = (data: GatheringsPageAttributes) => ({
		page: {
			...data,
			hero_image: getMedia(data.hero_image, 'Hero image')
		}
	});

	const [pageRes, upcomingEventsRes, pastEventsRes] = await Promise.all([
		fetch<GatheringsPageAttributes>({
			platform,
			request,
			endpoint: '/api/events-page',
			params: {
				locale: lang,
				populate: { hero_image: true }
			},
			callback: callbackEventsPage
		}),
		fetch<Event[]>({
			platform,
			request,
			endpoint: '/api/events',
			params: {
				locale: lang,
				populate: { hero_image: true, content: true, content_image: true },
				sort: 'date:asc',
				filters: { date: { $gte: today }, slug: { $ne: 'outreach-events' } }
			},
			callback: callbackEvents
		}),
		fetch<Event[]>({
			platform,
			request,
			endpoint: '/api/events',
			params: {
				locale: lang,
				populate: { hero_image: true, content_image: true },
				sort: 'date:desc',
				filters: { date: { $lt: today }, slug: { $ne: 'outreach-events' } }
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
