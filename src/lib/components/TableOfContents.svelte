<script lang="ts">
	import { onMount } from 'svelte';

	interface Heading {
		id: string;
		text: string;
		level: number;
	}

	let headings = $state<Heading[]>([]);
	let activeId = $state<string>('');

	onMount(() => {
		// Extract all h2 and h3 headings from the article
		const articleContent = document.querySelector('.article-content');
		if (!articleContent) {
			return;
		}

		const headingElements = articleContent.querySelectorAll('h2, h3');
		headings = Array.from(headingElements).map((heading) => ({
			id: heading.id,
			text: heading.textContent || '',
			level: parseInt(heading.tagName.substring(1))
		}));

		// Use a scroll-based detector instead of IntersectionObserver.
		// IntersectionObserver can sometimes report entries in an order
		// that causes the active heading to appear "stuck" until the
		// user nudges the scroll. The scroll-based approach reads the
		// headings' boundingClientRect and picks the last heading whose
		// top is <= offset (i.e. the heading currently at or above the
		// visual offset). We update on scroll/resize using requestAnimationFrame
		// to avoid doing expensive layout work on every event.

		const headingsArray = Array.from(headingElements) as HTMLElement[];
		let ticking = false;

		function updateActive() {
			const offset = window.innerHeight * 0.2; // match previous rootMargin intent
			let currentId = headingsArray[0]?.id || '';
			for (const h of headingsArray) {
				const top = h.getBoundingClientRect().top;
				if (top - offset <= 0) {
					currentId = h.id;
				} else {
					// since headings are in document order, once one is below the offset
					// we can stop checking further
					break;
				}
			}

			// If scrolled to (or very near) the bottom, highlight the last heading.
			const nearBottomThreshold = 24; // px
			const scrolledToBottom =
				window.innerHeight + window.pageYOffset >=
				document.documentElement.scrollHeight - nearBottomThreshold;
			if (scrolledToBottom && headingsArray.length) {
				currentId = headingsArray[headingsArray.length - 1].id;
			}

			activeId = currentId;
		}

		function onScroll() {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(() => {
					updateActive();
					ticking = false;
				});
			}
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);

		// initial check
		updateActive();

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

{#if headings.length > 0}
	<nav
		class="sticky top-8 flex max-h-[calc(100vh-4rem)] flex-col gap-3 overflow-y-auto border-l-2 border-gray-200 pl-4"
		aria-label="Table of contents"
	>
		<h2 class="text-sm font-bold tracking-wide text-gray-600 uppercase">On this page</h2>
		<ul class="flex flex-col gap-2">
			{#each headings as heading (heading.id)}
				<li class:pl-4={heading.level === 3}>
					<button
						onclick={() => scrollToHeading(heading.id)}
						class="block w-full cursor-pointer py-1 text-left text-sm transition-colors duration-200
							{activeId === heading.id ? 'font-semibold text-blue-500' : 'text-gray-600 hover:text-gray-900'}"
					>
						{heading.text}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	/* Custom scrollbar styling for the TOC */
	nav::-webkit-scrollbar {
		width: 4px;
	}

	nav::-webkit-scrollbar-track {
		background: transparent;
	}

	nav::-webkit-scrollbar-thumb {
		background: #d1d5db;
		border-radius: 2px;
	}

	nav::-webkit-scrollbar-thumb:hover {
		background: #9ca3af;
	}
</style>
