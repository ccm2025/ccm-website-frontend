import { api, apiUrl } from '$lib';
import type { StrapiImage, StrapiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

interface VolunteerPageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	introduction_subtitle: string;
	introduction_title: string;
	introduction_content: string;
	application_button_text: string;
	application_button_url: string;
	volunteer_section_title: string;
	volunteer_section_content: string;
}

type VolunteerPageResponse = StrapiResponse<VolunteerPageAttributes>;

export const load: PageServerLoad = async () => {
	try {
		const response = await api.get<VolunteerPageResponse>('/api/volunteer-page', {
			params: {
				populate: {
					hero_image: true
				},
				locale: 'en'
			}
		});

		const pageData = response.data.data;

		if (!pageData) {
			throw error(404, 'Volunteer page data not found.');
		}

		return {
			page: {
				heroTitle: pageData.hero_title,
				heroImageUrl: pageData.hero_image?.url
					? `${apiUrl}${pageData.hero_image.url}`
					: 'https://placehold.co/1200x600?text=Volunteer+Background',
				introductionSubtitle: pageData.introduction_subtitle,
				introductionTitle: pageData.introduction_title,
				introductionContent: marked.parse(pageData.introduction_content),
				applicationButtonText: pageData.application_button_text,
				applicationButtonUrl: pageData.application_button_url,
				volunteerSectionTitle: pageData.volunteer_section_title,
				volunteerSectionContent: marked.parse(pageData.volunteer_section_content)
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
