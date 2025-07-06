<script>
	// 导入 lucide-svelte 图标库，用于菜单和地球图标
	import { Globe, Menu, X, ChevronRight } from 'lucide-svelte';

	import logoImage from '$lib/assets/logo.png';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// 用于控制菜单的显示和隐藏
	let isMenuOpen = true;

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
	<!-- 1. 顶部导航栏 -->
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

				<!-- 桌面端导航 -->
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

	<!-- 2. 主体内容 -->
	<main>
		<!-- Hero Section -->
		<section
			class="relative flex h-[calc(100vh-80px)] min-h-[500px] items-center justify-center text-center text-white"
		>
			<!-- 背景图片 -->
			<div class="absolute inset-0">
				<!-- 您可以将此处的 URL 替换为您自己的背景图片 -->
				<img
					src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Community gathering"
					class="h-full w-full object-cover"
				/>
				<!-- 背景遮罩，确保文字清晰可读 -->
				<div class="absolute inset-0 bg-black/50"></div>
			</div>

			<!-- Hero 内容 -->
			<div class="relative z-10 px-4">
				<h1 class="text-4xl font-bold tracking-tight uppercase md:text-6xl">
					Chinese Collegian Ministry
				</h1>
				<p class="mt-4 text-2xl font-medium text-green-300 md:text-3xl">Join Us This Sunday!</p>
				<p class="mx-auto mt-6 max-w-3xl text-lg md:text-xl">
					Fellowship Activities | 6 PM - Dinner | 7 PM - Bible Study
				</p>
				<a
					href="/learn-more"
					class="mt-10 inline-block rounded-full border-2 border-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-green-700"
				>
					Learn More
				</a>
			</div>
		</section>
	</main>
</div>

<!-- 侧滑菜单 -->
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
