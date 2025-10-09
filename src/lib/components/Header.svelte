<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import favicon from '$lib/assets/favicon.jpeg';
	import { page } from '$app/state';

	let menuOpen = $state(false);
	let currentPath = $derived(page.url.pathname);

	function isActive(path: string): boolean {
		if (path === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(path);
	}
</script>

<nav class="flex items-center justify-between">
	<div class="flex items-center gap-2">
		<img src={favicon} alt="Favicon" class="h-12 max-w-full rounded-2xl" />

		{#if currentPath !== '/'}
			<a href="/">
				<b>Henry Ihenacho</b>
			</a>
		{/if}
	</div>

	<!-- Desktop nav -->
	<ul class="hidden gap-7 sm:flex">
		<li class="hover:underline">
			<a href="/" class={isActive('/') ? 'underline' : ''}>Me</a>
		</li>
		<li class="hover:underline">
			<a href="/writing" class={isActive('/writing') ? 'underline' : ''}>Writing</a>
		</li>
		<li class="hover:underline">
			<a href="/projects" class={isActive('/projects') ? 'underline' : ''}>Projects</a>
		</li>
		<li class="hover:underline">
			<a href="/resume" class={isActive('/resume') ? 'underline' : ''}>Resume</a>
		</li>
		<li class="hover:underline">
			<a href="/media" class={isActive('/media') ? 'underline' : ''}>Media</a>
		</li>
	</ul>

	<!-- Mobile dropdown -->
	<div class="relative sm:hidden">
		<button class="p-2" aria-label="Open menu" onclick={() => (menuOpen = !menuOpen)}>
			<Menu class="h-6 w-6 transition-transform duration-300 {menuOpen ? 'rotate-90' : ''}" />
		</button>
		{#if menuOpen}
			<ul class="absolute right-0 z-10 mt-2 w-40 rounded border bg-white shadow-lg">
				<li class="hover:bg-gray-100">
					<a
						href="/"
						class="block px-4 py-2 {isActive('/') ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Me</a
					>
				</li>
				<li class="hover:bg-gray-100">
					<a
						href="/writing"
						class="block px-4 py-2 {isActive('/writing') ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Writing</a
					>
				</li>
				<li class="hover:bg-gray-100">
					<a
						href="/projects"
						class="block px-4 py-2 {isActive('/projects') ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Projects</a
					>
				</li>
				<li class="hover:bg-gray-100">
					<a
						href="/resume"
						class="block px-4 py-2 {isActive('/resume') ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Resume</a
					>
				</li>
				<li class="hover:bg-gray-100">
					<a
						href="/media"
						class="block px-4 py-2 {isActive('/media') ? 'underline' : ''}"
						onclick={() => (menuOpen = false)}>Media</a
					>
				</li>
			</ul>
		{/if}
	</div>
</nav>
