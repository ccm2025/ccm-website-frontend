import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface InfoSection {
	id: number;
	subtitle: string;
	title: string;
	content: StyledTextProps[];
	image: StrapiMedia;
	button_text?: string;
	button_url?: string;
}

interface FreshmanPageAttributes {
	hero_title: string;
	hero_image: StrapiMedia;
	info_sections: InfoSection[];
}

export const load: PageServerLoad = async ({ platform, request }) => {
	return fetch<FreshmanPageAttributes>({
		platform,
		request,
		endpoint: '/api/freshman-page',
		params: {
			locale: 'en',
			populate: {
				hero_image: true,
				info_sections: {
					populate: {
						image: true,
						content: true
					}
				}
			}
		},
		callback: (data) => ({
			page: {
				...data,
				hero_image: getMedia(data.hero_image, 'Hero image'),
				info_sections: data.info_sections.map((section) => ({
					...section,
					image: getMedia(section.image, 'Info section image')
				}))
			}
		})
	});
};
