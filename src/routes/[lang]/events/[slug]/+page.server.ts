import { fetch, getMedia } from '$lib';
import type { Event } from '../+page.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, request, params }) => {
	const { lang, slug } = params;
	return fetch<Event[]>({
		platform,
		request,
		endpoint: '/api/events',
		params: {
			locale: lang,
			filters: {
				slug: {
					$eq: slug
				}
			},
			populate: {
				content: true,
				hero_image: true,
				content_image: true
			}
		},
		callback: (data) => ({
			page: [
				{
					...data[0],
					hero_image: getMedia(data[0].hero_image, 'Event image'),
					content_image: getMedia(data[0].content_image, 'Event content image')
				}
			]
		})
	});
};
