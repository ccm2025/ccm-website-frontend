<script>
	/** @type {import('./$types').PageData} */
	export let data;
	// =================================================
	// All shared components and styles
	// =================================================
	import '../app.css';
	import { ChevronRight, Globe, Menu, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import logoImage from '$lib/assets/logo.png';
	import { isMenuOpen, toggleMenu } from '$lib/stores/SideMenu';
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
	<link rel="icon" type="image/svg" href={'/favicon.svg'} />
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

<div class="min-h-screen bg-white text-gray-800">
	<!-- =================================================
  // Shared Header
  // ================================================= -->
	<header class="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
		<div class="container mx-auto px-4">
			<div class="flex h-25 items-center justify-between">
				<!-- Logo -->
				<a href="/" class="flex items-center space-x-3">
					<img src={logoImage} alt="Logo" class="h-30 w-30 rounded-full" />
					<div>
						<div
							class="text-2xl font-medium tracking-wider"
							style="color: var(--website-theme-color1)"
						>
							{data.global?.websiteTitleCn}
						</div>
						<div
							class="text-xs font-medium tracking-wider"
							style="color: var(--website-theme-color1)"
						>
							{data.global?.websiteTitleEn}
						</div>
					</div>
				</a>

				<!-- Navigation -->
				<nav class="hidden items-center space-x-16 md:flex">
					<button
						class="flex items-center space-x-1 rounded-full border-2 px-2 py-2 font-medium"
						style="color: var(--website-theme-color1) ; border-color: var(--website-theme-color1)"
					>
						<Globe size="22" />
						<span>English</span>
						<ChevronRight size="22" />
					</button>
					<button
						class="flex items-center space-x-2 text-2xl font-bold"
						style="color: var(--website-theme-color1)"
						on:click={toggleMenu}
					>
						<span>Menu</span>
						<Menu size="46" />
					</button>
				</nav>
			</div>
		</div>
	</header>

	<!-- =================================================
  // Slot for page content
  // ================================================= -->
	<slot />

	<!-- =================================================
  // Shared Footer
  // ================================================= -->
	<footer class="text-gray-200" style="background-color: var(--website-theme-color1)">
		<div class="container mx-auto px-4 py-16">
			<div class="grid grid-cols-1 gap-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
				<div class="flex flex-col items-center md:items-start">
					<a href="/" class="flex items-center space-x-3">
						<img
							src={logoImage}
							alt={data.global?.websiteTitleEn}
							class="h-10 w-auto rounded-full bg-white p-1"
						/>
						<div>
							<div class="text-lg leading-tight font-bold text-white">
								{data.global?.websiteTitleCn}
							</div>
							<div class="text-xs font-medium tracking-wider text-gray-400">
								{data.global?.websiteTitleEn}
							</div>
						</div>
					</a>
					<div class="mt-4 mb-6 h-1 w-24 rounded bg-[#d4af37]"></div>
					<div class="flex space-x-4">
						<a
							href={data.global?.socialLinks.instagram || '/'}
							aria-label="Instagram"
							class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 text-white transition-opacity hover:opacity-90"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path
									d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
								></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg
							></a
						>
						<a
							href={data.global?.socialLinks.youtube || '/'}
							aria-label="YouTube"
							class="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white transition-opacity hover:opacity-90"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path
									d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"
								/></svg
							></a
						>
					</div>
				</div>
				<div>
					<h3 class="mb-4 text-xl font-bold text-white">{data.global?.contactTitle}</h3>
					<div class="space-y-2 text-gray-300">
						<p>{data.global?.address}</p>
						<p>{data.global?.email}</p>
					</div>
				</div>
				<div>
					<h3 class="mb-4 text-xl font-bold text-white">Navigation</h3>
					<nav class="space-y-2">
						<a href="/" class="block text-gray-300 hover:text-white hover:underline">Home</a>
						<a href="/about" class="block text-gray-300 hover:text-white hover:underline"
							>About Us</a
						>
						<a href="/gatherings" class="block text-gray-300 hover:text-white hover:underline"
							>Gatherings</a
						>
						<a href="/freshman" class="block text-gray-300 hover:text-white hover:underline"
							>Freshman Zone</a
						>
					</nav>
				</div>
				<div>
					<h3 class="mb-4 text-xl font-bold text-white">Get Involved</h3>
					<nav class="space-y-2">
						<a href="/plan-your-visit" class="block text-gray-300 hover:text-white hover:underline"
							>Plan Your Visit</a
						>
						<a href="/give" class="block text-gray-300 hover:text-white hover:underline">Give</a>
						<a href="/volunteer" class="block text-gray-300 hover:text-white hover:underline"
							>Volunteer</a
						>
						<a href="/support" class="block text-gray-300 hover:text-white hover:underline"
							>Support</a
						>
					</nav>
				</div>
			</div>
		</div>
	</footer>

	<!-- Side Menu -->
	{#if $isMenuOpen}
		<div
			class="fixed top-0 right-0 z-50 h-full w-1/5 max-w-sm"
			style="background-color: var(--website-theme-color2);"
			in:fly={{ x: '100%', duration: 300, easing: quintOut }}
			out:fly={{ x: '100%', duration: 300, easing: quintOut }}
		>
			<div class="p-8">
				<div class="mb-8 flex items-center justify-end">
					<button on:click={toggleMenu} class="p-2">
						<X size="40" />
					</button>
				</div>
				<nav class="flex flex-col space-y-4 text-2xl text-white">
					<a href="/" on:click={toggleMenu}>Home</a>
					<a href="/about" on:click={toggleMenu}>About Us</a>
					<a href="/gatherings" on:click={toggleMenu}>Gatherings</a>
					<a href="/freshman" on:click={toggleMenu}>Freshman Zone</a>
					<a href="/support" on:click={toggleMenu}>Support</a>
					<a href="/give" on:click={toggleMenu}>Give</a>
					<a href="/volunteer" on:click={toggleMenu}>Volunteer</a>
					<a href="/plan-your-visit" on:click={toggleMenu}>Plan Your Visit</a>
					<hr class="my-4" />
				</nav>
			</div>
		</div>
	{/if}
</div>
