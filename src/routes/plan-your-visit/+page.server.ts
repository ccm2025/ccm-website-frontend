import { api, apiUrl } from '$lib';
import type { StrapiImage, StrapiResponse, StyledTextProps } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import type { PageServerLoad } from './$types';

interface ScheduleItem {
	id: number;
	description: StyledTextProps[];
	image: StrapiImage;
}

interface PlanYourVisitPageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	introduction_subtitle: string;
	introduction_title: string;
	introduction_content: ScheduleItem;
	schedule_title: string;
	schedule_items: ScheduleItem[];
	location_text: StyledTextProps[];
	location_map_image: StrapiImage;
}

type PlanYourVisitPageResponse = StrapiResponse<PlanYourVisitPageAttributes>;

export const load: PageServerLoad = async () => {
	try {
		const response = await api.get<PlanYourVisitPageResponse>('/api/plan-your-visit-page', {
			params: {
				populate: {
					hero_image: true,
					introduction_content: {
						populate: {
							image: true,
							description: true
						}
					},
					schedule_items: {
						populate: {
							image: true,
							description: true
						}
					},
					location_text: true,
					location_map_image: true
				},
				locale: 'en'
			}
		});

		const pageData = response.data.data;

		if (!pageData) {
			throw error(404, 'Plan Your Visit page data not found.');
		}

		return {
			page: {
				heroTitle: pageData.hero_title,
				heroImageUrl: pageData.hero_image
					? pageData.hero_image.url.startsWith('https')
						? pageData.hero_image.url
						: `${apiUrl}${pageData.hero_image.url}`
					: 'https://placehold.co/600x400?text=Plan+Your+Visit',
				introductionSubtitle: pageData.introduction_subtitle,
				introductionTitle: pageData.introduction_title,
				introductionContent: {
					...pageData.introduction_content,
					imageUrl: pageData.introduction_content.image
						? pageData.introduction_content.image.url.startsWith('https')
							? pageData.introduction_content.image.url
							: `${apiUrl}${pageData.introduction_content.image.url}`
						: 'https://placehold.co/400x400?text=Introduction+Image',
					imageAlt: pageData.introduction_content.image?.alternativeText || `Introduction Image`
				},
				scheduleTitle: pageData.schedule_title,
				scheduleItems: pageData.schedule_items.map((item) => ({
					...item,
					imageUrl: item.image
						? item.image.url.startsWith('https')
							? item.image.url
							: `${apiUrl}${item.image.url}`
						: 'https://placehold.co/400x400?text=Schedule+Item',
					imageAlt: item.image?.alternativeText || `Schedule Item ${item.id}`
				})),
				locationText: pageData.location_text,
				locationMapImageUrl: pageData.location_map_image
					? pageData.location_map_image.url.startsWith('https')
						? pageData.location_map_image.url
						: `${apiUrl}${pageData.location_map_image.url}`
					: 'https://placehold.co/600x400?text=Location+Map',
				locationMapImageAlt: pageData.location_map_image?.alternativeText || 'Location Map'
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
