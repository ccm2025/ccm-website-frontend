import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';
import { writable } from 'svelte/store';

export type Locale = 'en' | 'zh-Hans';

export const locale = writable<Locale>('zh-Hans');

export function nextLocale() {
	locale.update((current) => {
		switch (current) {
			case 'en':
				return 'zh-Hans';
			case 'zh-Hans':
				return 'en';
			default:
				return 'zh-Hans';
		}
	});
	invalidateAll();
}

if (browser) {
	const storedLocale = localStorage.getItem('locale') as Locale;
	if (storedLocale) {
		locale.set(storedLocale);
	}
}

locale.subscribe((value) => {
	if (browser) {
		localStorage.setItem('locale', value);
		document.cookie = `locale=${value}; path=/; max-age=31536000; SameSite=Lax`;
	}
});
