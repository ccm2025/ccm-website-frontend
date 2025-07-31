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

export const load: LayoutServerLoad = async () => {
	return fetch<GlobalAttributes>({
		endpoint: '/api/global',
		params: {
			locale: 'en'
		},
		callback: (data) => {
			return {
				page: data
			};
		}
	});
};
