<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		url: string;
	}

	const { url }: Props = $props();

	let container: HTMLDivElement | null = null;
	let loadPromise: Promise<any> | null = null;

	function loadTwitterWidgets(): Promise<any> {
		// If already loading or loaded, return the same promise
		if (loadPromise) {
			return loadPromise;
		}

		loadPromise = new Promise((resolve, reject) => {
			const w = window as any;

			// Already loaded
			if (w.twttr?.widgets) {
				return resolve(w.twttr);
			}

			// Check if script tag already exists
			const existing = document.querySelector(
				'script[src="https://platform.twitter.com/widgets.js"]'
			);

			if (existing) {
				existing.addEventListener('load', () => resolve(w.twttr));
				existing.addEventListener('error', reject);
				return;
			}

			// Create and load the script
			const script = document.createElement('script');
			script.src = 'https://platform.twitter.com/widgets.js';
			script.async = true;
			script.onload = () => resolve(w.twttr);
			script.onerror = () => reject(new Error('Failed to load Twitter widgets'));
			document.head.appendChild(script);
		});

		return loadPromise;
	}

	onMount(async () => {
		try {
			// Load the Twitter widgets script if not already loaded
			const twttr = await loadTwitterWidgets();
			// Parse the tweet in this container
			twttr?.widgets?.load(container ?? undefined);
		} catch (e) {
			console.warn('Failed to load Twitter widgets', e);
		}
	});
</script>

<div bind:this={container}>
	<blockquote class="twitter-tweet"><a href={url} title="Tweet"></a></blockquote>
</div>
