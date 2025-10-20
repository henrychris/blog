<script lang="ts">
	import { formatDate } from '$lib/utils';
	import TableOfContents from '$lib/components/TableOfContents.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<meta property="article:published_time" content={data.meta.date} />
	{#each data.meta.categories as category}
		<meta property="article:tag" content={category} />
	{/each}
</svelte:head>

<div class="flex items-center justify-center">
	<div class="flex max-w-7xl gap-8">
		<article class="flex max-w-3xl flex-col gap-8">
			<div class="flex flex-col gap-2">
				<h1 class="text-2xl font-bold">{data.meta.title}</h1>
				<p class="text-sm text-gray-500">{formatDate(data.meta.date)}</p>
				{#if data.meta.categories.length > 0}
					<div class="flex gap-2">
						{#each data.meta.categories as category (category)}
							<span class="text-xs text-gray-600">#{category}</span>
						{/each}
					</div>
				{/if}
			</div>

			<div class="article-content">
				<data.content />
			</div>
		</article>

		<aside class="hidden w-64 lg:block">
			<TableOfContents />
		</aside>
	</div>
</div>

<style>
	.article-content :global(h2) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.article-content :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.article-content :global(p) {
		margin-bottom: 1rem;
		line-height: 1.75;
	}

	.article-content :global(ul),
	.article-content :global(ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
		list-style: revert;
	}

	.article-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.article-content :global(code) {
		background-color: #f3f4f6;
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		font-family: var(--font-monospace-code);
	}

	.article-content :global(pre) {
		background-color: #1e1e1e;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	.article-content :global(pre code) {
		background-color: transparent;
		padding: 0;
		color: inherit;
	}

	.article-content :global(a) {
		color: #3b82f6;
		text-decoration: underline;
		word-break: break-word;
		overflow-wrap: break-word;
	}

	.article-content :global(a:hover) {
		color: #2563eb;
	}

	.article-content :global(blockquote) {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		margin: 1rem 0;
		font-style: italic;
		color: #6b7280;
	}

	.article-content :global(img) {
		max-width: 100%;
		height: auto;
		margin: 1rem 0;
		border-radius: 0.5rem;
	}

	.article-content :global(hr) {
		margin: 2rem 0;
		border: none;
		border-top: 1px solid #e5e7eb;
	}
</style>
