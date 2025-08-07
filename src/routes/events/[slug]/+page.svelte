<script>
	import StyledText from '$lib/components/StyledText.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
	<title>{data.page[0].title}</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="relative flex h-64 items-center justify-center text-center text-white md:h-80">
		<div class="absolute inset-0">
			<img
				src={data.page[0].hero_image.url}
				alt={data.page[0].hero_image.alt}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/20"></div>
		</div>
		<div class="relative z-10 px-4">
			<h1 class="text-4xl font-bold tracking-tight uppercase md:text-6xl">
				{data.page[0].title}
			</h1>
		</div>
	</section>

	<!-- Content Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-4xl px-4">
			<!-- Back Button -->
			<div class="mb-8">
				<a
					href="/events"
					class="inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--website-theme-color1))] px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-[rgb(var(--website-theme-color2))]"
				>
					<ArrowLeft size={20} />
					Back to Events
				</a>
			</div>

			<!-- Main Content -->
			<div class="mb-8 text-center">
				<h2 class="text-2xl font-bold tracking-tight uppercase md:text-4xl">
					{data.page[0].title}
				</h2>
			</div>

			<StyledText data={data.page[0].content} />

			<!-- Content Image -->
			{#if !data.page[0].content_image.url.endsWith('media/')}
				<img
					src={data.page[0].content_image.url}
					alt={data.page[0].content_image.alt}
					class="mt-8 w-full rounded-lg shadow-md"
				/>
			{/if}

			<!-- Content Video Url -->
			{#if data.page[0].content_video_url}
				<iframe
					src={data.page[0].content_video_url}
					title="Event Video"
					class="mt-8 w-full rounded-lg shadow-md"
					frameborder="0"
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{/if}
		</div>
	</section>
</main>
