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

	<!-- Info Sections -->
	<div class="bg-white">
		{#each data.page.info_sections as section, i (section.id)}
			<section class="py-8 md:py-10">
				<div class="container mx-auto px-4">
					<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
						<div class="w-full" class:md:order-last={i % 2 !== 0}>
							<img
								src={section.image.url}
								alt={section.image.alt}
								class="h-auto w-full rounded-lg object-cover shadow-lg"
							/>
						</div>

						<div class="text-center md:text-left">
							<h3 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))]">
								{section.subtitle}
							</h3>
							<h2
								class="md:text-4x mt-1 mb-4 text-3xl font-bold text-[rgb(var(--website-theme-color1))]"
							>
								{section.title}
							</h2>
							<StyledText data={section.content} />

							{#if section.button_text && section.button_url}
								<a
									href={section.button_url}
									target="_blank"
									rel="noopener noreferrer"
									class="mt-6 inline-block rounded-lg bg-[rgb(var(--website-theme-color1))] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[rgb(var(--website-theme-color2))]"
								>
									{section.button_text}
								</a>
							{/if}
						</div>
					</div>
				</div>
			</section>
		{/each}
	</div>
</main>
