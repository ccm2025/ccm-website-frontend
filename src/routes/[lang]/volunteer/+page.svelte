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
			<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
				{data.page.introduction_subtitle}
			</h2>
			<p
				class="mt-2 mb-6 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
			>
				{data.page.introduction_title}
			</p>

			<StyledText data={data.page.introduction_content} />

			<!-- Buttons -->
			{#if data.page.application_button_url}
				<div class="mt-10 flex flex-col items-center space-y-4">
					<a
						href={data.page.application_button_url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-block rounded-lg bg-[rgb(var(--website-theme-color1))] px-12 py-4 text-xl font-semibold text-white shadow-lg transition-colors hover:bg-[rgb(var(--website-theme-color2))]"
					>
						{data.page.application_button_text}
					</a>
				</div>
			{/if}

			<!-- Positions List -->
			<div class="mt-10">
				<h2 class="mb-6 text-2xl font-semibold text-gray-800">
					{data.page.volunteer_title}
				</h2>
				<StyledText data={data.page.volunteer_content} />
			</div>
		</div>
	</section>
</main>
