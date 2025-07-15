import { api, apiUrl } from '$lib';
import type { StrapiImage, StrapiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import type { PageServerLoad } from './$types';

interface InfoSection {
	id: number;
	subtitle: string;
	title: string;
	content: string;
	image: StrapiImage;
	button_text?: string;
	button_url?: string;
}

interface SupportPageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	info_sections: InfoSection[];
}

type SupportPageResponse = StrapiResponse<SupportPageAttributes>;

export const load: PageServerLoad = async () => {
	try {
		const response = await api.get<SupportPageResponse>('/api/support-page', {
			params: {
				populate: {
					hero_image: true,
					info_sections: {
						populate: 'image'
					}
				},
				locale: 'en'
			}
		});

		const pageData = response.data.data;

		if (!pageData) {
			throw error(404, 'Support page data not found.');
		}

		return {
			page: {
				heroTitle: pageData.hero_title,
				heroImageUrl: pageData.hero_image?.url
					? `${apiUrl}${pageData.hero_image.url}`
					: 'https://placehold.co/600x400?text=Support',
				infoSections: pageData.info_sections.map((section) => ({
					id: section.id,
					subtitle: section.subtitle,
					title: section.title,
					content: section.content,
					buttonText: section.button_text,
					buttonUrl: section.button_url,
					imageUrl: section.image?.url
						? `${apiUrl}${section.image.url}`
						: 'https://placehold.co/400x400?text=InfoSection',
					imageAlt: section.image?.alternativeText || section.title
				}))
			}
		};
	} catch (e) {
		console.error('Error fetching:', e);
		if (axios.isAxiosError(e)) {
			const status = e.response?.status || 500;
			const message = e.response?.data?.error?.message || 'Failed to load page data.';
			throw error(status, message);
		}
		throw error(500, 'An unexpected error occurred.');
	}
};
