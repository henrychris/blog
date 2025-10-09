<script lang="ts">
	import { formatDate } from '$lib/utils';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="mx-auto flex max-w-prose flex-col gap-7">
	<hgroup class="flex flex-col gap-2">
		<h1 class="capitalize">{data.meta.title}</h1>
		<p class=" text-gray-600">Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="flex gap-3">
		{#each data.meta.categories as category}
			<span class="surface-4 rounded-full px-3 py-2">&num;{category}</span>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>
