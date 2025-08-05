import { fetch } from '$lib';
import type { LayoutServerLoad } from './$types';

interface GlobalAttributes {
	website_title_cn: string;
	website_title_en: string;
	contact_title: string;
	address: string;
	email: string;
	instagram_url: string;
	youtube_url: string;
}

export const load: LayoutServerLoad = async ({ platform, request, cookies }) => {
	return fetch<GlobalAttributes>({
		platform,
		request,
		endpoint: '/api/global',
		params: {
			locale: cookies.get('locale')
		},
		callback: (data) => ({
			page: data
		})
	});
};
