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

	<!-- Intro Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-5xl px-4 text-center">
			<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
				{data.page.introduction_subtitle}
			</h2>
			<p
				class="mt-2 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
			>
				{data.page.introduction_title}
			</p>
			<div class="mt-6 grid grid-cols-1 items-center gap-8 text-left md:grid-cols-5">
				<div class="md:col-span-3">
					<StyledText data={data.page.introduction_content.description} />
				</div>
				<div class="md:col-span-2">
					<img
						src={data.page.introduction_content.image.url}
						alt={data.page.introduction_content.image.alt}
						class="h-auto w-full rounded-lg object-cover shadow-md"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Location Section -->
	<section class="bg-[rgb(var(--website-theme-color1))] text-white">
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div class="h-64 w-full md:h-auto">
				<iframe
					src={data.page.location_map_link}
					style="border:0;width:100%;aspect-ratio:1;"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					title="Location Map"
				></iframe>
			</div>
			<div class="flex flex-col justify-center p-8 md:p-16">
				<StyledText data={data.page.location_text} gap={6} />
			</div>
		</div>
	</section>

	<!-- Schedule Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-5xl px-4 text-center">
			<h2
				class="text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
			>
				{data.page.schedule_title}
			</h2>
			<div class="mx-auto mt-12 space-y-12">
				{#each data.page.schedule_items as item, i (item.id)}
					<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-5">
						<div class="md:col-span-2 {i % 2 !== 0 ? 'md:order-last' : ''}">
							<img
								src={item.image.url}
								alt={item.image.alt}
								class="h-auto w-full rounded-lg object-cover shadow-md"
							/>
						</div>
						<div class="md:col-span-3">
							<StyledText data={item.description} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>
