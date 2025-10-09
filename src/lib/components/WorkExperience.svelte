<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		company: string;
		role: string;
		period: string;
		location: string;
		children: Snippet;
	}

	let { company, role, period, location, children }: Props = $props();
</script>

<div>
	<div>
		<h3 class="m-0 text-lg font-semibold">{company}</h3>
		<div class="mt-1 flex gap-2 text-sm text-gray-600">
			<span class="italic">{role}</span>
			<span class="text-gray-300">|</span>
			<span>{period}</span>
			<span class="text-gray-300">|</span>
			<span>{location}</span>
		</div>
	</div>
	<div class="work-content text-[0.9375rem] leading-relaxed">
		{@render children?.()}
	</div>
</div>

<style>
	.work-content :global(ul) {
		margin: 0;
		padding-left: 1.5rem;
		list-style: disc;
	}

	.work-content :global(li) {
		margin-bottom: 0.25rem;
	}
</style>
