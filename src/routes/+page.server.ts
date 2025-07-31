import { apiUrl, fetch } from '$lib';
import type { StrapiImage, StyledTextProps } from '$lib/types';
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

export const load: PageServerLoad = async () => {
	return fetch<HomePageAttributes>({
		endpoint: '/api/home-page',
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
		},
		callback: (data) => {
			return {
				page: {
					...data,
					hero_background_image: {
						url: data.hero_background_image.url
							? data.hero_background_image.url.startsWith('http')
								? data.hero_background_image.url
								: `${apiUrl}${data.hero_background_image.url}`
							: 'https://placehold.co/1200x600?text=Hero+Background',
						alt: data.hero_background_image?.alt || 'Hero Background'
					},
					meet_cards: data.meet_cards.map((card) => ({
						...card,
						image: {
							url: card.image
								? card.image.url.startsWith('http')
									? card.image.url
									: `${apiUrl}${card.image.url}`
								: 'https://placehold.co/600x400?text=Meet+Card',
							alt: card.image?.alt || card.title
						}
					}))
				}
			};
		}
	});
};
