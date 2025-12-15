<script lang="ts">
	import { formatDate } from '$lib/utils';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import { toast } from 'svelte-sonner';
	import { Share } from 'lucide-svelte';

	let { data } = $props();

	async function shareArticle() {
		const shareText = `Read '${data.meta.title}' by Henry Ihenacho.\n\nLink: ${data.url}`;
		const shareData = {
			title: data.meta.title,
			text: shareText,
			url: data.url
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch (err) {
				// User cancelled or share failed, fallback to clipboard
				await copyToClipboard();
			}
		} else {
			await copyToClipboard();
		}
	}

	async function copyToClipboard() {
		const shareText = `Read '${data.meta.title}' by Henry Ihenacho.\nLink: ${data.url}`;
		try {
			await navigator.clipboard.writeText(shareText);
			toast('Link copied to clipboard!');
		} catch {
			// Fallback for older browsers
			const textArea = document.createElement('textarea');
			textArea.value = shareText;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			toast('Link copied to clipboard!');
		}
	}
</script>

<svelte:head>
	<meta property="article:published_time" content={data.meta.date} />
	{#each data.meta.categories as category (category)}
		<meta property="article:tag" content={category} />
	{/each}
</svelte:head>

<div class="mx-auto flex w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8">
	<article class="mx-auto flex w-full max-w-prose flex-col gap-4">
		<div class="flex flex-col gap-1">
			<h1 class="text-2xl font-bold break-words">{data.meta.title}</h1>
			{#if data.meta.description}
				<p class="text-gray-600">{data.meta.description}</p>
			{/if}
			<p class="text-sm text-gray-500">{formatDate(data.meta.date)}</p>
			{#if data.meta.categories.length > 0}
				<div class="mt-2 flex flex-wrap gap-2">
					{#each data.meta.categories as category (category)}
						<span class="text-xs text-gray-600">#{category}</span>
					{/each}
				</div>
			{/if}

			<hr class="my-4 border-gray-200" />

			<button
				onclick={shareArticle}
				class="flex w-fit items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
			>
				<Share class="size-4" />
				Share
			</button>

			<hr class="my-4 border-gray-200" />
		</div>

		<div class="article-content">
			<data.content />
		</div>
	</article>

	<aside class="hidden w-64 lg:block">
		<TableOfContents />
	</aside>
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
		white-space: pre-wrap;
	}

	.article-content :global(a) {
		color: #3b82f6;
		text-decoration: underline;
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

	.article-content :global(table) {
		display: block;
		width: 100%;
		overflow-x: auto;
		margin-bottom: 1rem;
	}

	/* Global overflow prevention for mobile */
	.article-content :global(*) {
		max-width: 100%;
		overflow-wrap: break-word;
	}
</style>
