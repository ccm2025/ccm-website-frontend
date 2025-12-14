import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface ThankYouPageAttributes {
	hero_title: string;
	hero_image: StrapiMedia;
	content_title: string;
	contents: StyledTextProps[];
}

export const load: PageServerLoad = async ({ params }) => {
	const { lang } = params;
	return fetch<ThankYouPageAttributes>({
		endpoint: '/api/thank-you-page',
		params: {
			locale: lang,
			populate: {
				hero_image: true,
				contents: true
			}
		},
		callback: (data): { page: ThankYouPageAttributes } => ({
			page: {
				...data,
				hero_image: getMedia(data.hero_image, 'Hero image')
			}
		})
	});
};
