import { api, apiUrl } from '$lib';
import type { StrapiImage, StrapiResponse, StyledTextProps } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import type { PageServerLoad } from './$types';

interface MeetCard {
	id: number;
	title: string;
	image: StrapiImage;
	slug: string;
}

interface HomePageAttributes {
	hero_title: string;
	hero_subtitle: StyledTextProps[];
	hero_button_text: string;
	hero_background_image: StrapiImage;

	introduction_part1: StyledTextProps[];
	introduction_video_url: string;
	introduction_part2: StyledTextProps[];

	meet_title: string;
	meet_cards: MeetCard[];

	conclusion: StyledTextProps[];
}

type HomePageResponse = StrapiResponse<HomePageAttributes>;

export const load: PageServerLoad = async () => {
	try {
		const response = await api.get<HomePageResponse>('/api/home-page', {
			params: {
				populate: {
					hero_subtitle: true,
					hero_background_image: true,
					introduction_part1: true,
					introduction_part2: true,
					conclusion: true,
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
					subtitle: pageData.hero_subtitle,
					button_text: pageData.hero_button_text,
					backgroundImageUrl: pageData.hero_background_image
						? pageData.hero_background_image.url.startsWith('http')
							? pageData.hero_background_image.url
							: `${apiUrl}${pageData.hero_background_image.url}`
						: 'https://placehold.co/1200x600?text=Hero+Background',
					backgroundImageAlt: pageData.hero_background_image?.alternativeText || 'Hero Background'
				},
				intro: {
					part1: pageData.introduction_part1,
					videoUrl: pageData.introduction_video_url || '',
					part2: pageData.introduction_part2
				},
				meet: {
					title: pageData.meet_title,
					cards: pageData.meet_cards.map((card) => ({
						...card,
						slug: card.slug || '#',
						imageUrl: card.image
							? card.image.url.startsWith('http')
								? card.image.url
								: `${apiUrl}${card.image.url}`
							: 'https://placehold.co/600x400?text=Meet+Card',
						imageAlt: card.image?.alternativeText || card.title
					}))
				},
				conclusion: pageData.conclusion
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
