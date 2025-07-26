import { api, STRAPI_URL } from '$lib/server/strapi';
import type { StrapiImage, StyledTextProps } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import type { PageServerLoad } from './$types';

interface Event {
	id: number;
	title: string;
	date: string;
	image: StrapiImage;
	content: StyledTextProps[];
}

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { slug } = params;

		const response = await api.get<{ data: Event[] }>('/api/events', {
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
			}
		});

		if (response.data.data.length > 0) {
			const eventData = response.data.data[0];

			return {
				type: 'event',
				title: eventData.title,
				heroImageUrl: eventData.image?.url
					? `${STRAPI_URL}${eventData.image.url}`
					: 'https://placehold.co/1200x600?text=Hero+Image',
				heroImageAlt: eventData.image?.alternativeText || 'Event Hero Image',
				content: eventData.content
			};
		}

		throw error(404, `Event with slug "${slug}" not found.`);
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
