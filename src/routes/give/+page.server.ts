import { fetch, getMedia } from '$lib';
import type { StrapiMedia, StyledTextProps } from '$lib/types';
import type { PageServerLoad } from './$types';

interface PdfLink {
	title: string;
	pdf: StrapiMedia;
}

interface GivePageAttributes {
	hero_title: string;
	hero_image: StrapiMedia;
	introduction_subtitle: string;
	introduction_title: string;
	introduction_content: StyledTextProps[];
	zelle_title: string;
	zelle_content: StyledTextProps[];
	check_title: string;
	check_content: StyledTextProps[];
	pdf_links?: PdfLink[];
}

export const load: PageServerLoad = async ({ platform, request }) => {
	return fetch<GivePageAttributes>({
		platform,
		request,
		endpoint: '/api/give-page',
		params: {
			populate: {
				hero_image: true,
				introduction_content: true,
				zelle_content: true,
				check_content: true,
				pdf_links: {
					populate: 'pdf'
				}
			},
			locale: 'en'
		},
		callback: (data): { page: GivePageAttributes } => ({
			page: {
				...data,
				hero_image: getMedia(data.hero_image, 'Hero image'),
				pdf_links: data.pdf_links?.map((link) => ({
					title: link.title,
					pdf: getMedia(link.pdf, 'PDF file')
				}))
			}
		})
	});
};
