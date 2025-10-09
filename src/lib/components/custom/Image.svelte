<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		title?: string;
	}

	let { src, alt, title }: Props = $props();
	let subtitle = title || alt;
</script>

<figure class="my-6">
	<img {src} {alt} {title} class="w-full rounded-lg" />
	{#if subtitle}
		<figcaption class="mt-2 truncate text-center text-sm text-gray-600 italic">
			{subtitle}
		</figcaption>
	{/if}
</figure>

<style>
	figure {
		margin-left: 0;
		margin-right: 0;
	}
</style>
