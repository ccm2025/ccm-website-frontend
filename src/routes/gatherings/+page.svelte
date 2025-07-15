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
				alt="Gatherings background"
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

	<!-- Categories Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="text-lg font-semibold text-yellow-600 md:text-xl">
					{data.page.categoriesSubtitle}
				</h2>
				<p class="mt-2 text-3xl font-bold tracking-wider text-green-800 md:text-4xl">
					{data.page.categoriesTitle}
				</p>
			</div>

			{#if data.page.categories}
				<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each data.page.categories as category (category.id)}
						<a
							href="/gatherings/{category.name.toLowerCase().replace(/\s+/g, '-')}"
							class="group block overflow-hidden rounded-lg bg-gray-50 shadow-md transition-shadow duration-300 hover:shadow-xl"
						>
							<div class="h-48 overflow-hidden">
								<img
									src={category.imageUrl}
									alt={category.imageAlt}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							</div>
							<div class="p-6">
								<h3 class="text-xl font-bold text-gray-800">{category.name}</h3>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Upcoming Events Section -->
	<section class="bg-gray-50 py-16 md:py-24">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="text-lg font-semibold text-yellow-600 md:text-xl">
					{data.page.eventsSubtitle}
				</h2>
				<p class="mt-2 text-3xl font-bold tracking-wider text-green-800 md:text-4xl">
					{data.page.eventsTitle}
				</p>
			</div>

			{#if data.events.upcoming}
				<div class="mx-auto mt-12 max-w-4xl space-y-12">
					{#each data.events.upcoming as event (event.id)}
						<div class="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
							<div class="md:col-span-1">
								<img
									src={event.imageUrl}
									alt={event.imageAlt}
									class="h-auto w-full rounded-lg object-cover shadow-md"
								/>
							</div>
							<div class="md:col-span-2">
								<h3 class="text-2xl font-bold text-gray-800">{event.title}</h3>
								<p class="mt-2 font-semibold text-yellow-600">{event.date}</p>
								<p class="mt-1 text-gray-600">{event.location}</p>
								<div class="prose mt-4 max-w-none text-gray-700">
									{@html event.description}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-center text-gray-500">There are no upcoming events at the moment.</p>
			{/if}
		</div>
	</section>

	<!-- Past Events Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="text-lg font-semibold text-yellow-600 md:text-xl">
					{data.page.pastEventsSubtitle}
				</h2>
				<p class="mt-2 text-3xl font-bold tracking-wider text-green-800 md:text-4xl">
					{data.page.pastEventsTitle}
				</p>
			</div>

			{#if data.events.past}
				<div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.events.past as event (event.id)}
						<a
							href="/events/{event.id}"
							class="group relative block h-64 overflow-hidden rounded-lg shadow-lg"
						>
							<div class="absolute inset-0">
								<img
									src={event.imageUrl}
									alt={event.imageAlt}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
							</div>
							<div class="relative flex h-full flex-col items-start justify-end p-4 text-white">
								<h3 class="text-xl font-bold">{event.title}</h3>
								<p class="text-sm">{event.date}</p>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<p class="mt-12 text-center text-gray-500">No past events to show.</p>
			{/if}
		</div>
	</section>
</main>
