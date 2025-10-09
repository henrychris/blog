<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { IMAGES } from '$lib/constants/images';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={IMAGES.ME} />
</svelte:head>

<div class="flex h-full flex-col gap-7 p-7">
	<Header />

	<main class="flex-grow">
		<PageTransition url={data.url}>
			{@render children?.()}
		</PageTransition>
	</main>

	<Footer />
</div>
