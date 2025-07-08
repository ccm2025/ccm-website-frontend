<script>
	// =================================================
	// All shared components and styles
	// =================================================
	import '../app.css';
	import { ChevronRight, Globe, Menu, X } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import logoImage from '$lib/assets/logo.png';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
	<link rel="icon" type="image/svg" href={logoImage} />
	<style>
		body {
			font-family: 'Inter', sans-serif;
		}
		:root {
			--hero-title-color: #ffffff;
			--hero-subtitle-color: #a7f3d0;
			--hero-text-color: #ffffff;
			--quote-text-color: #ca8a04;
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
							华人校园事工
						</div>
						<div
							class="text-xs font-medium tracking-wider"
							style="color: var(--website-theme-color1)"
						>
							CHINESE COLLEGIAL MINISTRY
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
	<footer class="bg-[#164e32] text-gray-200">
		<div class="container mx-auto px-4 py-16">
			<div class="grid grid-cols-1 gap-12 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
				<div class="flex flex-col items-center md:items-start">
					<a href="/" class="flex items-center space-x-3">
						<img
							src={logoImage}
							alt="Chinese Collegian Ministry Logo"
							class="h-10 w-auto rounded-full bg-white p-1"
						/>
						<div>
							<div class="text-lg leading-tight font-bold text-white">华人家园事工</div>
							<div class="text-xs font-medium tracking-wider text-gray-400">
								CHINESE COLLEGIAN MINISTRY
							</div>
						</div>
					</a>
					<div class="mt-4 mb-6 h-1 w-24 rounded bg-[#d4af37]"></div>
					<div class="flex space-x-4">
						<a
							href="/"
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
							href="/"
							aria-label="WeChat"
							class="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white transition-opacity hover:opacity-90"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path
									d="M11.944 16.944c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm-6.23-6.425c-.012.13-.02.26-.02.395 0 3.313 2.686 6 6 6 .14 0 .27-.01.405-.022-2.934 1.63-6.37 1.49-6.385 1.49-.11 0-.17-.09-.13-.19.41-.97.23-2.12-.49-3.25-.19-.3-.02-.7.29-.7.89.02 1.83-.16 2.33-.815zM18.39 9.335c.18-.93-.16-1.9-1.03-2.39-.87-.49-1.93-.15-2.39 1.02-.46 1.18.15 2.44 1.02 2.89.87.46 1.93.12 2.4-1.52zM12 2C6.477 2 2 6.477 2 12c0 4.414 2.863 8.163 6.707 9.494.09.016.19.03.293.03.26 0 .5-.16.59-.41.52-1.42.48-2.99-.12-4.395-.12-.28.05-.58.33-.68.6-.2 1.25-.33 1.95-.33.68 0 1.33.12 1.92.32.28.1.45.4.33.68-.6 1.405-.64 2.975-.12 4.395.09.25.33.41.59.41.1 0 .2-.014.29-.03C19.137 20.163 22 16.414 22 12c0-5.523-4.477-10-10-10z"
								/></svg
							></a
						>
						<a
							href="/"
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
					<h3 class="mb-4 text-xl font-bold text-white">Contact Info</h3>
					<div class="space-y-2 text-gray-300">
						<p>Location: address sclnsdbfabk.<br />Gainesville, Fl 32607</p>
						<p>Email: email@address.com</p>
						<p>TEL: (xxx) xxx-xxxx</p>
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
						<a href="/plan-visit" class="block text-gray-300 underline hover:text-white"
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
	{#if isMenuOpen}
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
					<a href="/">Home</a>
					<a href="/about">About Us</a>
					<a href="/activities">Gatherings</a>
					<a href="/contact">Freshman Zone</a>
					<a href="/contact">Support</a>
					<a href="/contact">Give</a>
					<a href="/contact">Volunteer</a>
					<a href="/contact">Plan Your Visit</a>
					<hr class="my-4" />
				</nav>
			</div>
		</div>
	{/if}
</div>
