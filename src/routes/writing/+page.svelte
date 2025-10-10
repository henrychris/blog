<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Post } from '$lib/types';
	import { resolve } from '$app/paths';
	import { ROUTES } from '$lib/constants/routes';

	const { data } = $props();
	let posts: Post[] = data.posts;

	const POSTS_PER_PAGE = 10;
	let currentPage = $state(1);
	let searchQuery = $state('');

	let filteredPosts = $derived.by(() => {
		if (!searchQuery.trim()) {
			return posts;
		}
		return posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
	});

	let totalPages = $derived(Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
	let paginatedPosts = $derived.by(() => {
		const start = (currentPage - 1) * POSTS_PER_PAGE;
		const end = start + POSTS_PER_PAGE;
		return filteredPosts.slice(start, end);
	});

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function handleSearch() {
		currentPage = 1; // Reset to first page when searching
	}
</script>

<svelte:head>
	<title>Writing</title>
</svelte:head>

<section class="flex flex-col gap-2">
	<h1 class="text-2xl font-bold">Writing</h1>

	<div class="relative">
		<input
			type="text"
			bind:value={searchQuery}
			oninput={handleSearch}
			placeholder="Search posts by title..."
			class="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
		/>
		{#if searchQuery}
			<button
				onclick={() => {
					searchQuery = '';
					handleSearch();
				}}
				class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
				aria-label="Clear search"
			>
				✕
			</button>
		{/if}
	</div>

	{#if filteredPosts.length === 0}
		<p class="text-sm text-gray-500">No posts found matching "{searchQuery}"</p>
	{/if}

	<ul class="flex flex-col gap-1">
		{#each paginatedPosts as post (post.slug)}
			<li class="flex items-baseline justify-between gap-4 text-blue-700 hover:underline">
				<a href={resolve(`${ROUTES.WRITING}/${post.slug}`)} class="truncate">{post.title}</a>
				<span class="shrink-0 text-sm text-blue-400">{formatDate(post.date)}</span>
			</li>
		{/each}
	</ul>

	{#if totalPages > 1}
		<div class="flex items-center justify-between gap-4">
			<button
				onclick={prevPage}
				disabled={currentPage === 1}
				class="cursor-pointer px-4 py-2 text-sm hover:underline disabled:cursor-not-allowed disabled:opacity-50"
			>
				← Previous
			</button>

			<span class="text-sm text-gray-600">
				{currentPage} of {totalPages}
			</span>

			<button
				onclick={nextPage}
				disabled={currentPage === totalPages}
				class="cursor-pointer px-4 py-2 text-sm hover:underline disabled:cursor-not-allowed disabled:opacity-50"
			>
				Next →
			</button>
		</div>
	{/if}
</section>
