<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { IMAGES } from '$lib/constants/images';
	import { siteUrl } from '$lib/config';
	import { page } from '$app/state';

	let { children, data } = $props();

	const DEFAULT_TITLE = 'Henry Ihenacho';
	const DEFAULT_DESCRIPTION =
		'Software Engineer & Writer. Exploring code, technology, and everything all at once.';

	// Use page-specific metadata if available, otherwise use defaults
	const pageTitle = $derived(page.data.meta?.title || DEFAULT_TITLE);
	const pageDescription = $derived(page.data.meta?.description || DEFAULT_DESCRIPTION);
	const pageUrl = $derived(page.data.meta?.url || siteUrl);
	const pageImage = $derived(page.data.meta?.image || IMAGES.ME);
</script>

<svelte:head>
	<link rel="icon" href={IMAGES.ME} />

	<!-- Basic Meta Tags -->
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={pageUrl} />

	<!-- Open Graph  -->
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={pageImage} />
	<meta property="og:image:alt" content="Henry Ihenacho profile picture" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={pageUrl} />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={pageImage} />
	<meta name="twitter:image:alt" content="Henry Ihenacho's profile picture" />

	<title>{pageTitle}</title>
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
