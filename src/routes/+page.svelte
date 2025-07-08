<script>
	import { SkipBack, PlayCircle, SkipForward, Volume2 } from 'lucide-svelte';
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
	<style>
		body {
			font-family: 'Inter', sans-serif;
		}
		:root {
			--website-theme-color1: #154e30; /* 深绿色 */
			--website-theme-color2: #e9aa1c; /* 金色 */
		}
	</style>
</svelte:head>

<main>
	<!-- Hero Section -->
	<section
		class="relative flex h-[calc(100vh-80px)] min-h-[500px] items-center justify-center text-center text-white"
	>
		<div class="absolute inset-0">
			<img
				src={'https://via.placeholder.com/1920x1080'}
				alt="Community gathering"
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-black/50"></div>
		</div>
		<div class="relative z-10 px-4">
			<h1
				class="text-4xl font-bold tracking-tight uppercase md:text-6xl"
				style="color: var(--hero-title-color)"
			>
				Chinese Collegian Ministry
			</h1>
			<p class="mt-4 text-2xl font-medium md:text-3xl" style="color: var(--hero-subtitle-color)">
				Join Us This Sunday!
			</p>
			<p class="mx-auto mt-6 max-w-3xl text-lg md:text-xl" style="color: var(--hero-text-color)">
				Fellowship Activities | 6 PM - Dinner | 7 PM - Bible Study
			</p>
			<a
				href="/learn-more"
				class="mt-10 inline-block rounded-full border-2 border-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-green-700"
				>Learn More</a
			>
		</div>
	</section>

	<!-- Introduction Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto max-w-4xl px-4 text-center">
			<h2 class="text-2xl text-gray-800 md:text-3xl">
				A Student Fellowship Serving Chinese Students.
			</h2>
			<p class="mt-6 text-xl text-gray-600 md:text-2xl">
				Find us in person at <strong class="font-semibold text-green-700"
					>The UF Christian Campus House</strong
				><br />Location: 1810 NW 1st Ave, Gainesville, FL 32603
			</p>
			<blockquote class="mt-12 md:mt-16">
				<p
					class="text-xl leading-relaxed italic md:text-2xl"
					style="color: var(--quote-text-color);"
				>
					“我实实在在地告诉你们，一粒麦子不落在地里死了，仍旧是一粒；若是死了，就结出许多子粒来。”
					(约翰福音 12:24)
				</p>
			</blockquote>
			<p class="mt-8 text-xl text-gray-700 md:text-2xl">
				在主的恩典中，我们愿将自己埋在校园的土壤中，让一粒麦子结出许多子粒。
			</p>
		</div>
	</section>

	<!-- 视频/图片展示区域 -->
	<section class="bg-[#164e32] py-16 md:py-24">
		<div class="container mx-auto px-4">
			<div
				class="mx-auto max-w-4xl rounded-lg border border-gray-700 bg-gray-900/80 p-3 shadow-2xl backdrop-blur-sm md:p-4"
			>
				<div
					class="aspect-w-16 aspect-h-9 flex items-center justify-center rounded-md bg-[#1a3a2a]"
				>
					<span class="text-3xl font-bold tracking-widest text-white/70 md:text-4xl">视频</span>
				</div>
				<div class="mt-4 px-2">
					<div class="group h-1.5 rounded-full bg-gray-600">
						<div class="relative h-1.5 w-1/4 rounded-full bg-red-600">
							<div
								class="absolute top-1/2 right-0 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100"
							></div>
						</div>
					</div>
					<div class="mt-3 flex items-center justify-between text-white/80">
						<div class="flex items-center space-x-4">
							<button class="transition-colors hover:text-white"><SkipBack /></button>
							<button class="transition-colors hover:text-white"><PlayCircle size="36" /></button>
							<button class="transition-colors hover:text-white"><SkipForward /></button>
						</div>
						<div>
							<button class="transition-colors hover:text-white"><Volume2 /></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Meet With Us Section -->
	<section class="bg-white py-16 md:py-24">
		<div class="container mx-auto px-4">
			<h2 class="text-center text-3xl font-bold tracking-wider text-green-800 md:text-4xl">
				MEET WITH US!
			</h2>
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
				<a href="/about" class="group relative block h-64 overflow-hidden rounded-lg shadow-lg">
					<div class="absolute inset-0">
						<img
							src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
							alt="About us"
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-black/50"></div>
					</div>
					<div
						class="relative flex h-full flex-col items-center justify-center p-4 text-center text-white"
					>
						<h3 class="text-3xl font-bold tracking-widest uppercase">About Us</h3>
						<div
							class="text-md mt-4 rounded-full border-2 border-white px-6 py-2 font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							Learn More
						</div>
					</div>
				</a>
				<a
					href="/gatherings"
					class="group relative block h-64 overflow-hidden rounded-lg shadow-lg"
				>
					<div class="absolute inset-0">
						<img
							src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
							alt="Gatherings"
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-black/50"></div>
					</div>
					<div
						class="relative flex h-full flex-col items-center justify-center p-4 text-center text-white"
					>
						<h3 class="text-3xl font-bold tracking-widest uppercase">Gatherings</h3>
						<div
							class="text-md mt-4 rounded-full border-2 border-white px-6 py-2 font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							Learn More
						</div>
					</div>
				</a>
				<a
					href="/announcements"
					class="group relative block h-64 overflow-hidden rounded-lg shadow-lg"
				>
					<div class="absolute inset-0">
						<img
							src="https://images.unsplash.com/photo-1560439546-3da649527893?q=80&w=1974&auto=format&fit=crop"
							alt="Announcements"
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-black/50"></div>
					</div>
					<div
						class="relative flex h-full flex-col items-center justify-center p-4 text-center text-white"
					>
						<h3 class="text-3xl font-bold tracking-widest uppercase">Announcements</h3>
						<div
							class="text-md mt-4 rounded-full border-2 border-white px-6 py-2 font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							Learn More
						</div>
					</div>
				</a>
			</div>
			<div class="mt-16 text-center text-xl text-gray-700 md:text-2xl">
				<p>Want to learn more about us and our upcoming events?</p>
				<p class="font-semibold">Click and check out!</p>
			</div>
		</div>
	</section>
</main>
