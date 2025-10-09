<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Post } from '$lib/types';

	const { data } = $props();
	let posts: Post[] = data.posts;

	const POSTS_PER_PAGE = 10;
	let currentPage = $state(1);

	let totalPages = $derived(Math.ceil(posts.length / POSTS_PER_PAGE));
	let paginatedPosts = $derived.by(() => {
		const start = (currentPage - 1) * POSTS_PER_PAGE;
		const end = start + POSTS_PER_PAGE;
		return posts.slice(start, end);
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
</script>

<svelte:head>
	<title>Writing</title>
</svelte:head>

<section class="flex flex-col gap-2">
	<h1 class="text-2xl font-bold">Writing</h1>

	<ul class="flex flex-col gap-1">
		{#each paginatedPosts as post (post.slug)}
			<li class="flex items-baseline justify-between gap-4 text-blue-700 hover:underline">
				<a href="writing/{post.slug}" class="truncate">{post.title}</a>
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
