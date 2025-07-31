import { apiUrl, fetch } from '$lib';
import type { StrapiImage, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface VolunteerPageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	introduction_subtitle: string;
	introduction_title: string;
	introduction_content: StyledTextProps[];
	application_button_text: string;
	application_button_url: string;
	volunteer_title: string;
	volunteer_content: StyledTextProps[];
}

export const load: PageServerLoad = async ({ platform, request }) => {
	return fetch<VolunteerPageAttributes>({
		platform,
		request,
		endpoint: '/api/volunteer-page',
		params: {
			populate: {
				hero_image: true,
				introduction_content: true,
				volunteer_content: true
			},
			locale: 'en'
		},
		callback: (data) => ({
			page: {
				...data,
				hero_image: {
					url: data.hero_image
						? data.hero_image.url.startsWith('https')
							? data.hero_image.url
							: `${apiUrl}${data.hero_image.url}`
						: 'https://placehold.co/1200x600?text=Volunteer+Background',
					alt: data.hero_image?.alt || 'Volunteer Hero Image'
				}
			}
		})
	});
};
