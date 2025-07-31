import { apiUrl, fetch } from '$lib';
import type { StrapiImage, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface Event {
	id: number;
	title: string;
	date: string;
	image: StrapiImage;
	content: StyledTextProps[];
}

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	return fetch<Event[]>({
		endpoint: '/api/events',
		params: {
			filters: {
				slug: {
					$eq: slug
				}
			},
			populate: {
				image: true,
				content: true
			},
			locale: 'en'
		},
		callback: (data) => {
			return {
				page: [
					{
						...data[0],
						image: {
							url: data[0].image
								? data[0].image.url.startsWith('https')
									? data[0].image.url
									: `${apiUrl}${data[0].image.url}`
								: 'https://placehold.co/1200x600?text=Hero+Image',
							alt: data[0].image?.alt || 'Event Hero Image'
						}
					}
				]
			};
		}
	});
};
