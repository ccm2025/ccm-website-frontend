import { apiUrl, fetch } from '$lib';
import type { StrapiFile, StrapiImage, StyledTextProps } from '$lib/types';
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
				hero_image: {
					url: data.hero_image
						? data.hero_image.url.startsWith('https')
							? data.hero_image.url
							: `${apiUrl}${data.hero_image.url}`
						: 'https://placehold.co/1200x600?text=Give+Background',
					alt: data.hero_image?.alt || 'Give Hero Image'
				},
				pdf_links: data.pdf_links?.map((link) => ({
					title: link.title,
					pdf: {
						url: link.pdf.url.startsWith('https') ? link.pdf.url : `${apiUrl}${link.pdf.url}`
					}
				}))
			}
		})
	});
};
