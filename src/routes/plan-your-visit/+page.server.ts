import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface ScheduleItem {
	id: number;
	description: StyledTextProps[];
	image: StrapiMedia;
}

interface PlanYourVisitPageAttributes {
	hero_title: string;
	hero_image: StrapiMedia;
	introduction_subtitle: string;
	introduction_title: string;
	introduction_content: ScheduleItem;
	schedule_title: string;
	schedule_items: ScheduleItem[];
	location_text: StyledTextProps[];
	location_map_link: string;
}

export const load: PageServerLoad = async ({ platform, request, cookies }) => {
	return fetch<PlanYourVisitPageAttributes>({
		platform,
		request,
		endpoint: '/api/plan-your-visit-page',
		params: {
			locale: cookies.get('locale'),
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
				location_text: true
			}
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
				}))
			}
		})
	});
};
