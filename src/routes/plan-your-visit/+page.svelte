<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.page.heroTitle}</title>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section class="relative flex h-80 items-center justify-center text-center text-white md:h-96">
		<div class="absolute inset-0">
			<img
				src={data.page.heroImageUrl}
				alt="Gathering background"
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/50"></div>
		</div>
		<div class="relative z-10 px-4">
			<h1 class="text-3xl font-bold tracking-tight uppercase md:text-4xl">
				{data.page.heroTitle}
			</h1>
		</div>
	</section>

	<!-- Intro Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
				{data.page.introductionSubtitle}
			</h2>
			<p
				class="mt-2 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
			>
				{data.page.introductionTitle}
			</p>
			<div class="grid grid-cols-1 items-center gap-8 text-left md:grid-cols-3">
				<div class="md:col-span-2">
					<p class="text-lg font-semibold text-[rgb(var(--website-theme-color1))]">
						{data.page.introductionContent.title}
					</p>
					<p class="mt-2 text-gray-600">{data.page.introductionContent.description}</p>
				</div>
				<div class="md:col-span-1">
					<img
						src={data.page.introductionContent.imageUrl}
						alt={data.page.introductionContent.title}
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
				<img
					src={data.page.locationMapImageUrl}
					alt={data.page.locationMapImageAlt}
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="flex flex-col justify-center p-8 md:p-16">
				<h2 class="text-3xl font-bold tracking-wider md:text-4xl">{data.page.locationTitle}</h2>
				<p class="mt-1 text-xl md:text-2xl">{@html data.page.locationAddress}</p>
			</div>
		</div>
	</section>

	<!-- Schedule Section -->
	<section class="bg-gray-50 py-16 md:py-24">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<h2
					class="text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
				>
					{data.page.scheduleTitle}
				</h2>
			</div>
			<div class="mx-auto mt-12 max-w-4xl space-y-12">
				{#each data.page.scheduleItems as item, i (item.id)}
					<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
						<div class="md:col-span-1 {i % 2 !== 0 ? 'md:order-last' : ''}">
							<img
								src={item.imageUrl}
								alt={item.title}
								class="h-auto w-full rounded-lg object-cover shadow-md"
							/>
						</div>
						<div class="md:col-span-2">
							<p class="text-lg font-semibold text-[rgb(var(--website-theme-color1))]">
								{item.title}
							</p>
							<p class="mt-2 text-gray-600">{item.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>
