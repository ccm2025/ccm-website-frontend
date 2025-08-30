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

	<!-- Introduction Section -->
	<section class="bg-white py-16 md:py-20">
		<div class="container mx-auto max-w-5xl px-4 text-center">
			<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
				{data.page.introduction_subtitle}
			</h2>
			<p
				class="mt-2 mb-6 text-3xl font-bold tracking-wide text-[rgb(var(--website-theme-color1))] md:text-4xl"
			>
				{data.page.introduction_title}
			</p>
			<StyledText data={data.page.introduction_content} />
		</div>
	</section>

	<!-- History Section -->
	{#if data.page.history_section && data.page.history_section.length}
		<section class="bg-gray-50 py-16 md:py-20">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-4xl text-center">
					<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
						{data.page.history_subtitle}
					</h2>
					<p
						class="mt-2 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
					>
						{data.page.history_title}
					</p>
				</div>
				<div class="mt-12 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
					{#each data.page.history_section as section (section.id)}
						<div class="w-full">
							<img
								src={section.image.url}
								alt={section.image.alt}
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
	{#if data.page.team_section && data.page.team_section.length}
		<section class="bg-white py-16 md:py-20">
			<div class="container mx-auto px-4">
				<div class="mx-auto max-w-4xl text-center">
					<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
						{data.page.team_subtitle}
					</h2>
					<p
						class="mt-2 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
					>
						{data.page.team_title}
					</p>
				</div>

				<div class="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.page.team_section as member (member.id)}
						<div class="text-center">
							<img
								src={member.avatar.url}
								alt={member.avatar.alt}
								class="mx-auto h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg"
							/>
							<h3
								class="mt-6 text-xl font-bold tracking-tight text-[rgb(var(--website-theme-color1))] md:text-2xl"
							>
								{member.name}
							</h3>
							<p class="mt-2 text-[rgb(var(--website-theme-color2))]">{member.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}
</main>
