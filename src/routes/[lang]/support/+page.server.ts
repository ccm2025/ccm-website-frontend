import { fetch, getMedia } from '$lib';
import type { InfoSection, StrapiMedia } from '$lib/types';
import type { PageServerLoad } from './$types';

interface SupportPageAttributes {
	hero_title: string;
	hero_image: StrapiMedia;
	info_sections: InfoSection[];
}

export const load: PageServerLoad = async ({ platform, request, params }) => {
	const { lang } = params;
	return fetch<SupportPageAttributes>({
		platform,
		request,
		endpoint: '/api/support-page',
		params: {
			locale: lang,
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
