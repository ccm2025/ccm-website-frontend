import { api, apiUrl } from '$lib';
import type { StrapiImage, StrapiResponse, StyledTextProps } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
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

type AboutPageResponse = StrapiResponse<AboutPageAttributes>;

export const load: PageServerLoad = async () => {
	try {
		const response = await api.get<AboutPageResponse>('/api/about-page', {
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
			}
		});

		const pageData = response.data.data;

		if (!pageData) {
			throw error(404, 'About page data not found.');
		}

		return {
			page: {
				heroTitle: pageData.hero_title,
				heroImageUrl: pageData.hero_image
					? pageData.hero_image.url.startsWith('https')
						? pageData.hero_image.url
						: `${apiUrl}${pageData.hero_image.url}`
					: 'https://placehold.co/1200x600?text=Hero+Image',
				heroImageAlt: pageData.hero_image?.alternativeText || 'Hero image',
				introductionSubtitle: pageData.introduction_subtitle,
				introductionTitle: pageData.introduction_title,
				introductionContent: pageData.introduction_content,
				historySubtitle: pageData.history_subtitle,
				historyTitle: pageData.history_title,
				historySection: pageData.history_section?.map((story) => ({
					...story,
					imageUrl: story.image
						? story.image.url.startsWith('https')
							? story.image.url
							: `${apiUrl}${story.image.url}`
						: 'https://placehold.co/1200x600?text=History+Image',
					imageAlt: story.image?.alternativeText || 'History section image'
				})),
				teamSubtitle: pageData.team_subtitle,
				teamTitle: pageData.team_title,
				teamSection: pageData.team_section?.map((member) => ({
					...member,
					avatarUrl: member.avatar
						? member.avatar.url.startsWith('https')
							? member.avatar.url
							: `${apiUrl}${member.avatar.url}`
						: 'https://placehold.co/600x600?text=Avatar',
					avatarAlt: member.avatar?.alternativeText || member.name
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
