<script lang="ts">
	import { toggleMenu } from '$lib/stores/SideMenu';

	export let data: { text: string; slug: string }[];
</script>

{#each data as { text, slug }}
	<a href={slug} on:click={toggleMenu} class="hover:text-[rgb(var(--website-theme-color1))]"
		>{text}</a
	>
{/each}
