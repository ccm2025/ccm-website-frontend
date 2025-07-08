import { error } from '@sveltejs/kit';
import axios from 'axios';
import type { PageServerLoad } from './$types';

import type { StrapiImage, StrapiResponse } from '$lib/types';

interface HistoryStory {
	id: number;
	description: string;
	image: StrapiImage;
}

interface TeamMember {
	id: number;
	name: string;
	description: string;
	avatar: StrapiImage;
}

interface AboutPageAttributes {
	hero_image: StrapiImage;
	introduction: string;
	history_section?: HistoryStory[];
	team_section?: TeamMember[];
}

type AboutPageResponse = StrapiResponse<AboutPageAttributes>;

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

const api = axios.create({
	baseURL: STRAPI_URL,
	headers: {
		Authorization: `bearer ${STRAPI_TOKEN}`
	}
});

export const load: PageServerLoad = async () => {
	try {
		const response = await api.get<AboutPageResponse>('/api/about-page', {
			params: {
				locale: 'en',
				populate: {
					hero_image: true,
					history_section: {
						populate: {
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
			throw error(404, 'About page data not found in Strapi.');
		}

		return {
			page: {
				introduction: pageData.introduction,
				heroImageUrl: pageData.hero_image?.url
					? `${STRAPI_URL}${pageData.hero_image.url}`
					: 'https://placehold.co/1200x600?text=Hero+Image',
				historySection: pageData.history_section?.map((story) => ({
					id: story.id,
					description: story.description,
					imageUrl: story.image?.url
						? `${STRAPI_URL}${story.image.url}`
						: 'https://placehold.co/1200x600?text=History+Image',
					imageAlt: story.image?.alternativeText || 'History section image'
				})),
				teamSection: pageData.team_section?.map((member) => ({
					id: member.id,
					name: member.name,
					description: member.description,
					avatarUrl: member.avatar?.url
						? `${STRAPI_URL}${member.avatar.url}`
						: 'https://placehold.co/600x600?text=Avatar',
					avatarAlt: member.avatar?.alternativeText || member.name
				}))
			}
		};
	} catch (e) {
		console.error('Error fetching from Strapi via axios:', e);
		if (axios.isAxiosError(e)) {
			const status = e.response?.status || 500;
			const message = e.response?.data?.error?.message || 'Failed to load page data.';
			throw error(status, message);
		}
		throw error(500, 'An unexpected error occurred.');
	}
};
