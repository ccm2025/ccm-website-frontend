import { fetch, getMedia } from '$lib';
import type { StrapiImage, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface Event {
	id: number;
	title: string;
	date: string;
	image: StrapiImage;
	content: StyledTextProps[];
}

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
				image: true,
				content: true
			},
			locale: 'en'
		},
		callback: (data) => ({
			page: [
				{
					...data[0],
					image: getMedia(data[0].image, 'Event image')
				}
			]
		})
	});
};
