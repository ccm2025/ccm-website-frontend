import { apiUrl, fetch } from '$lib';
import type { StrapiImage, StyledTextProps } from '$lib/types';
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

export const load: PageServerLoad = async ({ platform, request }) => {
	return fetch<PlanYourVisitPageAttributes>({
		platform,
		request,
		endpoint: '/api/plan-your-visit-page',
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
		},
		callback: (data) => ({
			page: {
				...data,
				hero_image: {
					url: data.hero_image
						? data.hero_image.url.startsWith('https')
							? data.hero_image.url
							: `${apiUrl}${data.hero_image.url}`
						: 'https://placehold.co/600x400?text=Plan+Your+Visit',
					alt: data.hero_image?.alt || 'Plan Your Visit Hero Image'
				},
				introduction_content: {
					...data.introduction_content,
					image: {
						url: data.introduction_content.image
							? data.introduction_content.image.url.startsWith('https')
								? data.introduction_content.image.url
								: `${apiUrl}${data.introduction_content.image.url}`
							: 'https://placehold.co/400x400?text=Introduction+Image',
						alt: data.introduction_content.image?.alt || `Introduction Image`
					}
				},
				schedule_items: data.schedule_items.map((item) => ({
					...item,
					image: {
						url: item.image
							? item.image.url.startsWith('https')
								? item.image.url
								: `${apiUrl}${item.image.url}`
							: 'https://placehold.co/400x400?text=Schedule+Item',
						alt: item.image?.alt || `Schedule Item ${item.id}`
					}
				})),
				location_map_image: {
					url: data.location_map_image
						? data.location_map_image.url.startsWith('https')
							? data.location_map_image.url
							: `${apiUrl}${data.location_map_image.url}`
						: 'https://placehold.co/600x400?text=Location+Map',
					alt: data.location_map_image?.alt || 'Location Map'
				}
			}
		})
	});
};
