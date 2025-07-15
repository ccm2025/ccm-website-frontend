import { api } from '$lib/server/strapi';
import type { StrapiResponse } from '$lib/types';
import type { LayoutServerLoad } from './$types';

interface GlobalAttributes {
	website_title_cn: string;
	website_title_en: string;
	contact_title: string;
	address: string;
	email: string;
	phone: string;
	instagram_url: string;
	youtube_url: string;
}

type GlobalResponse = StrapiResponse<GlobalAttributes>;

export const load: LayoutServerLoad = async () => {
	try {
		const response = await api.get<GlobalResponse>('/api/global', {
			params: {
				locole: 'en'
			}
		});

		const globalData = response.data.data;

		if (!globalData) {
			console.error('Global data not found.');
			return { global: null };
		}

		return {
			global: {
				websiteTitleCn: globalData.website_title_cn,
				websiteTitleEn: globalData.website_title_en,
				contactTitle: globalData.contact_title,
				address: globalData.address,
				email: globalData.email,
				phone: globalData.phone,
				socialLinks: {
					instagram: globalData.instagram_url || '',
					youtube: globalData.youtube_url || ''
				}
			}
		};
	} catch (e) {
		console.error('Failed to fetch global data:', e);
		return { global: null };
	}
};
