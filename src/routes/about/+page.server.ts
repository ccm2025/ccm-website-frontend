import { fetch, getMedia } from '$lib';
import type { StrapiImage, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface HistoryStory {
	id: number;
	content: StyledTextProps[];
	image: StrapiImage;
}

interface TeamMember {
	id: number;
	name: string;
	description: string;
	avatar: StrapiImage;
}

interface AboutPageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	introduction_subtitle: string;
	introduction_title: string;
	introduction_content: StyledTextProps[];
	history_subtitle: string;
	history_title: string;
	history_section?: HistoryStory[];
	team_subtitle: string;
	team_title: string;
	team_section?: TeamMember[];
}

export const load: PageServerLoad = async ({ platform, request }) => {
	return fetch<AboutPageAttributes>({
		platform,
		request,
		endpoint: '/api/about-page',
		params: {
			locale: 'en',
			populate: {
				hero_image: true,
				introduction_content: true,
				history_section: {
					populate: {
						content: true,
						image: true
					}
				},
				team_section: {
					populate: {
						avatar: true
					}
				}
			}
		},
		callback: (data) => ({
			page: {
				...data,
				hero_image: getMedia(data.hero_image, 'Hero image'),
				history_section: data.history_section?.map((story) => ({
					...story,
					image: getMedia(story.image, 'History section image')
				})),
				team_section: data.team_section?.map((member) => ({
					...member,
					avatar: getMedia(member.avatar, 'Avatar')
				}))
			}
		})
	});
};
