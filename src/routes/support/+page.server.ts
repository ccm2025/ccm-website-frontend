import { apiUrl, fetch } from '$lib';
import type { StrapiImage, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface InfoSection {
	id: number;
	subtitle: string;
	title: string;
	content: StyledTextProps[];
	image: StrapiImage;
	button_text?: string;
	button_url?: string;
}

interface SupportPageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	info_sections: InfoSection[];
}

export const load: PageServerLoad = async () => {
	return fetch<SupportPageAttributes>({
		endpoint: '/api/support-page',
		params: {
			populate: {
				hero_image: true,
				info_sections: {
					populate: {
						image: true,
						content: true
					}
				}
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
						: 'https://placehold.co/600x400?text=Support',
					alt: data.hero_image?.alt || 'Support Hero Image'
				},
				info_sections: data.info_sections.map((section) => ({
					...section,
					image: {
						url: section.image
							? section.image.url.startsWith('https')
								? section.image.url
								: `${apiUrl}${section.image.url}`
							: 'https://placehold.co/200x200?text=InfoSection',
						alt: section.image?.alt || section.title
					}
				}))
			}
		})
	});
};
