<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import StyledText from '$lib/components/StyledText.svelte';
	import { locale } from '$lib/stores/Locale';
</script>

<svelte:head>
	<title>{data.page.hero_title}</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section
		class="relative flex h-[calc(100vh-80px)] min-h-[500px] items-center justify-center text-center text-white"
	>
		<div class="absolute inset-0">
			<img
				src={data.page.hero_background_image.url}
				alt={data.page.hero_background_image.alt}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/20"></div>
		</div>
		<div class="relative z-10 px-4 text-left">
			<h1 class="mb-8 text-4xl font-bold tracking-tight uppercase md:text-6xl">
				{data.page.hero_title}
			</h1>
			<StyledText data={data.page.hero_subtitle} as="h2" />
			<a
				class="mt-14 inline-block rounded-full border-2 border-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-[rgb(var(--website-theme-color2))]"
				href={`/${$locale}/plan-your-visit`}
				aria-label={data.page.hero_button_text}
			>
				{data.page.hero_button_text}
			</a>
		</div>
	</section>

	<!-- Intro Section Part 1 -->
	<section class="bg-white py-16 md:py-20">
		<div class="container mx-auto max-w-6xl text-center">
			<StyledText data={data.page.introduction_part1} as="p" gap={16} />
		</div>
	</section>

	<!-- Video Section -->
	{#if data.page.introduction_video_url}
		<section class="bg-[rgb(var(--website-theme-color1))] py-16 md:py-20">
			<div class="container mx-auto px-4">
				<div
					class="mx-auto max-w-4xl rounded-lg border border-gray-700 bg-gray-900/80 p-3 shadow-2xl backdrop-blur-sm md:p-4"
				>
					<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-md bg-black/80">
						<iframe
							loading="lazy"
							class="aspect-video w-full"
							src={data.page.introduction_video_url}
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</div>
			</div>
		</section>
	{/if}

	<!-- Intro Section Part 2 -->
	<section class="bg-white py-16 md:py-20">
		<div class="container mx-auto max-w-6xl px-4 text-center">
			<StyledText data={data.page.introduction_part2} as="p" gap={12} />
		</div>
	</section>

	<!-- Meet With Us Section -->
	<section class="bg-white py-16 md:py-20">
		<div class="container mx-auto px-4">
			<h2 class="text-center text-3xl font-bold tracking-wider md:text-4xl">
				{data.page.meet_title}
			</h2>
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each data.page.meet_cards as card (card.id)}
					<a
						href={`/${$locale}/${card.slug}`}
						class="group relative block h-64 overflow-hidden rounded-lg shadow-lg"
					>
						<div class="absolute inset-0">
							<img
								src={card.image.url}
								alt={card.image.alt}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div class="absolute inset-0 bg-black/30"></div>
						</div>
						<div
							class="relative flex h-full flex-col items-center justify-center p-4 text-center text-white"
						>
							<h3 class="text-3xl font-bold tracking-widest">{card.title}</h3>
							<div
								class="text-md mt-4 rounded-full border-2 border-white px-6 py-2 font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								Learn More
							</div>
						</div>
					</a>
				{/each}
			</div>
			<div class="mt-16 text-center text-xl md:text-2xl">
				<StyledText data={data.page.conclusion} />
			</div>
		</div>
	</section>
</main>
