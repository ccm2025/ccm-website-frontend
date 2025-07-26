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
				alt="About us background"
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/50"></div>
		</div>
		<div class="relative z-10 px-4">
			<h1 class="text-4xl font-bold tracking-tight uppercase md:text-6xl">About Us</h1>
		</div>
	</section>

	<!-- Introduction Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<h2 class="text-lg font-semibold md:text-xl" style="color: var(--website-theme-color2)">
				{data.page.introductionSubtitle}
			</h2>
			<p
				class="mt-2 mb-6 text-3xl font-bold tracking-wide md:text-4xl"
				style="color: var(--website-theme-color1)"
			>
				{data.page.introductionTitle}
			</p>
			<StyledText data={data.page.introductionContent} />
		</div>
	</section>

	<!-- History Section -->
	{#if data.page.historySection && data.page.historySection.length}
		<section class="bg-gray-50 py-16 md:py-24">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-4xl text-center">
					<h2 class="text-lg font-semibold md:text-xl" style="color: var(--website-theme-color2)">
						{data.page.historySubtitle}
					</h2>
					<p
						class="mt-2 text-3xl font-bold tracking-wider md:text-4xl"
						style="color: var(--website-theme-color1)"
					>
						{data.page.historyTitle}
					</p>
				</div>
				<div class="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
					{#each data.page.historySection as section (section.id)}
						<div class="w-full">
							<img
								src={section.imageUrl}
								alt={section.imageAlt}
								class="h-auto w-full rounded-lg object-cover shadow-md"
							/>
						</div>
						<div class="rounded-lg bg-yellow-50 p-6 md:p-8">
							<StyledText data={section.content} />
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Team Section -->
	{#if data.page.teamSection}
		<section class="bg-white py-16 md:py-24">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-4xl text-center">
					<h2 class="text-lg font-semibold md:text-xl" style="color: var(--website-theme-color2)">
						{data.page.teamSubtitle}
					</h2>
					<p
						class="mt-2 text-3xl font-bold tracking-wider md:text-4xl"
						style="color: var(--website-theme-color1)"
					>
						{data.page.teamTitle}
					</p>
				</div>

				<div class="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.page.teamSection as member (member.id)}
						<div class="text-center">
							<img
								src={member.avatarUrl}
								alt={member.avatarAlt}
								class="mx-auto h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg"
							/>
							<h3 class="mt-6 text-xl font-bold" style="color: var(--website-theme-color1)">
								{member.name}
							</h3>
							<p class="mt-2" style="color: var(--website-theme-color2)">{member.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}
</main>
