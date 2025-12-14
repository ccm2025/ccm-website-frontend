import { fetch } from '$lib';
import { ALLOWED_LANGS, type AllowedLang } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

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

export const load: LayoutServerLoad = async ({ params, url }) => {
	const { lang } = params;
	if (!ALLOWED_LANGS.includes(lang as AllowedLang)) {
		throw redirect(307, `/en${url.pathname.replace(/^\/[^/]+/, '')}${url.search}`);
	}

	return fetch<GlobalAttributes>({
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
