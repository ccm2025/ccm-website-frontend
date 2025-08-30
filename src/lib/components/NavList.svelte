<script lang="ts">
	import { locale } from '$lib/stores/Locale';
	import { toggleMenu } from '$lib/stores/SideMenu';

	export let data: { text: string; slug: string }[];
</script>

{#each data as { text, slug }}
	<a
		href={`/${$locale}/${slug[0] === '/' ? slug.slice(1) : slug}`}
		on:click={toggleMenu}
		class="hover:text-[rgb(var(--website-theme-color1))]">{text}</a
	>
{/each}
