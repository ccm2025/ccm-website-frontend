import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface VolunteerPageAttributes {
	hero_title: string;
	hero_image: StrapiMedia;
	introduction_subtitle: string;
	introduction_title: string;
	introduction_content: StyledTextProps[];
	application_button_text: string;
	application_button_url: string;
	volunteer_title: string;
	volunteer_content: StyledTextProps[];
}

export const load: PageServerLoad = async ({ platform, request, cookies }) => {
	return fetch<VolunteerPageAttributes>({
		platform,
		request,
		endpoint: '/api/volunteer-page',
		params: {
			locale: cookies.get('locale'),
			populate: {
				hero_image: true,
				introduction_content: true,
				volunteer_content: true
			}
		},
		callback: (data) => ({
			page: {
				...data,
				hero_image: getMedia(data.hero_image, 'Hero image')
			}
		})
	});
};
