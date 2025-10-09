<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	let { data } = $props();
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<ul class="grid gap-7">
		{#each data.posts as post}
			<li class="max-w-prose border-b border-gray-200 pb-7 last:border-b-0">
				<a href={post.slug} class="text-3xl capitalize hover:underline">{post.title}</a>
				<p class="text-gray-600">{formatDate(post.date)}</p>
				<p class="mt-3">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>
