<script>
	import StyledText from '$lib/components/StyledText.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.page.hero_title}</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="relative flex h-64 items-center justify-center text-center text-white md:h-80">
		<div class="absolute inset-0">
			<img
				src={data.page.hero_image.url}
				alt={data.page.hero_image.alt}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/20"></div>
		</div>
		<div class="relative z-10 px-4">
			<h1 class="text-4xl font-bold tracking-tight uppercase md:text-6xl">
				{data.page.hero_title}
			</h1>
		</div>
	</section>

	<!-- Content Section -->
	<section class="bg-white py-16 md:py-20">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<div class="max-w-none space-y-4 text-center text-lg">
				<h1
					class="mb-10 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
				>
					{data.page.content_title}
				</h1>
				<StyledText data={data.page.contents} />
			</div>
		</div>
	</section>
</main>
