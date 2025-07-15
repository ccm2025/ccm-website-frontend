<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { Download } from 'lucide-svelte';
</script>

<svelte:head>
	<title>{data.page.heroTitle}</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="relative flex h-64 items-center justify-center text-center text-white md:h-80">
		<div class="absolute inset-0">
			<img src={data.page.heroImageUrl} alt="Give background" class="h-full w-full object-cover" />
			<div class="absolute inset-0 bg-black/50"></div>
		</div>
		<div class="relative z-10 px-4">
			<h1 class="text-4xl font-bold tracking-tight uppercase md:text-6xl">{data.page.heroTitle}</h1>
		</div>
	</section>

	<!-- Content Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<div class="prose mt-8 max-w-none space-y-4 text-center text-lg text-gray-600">
				<h2 class="text-lg font-semibold text-yellow-600 md:text-xl">
					{data.page.introductionSubtitle}
				</h2>
				<p class="mt-2 text-3xl font-bold tracking-wider text-green-800 md:text-4xl">
					{data.page.introductionTitle}
				</p>
				{@html data.page.introductionContent}
			</div>
		</div>
	</section>

	<!-- Donation Options Section -->
	<section class="bg-white pb-16 md:pb-24">
		<div class="container mx-auto max-w-4xl px-4">
			<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
				<div class="space-y-10">
					<div>
						<h3 class="text-2xl font-bold text-gray-800">
							{data.page.zelleTitle}
						</h3>
						<dl class="mt-4 space-y-2 text-gray-600">
							{@html data.page.zelleContent}
						</dl>
					</div>
					<div>
						<h3 class="text-2xl font-bold text-gray-800">
							{data.page.checkTitle}
						</h3>
						<dl class="mt-4 space-y-2 text-gray-600">
							{@html data.page.checkContent}
						</dl>
					</div>
				</div>
			</div>
		</div>
	</section>

	{#if data.page.letterImages.length > 0}
		<section class="bg-gray-50 py-16 pb-16 md:pb-24">
			<div class="container mx-auto max-w-6xl px-4">
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
					{#each data.page.letterImages as image, i}
						<div class="flex items-center justify-center">
							<img
								src={image.url}
								alt={image.alt || `Letter image ${i + 1}`}
								class="h-auto w-full max-w-md rounded-lg shadow-lg"
							/>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if data.page.pdfLinks.length > 0}
		<section class="bg-white pb-16 md:pb-24">
			<div class="container mx-auto max-w-4xl px-4">
				<ul class="border-t border-gray-200">
					{#each data.page.pdfLinks as link}
						<li>
							<a
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								class="group flex items-center justify-between border-b border-gray-200 py-4"
							>
								<span class="text-lg text-gray-700 transition-colors group-hover:text-green-700"
									>{link.title}</span
								>
								<Download
									class="h-5 w-5 text-gray-400 transition-colors group-hover:text-green-700"
								/>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
</main>
