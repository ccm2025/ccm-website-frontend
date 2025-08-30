import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';
import { writable } from 'svelte/store';

export type Locale = 'en' | 'zh-Hans';

function getInitialLocale(): Locale {
	if (browser) {
		const match = window.location.pathname.match(/^\/(en|zh-Hans)(\/|$)/);
		if (match) {
			return match[1] as Locale;
		}
		const storedLocale = localStorage.getItem('locale') as Locale;
		if (storedLocale === 'en' || storedLocale === 'zh-Hans') {
			return storedLocale;
		}
	}
	return 'zh-Hans';
}

export const locale = writable<Locale>(getInitialLocale());

export function nextLocale() {
	locale.update((current) => {
		let next: Locale;
		switch (current) {
			case 'en':
				next = 'zh-Hans';
				break;
			case 'zh-Hans':
				next = 'en';
				break;
			default:
				next = 'zh-Hans';
		}
		if (browser) {
			const path = window.location.pathname.replace(/^\/(en|zh-Hans)/, '');
			window.location.href = `/${next}${path}${window.location.search}`;
		}
		return next;
	});
	invalidateAll();
}

if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem('locale', value);
	});
}
