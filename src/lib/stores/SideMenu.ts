import { writable } from 'svelte/store';

export const isMenuOpen = writable(false);

export function toggleMenu() {
	isMenuOpen.update((isOpen) => !isOpen);
}
