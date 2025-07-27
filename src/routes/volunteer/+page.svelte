<script>
	import StyledText from '$lib/components/StyledText.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.page.heroTitle}</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="relative flex h-64 items-center justify-center text-center text-white md:h-80">
		<div class="absolute inset-0">
			<img
				src={data.page.heroImageUrl}
				alt="Volunteer background"
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/50"></div>
		</div>
		<div class="relative z-10 px-4">
			<h1 class="text-4xl font-bold tracking-tight uppercase md:text-6xl">
				{data.page.heroTitle}
			</h1>
		</div>
	</section>

	<!-- Content Section -->
	<section class="bg-white py-16 md:py-20">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
				{data.page.introductionSubtitle}
			</h2>
			<p
				class="mt-2 mb-6 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
			>
				{data.page.introductionTitle}
			</p>

			<StyledText data={data.page.introductionContent} />

			<!-- Buttons -->
			{#if data.page.applicationButtonUrl}
				<div class="mt-10 flex flex-col items-center space-y-4">
					<a
						href={data.page.applicationButtonUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-block rounded-lg bg-[rgb(var(--website-theme-color1))] px-12 py-4 text-xl font-semibold text-white shadow-lg transition-colors hover:bg-[rgb(var(--website-theme-color2))]"
					>
						{data.page.applicationButtonText}
					</a>
				</div>
			{/if}

			<!-- Positions List -->
			<div class="mt-10">
				<h2 class="mb-6 text-2xl font-semibold text-gray-800">
					{data.page.volunteerTitle}
				</h2>
				<StyledText data={data.page.volunteerContent} />
			</div>
		</div>
	</section>
</main>
