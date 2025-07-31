import { fetch, getMedia } from '$lib';
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
				hero_image: getMedia(data.hero_image, 'Hero image'),
				introduction_content: {
					...data.introduction_content,
					image: getMedia(data.introduction_content.image, 'Introduction image')
				},
				schedule_items: data.schedule_items.map((item) => ({
					...item,
					image: getMedia(item.image, 'Schedule item image')
				})),
				location_map_image: getMedia(data.location_map_image, 'Location map image')
			}
		})
	});
};
