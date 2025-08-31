<script lang="ts">
	import { toggleMenu } from '$lib/stores/SideMenu';

	export let data: { text: string; slug: string }[];

	import { page } from '$app/state';
	$: lang = page.params.lang;
</script>

{#each data as { text, slug }}
	<a
		href={`/${lang}/${slug[0] === '/' ? slug.slice(1) : slug}`}
		on:click={toggleMenu}
		class="hover:text-[rgb(var(--website-theme-color1))]">{text}</a
	>
{/each}
