import { apiUrl, fetch } from '$lib';
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

export const load: PageServerLoad = async () => {
	return fetch<AboutPageAttributes>({
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
				hero_image: {
					url: data.hero_image
						? data.hero_image.url.startsWith('https')
							? data.hero_image.url
							: `${apiUrl}${data.hero_image.url}`
						: 'https://placehold.co/1200x600?text=Hero+Image',
					alt: data.hero_image?.alt || 'Hero image'
				},
				history_section: data.history_section?.map((story) => ({
					...story,
					image: {
						url: story.image
							? story.image.url.startsWith('https')
								? story.image.url
								: `${apiUrl}${story.image.url}`
							: 'https://placehold.co/1200x600?text=History+Image',
						alt: story.image?.alt || 'History section image'
					}
				})),
				team_section: data.team_section?.map((member) => ({
					...member,
					avatar: {
						url: member.avatar
							? member.avatar.url.startsWith('https')
								? member.avatar.url
								: `${apiUrl}${member.avatar.url}`
							: 'https://placehold.co/600x600?text=Avatar',
						alt: member.avatar?.alt || member.name
					}
				}))
			}
		})
	});
};
