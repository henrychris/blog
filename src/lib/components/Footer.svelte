<script lang="ts">
	import { onMount } from 'svelte';

	const quotes = ["Despite everything, it's still you."];
	const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

	let now = $state(new Date());
	let time = $derived(
		now.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
			timeZone: 'Africa/Lagos'
		})
	);
	let year = $derived(now.getFullYear());

	onMount(() => {
		const interval = setInterval(() => {
			now = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<footer class="border-t">
	<div class="mt-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
		<div class="w-full max-w-md">
			<p class="text-gray-600 italic">"{randomQuote}"</p>
		</div>

		<div
			class="flex w-full flex-col gap-0 text-right sm:w-auto sm:flex-row sm:items-center sm:gap-2"
		>
			<span>{time}</span>
			<span class="mx-1 hidden text-gray-400 sm:inline">|</span>
			<span>Lagos, NG</span>
			<span class="mx-1 hidden text-gray-400 sm:inline">|</span>
			<span>{year}</span>
		</div>
	</div>
</footer>
