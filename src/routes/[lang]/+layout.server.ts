import { fetch } from '$lib';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const allowedLangs = ['en', 'zh-Hans'];

interface NavItem {
	text: string;
	slug: string;
}

interface GlobalAttributes {
	website_title_cn: string;
	website_title_en: string;
	contact_title: string;
	address: string;
	email: string;
	instagram_url: string;
	youtube_url: string;
	nav_title: string;
	involve_title: string;
	nav: NavItem[];
}

export const load: LayoutServerLoad = async ({ platform, request, params, url }) => {
	const { lang } = params;
	if (!allowedLangs.includes(lang)) {
		throw redirect(307, `/zh-Hans${url.pathname.replace(/^\/[^/]+/, '')}${url.search}`);
	}

	return fetch<GlobalAttributes>({
		platform,
		request,
		endpoint: '/api/global',
		params: {
			locale: lang,
			populate: {
				nav: true
			}
		},
		callback: (data) => ({
			page: data
		})
	});
};
