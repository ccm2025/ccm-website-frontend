<script lang="ts">
	import { Globe, ChevronRight } from 'lucide-svelte';

	import { locale, nextLocale } from '$lib/stores/Locale';

	export let btnClass: string;
</script>

<button class={btnClass} on:click={nextLocale}>
	<Globe size="22" />
	<span>{$locale === 'zh-Hans' ? 'English' : '简体中文'}</span>
	<ChevronRight size="22" />
</button>
