<script>
	import StyledText from '$lib/components/StyledText.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	import { page } from '$app/state';
	$: lang = page.params.lang;
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

	<!-- Upcoming Events Section -->
	<section class="bg-gray-50 py-16 md:py-20">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
					{data.page.upcoming_events_subtitle}
				</h2>
				<p
					class="mt-2 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
				>
					{data.page.upcoming_events_title}
				</p>
			</div>

			{#if data.page.upcoming_events.length > 0}
				<div class="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6">
					{#each data.page.upcoming_events as event (event.id)}
						<a href={`/${lang}/events/${event.slug}`}>
							<div
								class="grid transform grid-cols-1 items-start gap-8 transition-transform duration-200 hover:scale-105 md:grid-cols-3"
							>
								<div class="md:col-span-1">
									<img
										src={event.content_image.url}
										alt={event.content_image.alt}
										class="h-auto w-full rounded-lg object-cover shadow-md"
									/>
								</div>
								<div class="md:col-span-2">
									<h3 class="text-2xl font-bold text-[rgb(var(--website-theme-color1))]">
										{event.title}
									</h3>
									<p class="mt-2 mb-4 font-semibold text-[rgb(var(--website-theme-color2))]">
										{event.date}
									</p>
									<StyledText data={event.content.slice(0, 2)} />
								</div>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<p class="mt-12 text-center text-3xl">{data.page.upcoming_events_empty_text}</p>
			{/if}
		</div>
	</section>

	<!-- Past Events Section -->
	<section class="bg-white py-16 md:py-20">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="text-lg font-semibold text-[rgb(var(--website-theme-color2))] md:text-xl">
					{data.page.past_events_subtitle}
				</h2>
				<p
					class="mt-2 text-3xl font-bold tracking-wider text-[rgb(var(--website-theme-color1))] md:text-4xl"
				>
					{data.page.past_events_title}
				</p>
			</div>

			{#if data.page.past_events.length > 0}
				<div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{#each data.page.past_events as event (event.id)}
						<a
							href={`/${lang}/events/${event.slug}`}
							class="group relative block h-56 overflow-hidden rounded-lg shadow-lg"
						>
							<div class="absolute inset-0">
								<img
									src={event.content_image.url}
									alt={event.content_image.alt}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
							</div>
							<div class="relative flex h-full flex-col items-start justify-end p-4">
								<h3 class="text-xl font-bold text-[rgb(var(--website-theme-color2))]">
									{event.title}
								</h3>
								<p class="text-sm text-[rgb(var(--website-theme-color2))]">{event.date}</p>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<p class="mt-12 text-center text-3xl">{data.page.past_events_empty_text}</p>
			{/if}
		</div>
	</section>
</main>
