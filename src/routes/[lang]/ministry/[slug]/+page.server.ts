import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface Ministry {
	id: number;
	title: string;
	hero_image: StrapiMedia;
	slug: string;
	content: StyledTextProps[];
	content_image: StrapiMedia;
}

export const load: PageServerLoad = async ({ params }) => {
	const { lang, slug } = params;
	return fetch<Ministry[]>({
		endpoint: '/api/ministries',
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
