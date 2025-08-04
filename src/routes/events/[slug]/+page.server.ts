import { fetch, getMedia } from '$lib';
import type { Event } from '../+page.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, request, params }) => {
	const { slug } = params;

	return fetch<Event[]>({
		platform,
		request,
		endpoint: '/api/events',
		params: {
			filters: {
				slug: {
					$eq: slug
				}
			},
			populate: {
				content: true,
				hero_image: true,
				content_media: true
			},
			locale: 'en'
		},
		callback: (data) => ({
			page: [
				{
					...data[0],
					hero_image: getMedia(data[0].hero_image, 'Event image'),
					content_media: getMedia(data[0].content_media, 'Event content media')
				}
			]
		})
	});
};
