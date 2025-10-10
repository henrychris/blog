<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { ROUTES, type Route } from '$lib/constants/routes';
	import { IMAGES } from '$lib/constants/images';

	let menuOpen = $state(false);
	let currentPath = $derived(page.url.pathname);

	const resolvedHome = $derived(resolve(ROUTES.HOME));
	const resolvedResume = $derived(resolve(ROUTES.RESUME));

	function isActive(routePath: Route): boolean {
		const resolvedPath = resolve(routePath);
		if (routePath === ROUTES.HOME) {
			return currentPath === resolvedPath || currentPath === resolvedPath + '/';
		}
		return currentPath.startsWith(resolvedPath);
	}
</script>

<nav class="flex items-center justify-between">
	<div class="flex items-center gap-2">
		<img src={IMAGES.ME} alt="Favicon" class="h-12 max-w-full rounded-2xl" />

		{#if currentPath !== resolvedHome && currentPath !== resolvedResume}
			<a href={resolvedHome}>
				<b>Henry Ihenacho</b>
			</a>
		{/if}
	</div>

	<!-- Desktop nav -->
	<ul class="hidden gap-7 sm:flex">
		<li class="hover:underline">
			<a href={resolve(ROUTES.HOME)} class={isActive(ROUTES.HOME) ? 'underline' : ''}>Me</a>
		</li>
		<li class="hover:underline">
			<a href={resolve(ROUTES.WRITING)} class={isActive(ROUTES.WRITING) ? 'underline' : ''}
				>Writing</a
			>
		</li>
		<li class="hover:underline">
			<a href={resolve(ROUTES.PROJECTS)} class={isActive(ROUTES.PROJECTS) ? 'underline' : ''}
				>Projects</a
			>
		</li>
		<li class="hover:underline">
			<a href={resolve(ROUTES.RESUME)} class={isActive(ROUTES.RESUME) ? 'underline' : ''}>Resume</a>
		</li>
		<li class="hover:underline">
			<a href={resolve(ROUTES.MEDIA)} class={isActive(ROUTES.MEDIA) ? 'underline' : ''}>Media</a>
		</li>
	</ul>

	<!-- Mobile dropdown -->
	<div class="relative sm:hidden">
		<button class="relative p-2" aria-label="Open menu" onclick={() => (menuOpen = !menuOpen)}>
			<div class="relative h-6 w-6">
				<div
					class="absolute inset-0 transition-all duration-300 {menuOpen
						? 'rotate-90 opacity-0'
						: 'rotate-0 opacity-100'}"
				>
					<Menu class="h-6 w-6" />
				</div>
				<div
					class="absolute inset-0 transition-all duration-300 {menuOpen
						? 'rotate-0 opacity-100'
						: '-rotate-90 opacity-0'}"
				>
					<X class="h-6 w-6" />
				</div>
			</div>
		</button>
		{#if menuOpen}
			<ul class="absolute right-0 z-10 mt-2 w-40 rounded border bg-white shadow-lg">
				<li class="hover:bg-gray-100">
					<a
						href={resolve(ROUTES.HOME)}
						class="block px-4 py-2 {isActive(ROUTES.HOME) ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Me</a
					>
				</li>
				<li class="hover:bg-gray-100">
					<a
						href={resolve(ROUTES.WRITING)}
						class="block px-4 py-2 {isActive(ROUTES.WRITING) ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Writing</a
					>
				</li>
				<li class="hover:bg-gray-100">
					<a
						href={resolve(ROUTES.PROJECTS)}
						class="block px-4 py-2 {isActive(ROUTES.PROJECTS) ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Projects</a
					>
				</li>
				<li class="hover:bg-gray-100">
					<a
						href={resolve(ROUTES.RESUME)}
						class="block px-4 py-2 {isActive(ROUTES.RESUME) ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Resume</a
					>
				</li>
				<li class="hover:bg-gray-100">
					<a
						href={resolve(ROUTES.MEDIA)}
						class="block px-4 py-2 {isActive(ROUTES.MEDIA) ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Media</a
					>
				</li>
			</ul>
		{/if}
	</div>
</nav>
