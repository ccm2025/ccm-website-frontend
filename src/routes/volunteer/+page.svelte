<script>
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
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<h2 class="text-lg font-semibold text-yellow-600 md:text-xl">
				{data.page.introductionSubtitle}
			</h2>
			<p class="mt-2 text-3xl font-bold tracking-wider text-green-800 md:text-4xl">
				{data.page.introductionTitle}
			</p>

			<div class="prose mt-8 max-w-none space-y-4 text-center text-lg text-gray-600">
				{@html data.page.introductionContent}
			</div>
		</div>
	</section>

	<section class="bg-white pb-16 md:pb-24">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<!-- Buttons -->
			{#if data.page.applicationButtonUrl}
				<div class="flex flex-col items-center space-y-4">
					<a
						href={data.page.applicationButtonUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-block rounded-lg bg-green-800 px-12 py-4 text-xl font-semibold text-white shadow-lg transition-colors hover:bg-green-900"
					>
						{data.page.applicationButtonText}
					</a>
				</div>
			{/if}
			<!-- Positions List -->
			<div class="mt-16">
				<p class="text-lg font-semibold text-gray-800">
					{data.page.volunteerSectionTitle}
				</p>
				<div
					class="prose-p:my-0 prose-ul:list-none prose-ul:p-0 mt-6 max-w-none space-y-3 text-xl text-gray-700"
				>
					{@html data.page.volunteerSectionContent}
				</div>
			</div>
		</div>
	</section>
</main>
