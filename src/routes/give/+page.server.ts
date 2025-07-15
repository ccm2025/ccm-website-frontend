import { api, apiUrl } from '$lib';
import type { StrapiFile, StrapiImage, StrapiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';
import { marked } from 'marked';
import type { PageServerLoad } from './$types';

interface PdfLink {
	title: string;
	pdf: StrapiFile;
}

interface GivePageAttributes {
	hero_title: string;
	hero_image: StrapiImage;
	introduction_subtitle: string;
	introduction_title: string;
	introduction_content: string;
	zelle_title: string;
	zelle_content: string;
	check_title: string;
	check_content: string;
	letter_images?: StrapiImage[];
	pdf_links?: PdfLink[];
}

type GivePageResponse = StrapiResponse<GivePageAttributes>;

export const load: PageServerLoad = async () => {
	try {
		const response = await api.get<GivePageResponse>('/api/give-page', {
			params: {
				populate: {
					hero_image: true,
					letter_images: true,
					pdf_links: {
						populate: 'pdf'
					}
				},
				locale: 'en'
			}
		});

		const pageData = response.data.data;

		if (!pageData) {
			throw error(404, 'Give page data not found.');
		}

		return {
			page: {
				heroTitle: pageData.hero_title,
				heroImageUrl: pageData.hero_image?.url
					? `${apiUrl}${pageData.hero_image.url}`
					: 'https://placehold.co/1200x600?text=Give+Background',
				introductionSubtitle: pageData.introduction_subtitle,
				introductionTitle: pageData.introduction_title,
				introductionContent: marked.parse(pageData.introduction_content),
				zelleTitle: pageData.zelle_title,
				zelleContent: marked.parse(pageData.zelle_content),
				checkTitle: pageData.check_title,
				checkContent: marked.parse(pageData.check_content),
				letterImages:
					pageData.letter_images?.map((img) => ({
						url: img.url ? `${apiUrl}${img.url}` : 'https://placehold.co/400x300?text=Letter+Image',
						alt: img.alternativeText || 'Letter Image'
					})) || [],
				pdfLinks:
					pageData.pdf_links?.map((link) => ({
						title: link.title,
						url: link.pdf ? `${apiUrl}${link.pdf.url}` : '#'
					})) || []
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
