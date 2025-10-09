<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { IMAGES } from '$lib/constants/images';
	import { page } from '$app/state';

	let { children, data } = $props();

	const TITLE = 'Henry Ihenacho';
	const SITE_URL = `${page.url.href}`;
</script>

<svelte:head>
	<link rel="icon" href={IMAGES.ME} />

	<link rel="icon" href={IMAGES.ME} />

	<!-- Open Graph  -->
	<meta property="og:title" content={TITLE} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={IMAGES.ME} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={SITE_URL} />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:image" content={IMAGES.ME} />

	<title>{TITLE}</title>
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
