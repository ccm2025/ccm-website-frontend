<script lang="ts">
	import { Globe, ChevronRight } from 'lucide-svelte';

	import { page } from '$app/state';
	$: lang = page.params.lang;

	export let btnClass: string;

	$: nextLang = lang === 'zh-Hans' ? 'en' : 'zh-Hans';

	function switchLang() {
		window.location.pathname = `/${nextLang}${window.location.pathname.replace(/^\/(zh-Hans|en)/, '')}`;
	}
</script>

<button class={btnClass} on:click={switchLang} aria-label="Switch Language">
	<Globe size="22" />
	<span>{lang === 'zh-Hans' ? 'English' : '简体中文'}</span>
	<ChevronRight size="22" />
</button>
