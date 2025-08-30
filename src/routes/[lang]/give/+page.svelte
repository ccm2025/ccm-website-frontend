<script>
	import StyledText from '$lib/components/StyledText.svelte';
	import { locale } from '$lib/stores/Locale';

	/** @type {import('./$types').PageData} */
	export let data;

	import { Download } from 'lucide-svelte';
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
				<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
					{data.page.introduction_subtitle}
				</h2>
				<h1
					class="text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
				>
					{data.page.introduction_title}
				</h1>
				<StyledText data={data.page.introduction_content} />
			</div>
		</div>
	</section>

	<!-- Donation Options Section -->
	<section class="bg-white pb-16 md:pb-20">
		<div class="container mx-auto max-w-4xl px-4">
			<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
				<div class="space-y-10">
					<div>
						<h3 class="mb-3 text-2xl font-bold text-[rgb(var(--website-theme-color1))]">
							{data.page.zelle_title}
						</h3>
						<StyledText data={data.page.zelle_content} />
					</div>
					<div>
						<h3 class="mb-3 text-2xl font-bold text-[rgb(var(--website-theme-color1))]">
							{data.page.check_title}
						</h3>
						<StyledText data={data.page.check_content} />
					</div>
				</div>
			</div>
		</div>
	</section>

	{#if data.page.pdf_links && data.page.pdf_links.length > 2}
		<section class="bg-gray-50 py-16 pb-16 md:pb-20">
			<div class="container mx-auto max-w-6xl px-4">
				<div class="aspect-video overflow-hidden rounded-lg shadow-lg md:aspect-[17/11]">
					<iframe
						src={$locale === 'zh-Hans'
							? data.page.pdf_links[0].pdf.url
							: data.page.pdf_links[2].pdf.url}
						title="Featured PDF"
						class="h-full w-full border-0"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			</div>
		</section>

		<section class="bg-white pb-16 md:pb-20">
			<div class="container mx-auto max-w-4xl px-4">
				<ul>
					{#each data.page.pdf_links as link}
						<li>
							<a
								href={link.pdf.url}
								target="_blank"
								rel="noopener noreferrer"
								class="group flex items-center justify-between border-b border-gray-200 py-4"
							>
								<span
									class="text-lg text-gray-700 transition-colors group-hover:text-[rgb(var(--website-theme-color2))]"
								>
									{link.title}</span
								>
								<Download
									class="h-5 w-5 text-gray-500 transition-colors group-hover:text-[rgb(var(--website-theme-color2))]"
								/>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
</main>
