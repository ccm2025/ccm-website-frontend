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

interface FreshmanPageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	info_sections: InfoSection[];
}

export const load: PageServerLoad = async () => {
	return fetch<FreshmanPageAttributes>({
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
		callback: (data) => {
			return {
				page: {
					...data,
					hero_image: {
						url: data.hero_image
							? data.hero_image.url.startsWith('https')
								? data.hero_image.url
								: `${apiUrl}${data.hero_image.url}`
							: 'https://placehold.co/600x400?text=Freshman',
						alt: data.hero_image?.alt || 'Freshman Hero Image'
					},
					info_sections: data.info_sections.map((section) => ({
						...section,
						image: {
							url: section.image
								? section.image.url.startsWith('https')
									? section.image.url
									: `${apiUrl}${section.image.url}`
								: 'https://placehold.co/400x400?text=InfoSection',
							alt: section.image?.alt || section.title
						}
					}))
				}
			};
		}
	});
};
