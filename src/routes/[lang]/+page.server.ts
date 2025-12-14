import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface MeetCard {
	id: number;
	title: string;
	image: StrapiMedia;
	slug: string;
}

interface HomePageAttributes {
	hero_title: string;
	hero_subtitle: StyledTextProps[];
	hero_button_text: string;
	hero_background_image: StrapiMedia;

	introduction_part1: StyledTextProps[];
	introduction_video_url: string;
	introduction_part2: StyledTextProps[];

	meet_title: string;
	meet_cards: MeetCard[];

	conclusion: StyledTextProps[];
}

export const load: PageServerLoad = async ({ params }) => {
	const { lang } = params;
	return fetch<HomePageAttributes>({
		endpoint: '/api/home-page',
		params: {
			locale: lang,
			populate: {
				hero_subtitle: true,
				hero_background_image: true,
				introduction_part1: true,
				introduction_part2: true,
				conclusion: true,
				meet_cards: {
					populate: 'image'
				}
			}
		},
		callback: (data) => ({
			page: {
				...data,
				hero_background_image: getMedia(data.hero_background_image, 'Hero background image'),
				meet_cards: data.meet_cards.map((card) => ({
					...card,
					image: getMedia(card.image, 'Meet card image')
				}))
			}
		})
	});
};
