<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { toggleMenu } from '$lib/store/SideMenu';
</script>

<svelte:head>
	<title>{data.page.hero.title}</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section
		class="relative flex h-[calc(100vh-80px)] min-h-[500px] items-center justify-center text-center text-white"
	>
		<div class="absolute inset-0">
			<img
				src={data.page.hero.backgroundImageUrl}
				alt={data.page.hero.backgroundImageAlt}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/50"></div>
		</div>
		<div class="relative z-10 px-4 text-left">
			<h1
				class="text-4xl font-bold tracking-tight uppercase md:text-6xl"
				style="color: var(--hero-title-color)"
			>
				{data.page.hero.title}
			</h1>
			<p
				class="prose mt-4 text-lg font-medium md:text-2xl"
				style="color: var(--hero-subtitle-color)"
			>
				{@html data.page.hero.subtitle}
			</p>
			<button
				type="button"
				class="mt-10 inline-block rounded-full border-2 border-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-green-700"
				on:click={toggleMenu}
				aria-label={data.page.hero.button_text}
			>
				{data.page.hero.button_text}
			</button>
		</div>
	</section>

	<!-- Intro Section Part 1 -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<div class="prose mt-8 max-w-none text-gray-600">
				{@html data.page.intro.part1}
			</div>
		</div>
	</section>

	<!-- Video Section -->
	{#if data.page.intro.videoUrl}
		<section class="bg-[#164e32] py-16 md:py-24">
			<div class="container mx-auto px-4">
				<div
					class="mx-auto max-w-4xl rounded-lg border border-gray-700 bg-gray-900/80 p-3 shadow-2xl backdrop-blur-sm md:p-4"
				>
					<div class="aspect-w-16 aspect-h-9 overflow-hidden rounded-md bg-[#1a3a2a]">
						<iframe
							loading="lazy"
							class="aspect-video w-full"
							src={data.page.intro.videoUrl}
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
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<div class="prose mt-8 max-w-none text-gray-600">
				{@html data.page.intro.part2}
			</div>
		</div>
	</section>

	<!-- Meet With Us Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto px-4">
			<h2 class="text-center text-3xl font-bold tracking-wider text-green-800 md:text-4xl">
				{data.page.meet.title}
			</h2>
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each data.page.meet.cards as card (card.id)}
					<a
						href={card.link}
						class="group relative block h-64 overflow-hidden rounded-lg shadow-lg"
					>
						<div class="absolute inset-0">
							<img
								src={card.imageUrl}
								alt={card.imageAlt}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
							<div class="absolute inset-0 bg-black/50"></div>
						</div>
						<div
							class="relative flex h-full flex-col items-center justify-center p-4 text-center text-white"
						>
							<h3 class="text-3xl font-bold tracking-widest uppercase">{card.name}</h3>
							<div
								class="text-md mt-4 rounded-full border-2 border-white px-6 py-2 font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								Learn More
							</div>
						</div>
					</a>
				{/each}
			</div>
			<div class="mt-16 text-center text-xl text-gray-700 md:text-2xl">
				<p>{data.page.meet.conclusion}</p>
			</div>
		</div>
	</section>
</main>
