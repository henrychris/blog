<script lang="ts">
	import { formatDate } from '$lib/utils';
	import type { Post } from '$lib/types';

	const { data } = $props();
	let posts: Post[] = data.posts;
</script>

<svelte:head>
	<title>Writing</title>
</svelte:head>

<section class="flex flex-col gap-2">
	<h1 class="text-2xl font-bold">Writing</h1>
	<ul class="grid gap-7">
		{#each posts as post}
			<li class="max-w-prose border-b border-gray-200 pb-7 last:border-b-0">
				<a href="writing/{post.slug}" class="text-3xl capitalize hover:underline">{post.title}</a>
				<p class="text-gray-600">{formatDate(post.date)}</p>
				<p class="mt-3">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>
