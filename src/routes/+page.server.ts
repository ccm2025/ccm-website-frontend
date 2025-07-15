import { api, apiUrl } from '$lib';
import type { StrapiImage, StrapiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

interface MeetCard {
	id: number;
	name: string;
	image: StrapiImage;
	link: string;
}

interface HomePageAttributes {
	hero_title: string;
	hero_subtitle: string;
	hero_button_text: string;
	hero_background_image: StrapiImage;

	introduction_part1: string;
	introduction_video_url: string;
	introduction_part2: string;

	meet_title: string;
	meet_cards: MeetCard[];
	meet_conclusion: string;
}

type HomePageResponse = StrapiResponse<HomePageAttributes>;

export const load: PageServerLoad = async () => {
	try {
		const response = await api.get<HomePageResponse>('/api/home-page', {
			params: {
				populate: {
					hero_background_image: true,
					meet_cards: {
						populate: 'image'
					}
				},
				locale: 'en'
			}
		});

		const pageData = response.data.data;

		if (!pageData) {
			throw error(404, 'Home page data not found.');
		}

		return {
			page: {
				hero: {
					title: pageData.hero_title,
					subtitle: marked.parse(pageData.hero_subtitle),
					button_text: pageData.hero_button_text,
					backgroundImageUrl: pageData.hero_background_image?.url
						? `${apiUrl}${pageData.hero_background_image.url}`
						: 'https://placehold.co/1200x600?text=Hero+Background',
					backgroundImageAlt: pageData.hero_background_image?.alternativeText || 'Hero Background'
				},
				intro: {
					part1: marked.parse(pageData.introduction_part1),
					videoUrl: pageData.introduction_video_url || '',
					part2: marked.parse(pageData.introduction_part2)
				},
				meet: {
					title: pageData.meet_title,
					cards: pageData.meet_cards.map((card) => ({
						...card,
						imageUrl: card.image?.url
							? `${apiUrl}${card.image.url}`
							: 'https://placehold.co/600x400?text=Meet+Card',
						imageAlt: card.image?.alternativeText || card.name
					})),
					conclusion: pageData.meet_conclusion
				}
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
