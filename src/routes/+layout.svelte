<script lang="ts">
	/** @type {import('./$types').PageData} */
	// =================================================
	// All shared components and styles
	// =================================================
	import '../app.css';
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
	<link rel="icon" type="image/svg" href={'/favicon.svg'} />
	<style>
		body {
			font-family: 'Inter', sans-serif;
		}
		:root {
			--website-theme-color1: 21 78 48; /* 深绿色 */
			--website-theme-color2: 233 170 28; /* 金色 */
		}
	</style>
</svelte:head>

<slot />
