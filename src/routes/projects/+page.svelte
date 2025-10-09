<script lang="ts">
	interface Project {
		title: string;
		description: string;
		image?: string;
		links?: { label: string; url: string }[];
	}

	const projects: Project[] = [
		{
			title: 'QSet',
			description:
				"My favourite project at the moment. It's used to resolve disputes when playing football.",
			image: '/project-image.jpg',
			links: [
				{ label: 'Live Demo', url: 'https://qset.qballxi.com' },
				{ label: 'Twitter', url: 'https://x.com/hiddenhenry/status/1894704565032714465' }
			]
		}
	];
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<section class="flex flex-col gap-4">
	<h1 class="text-2xl font-bold">Projects</h1>

	<ul class="flex flex-col gap-1">
		{#each projects as project (project.title)}
			<li class="flex flex-col gap-0 py-2 hover:bg-gray-50">
				<div class="flex items-baseline justify-between gap-4">
					<h2 class="font-medium">{project.title}</h2>
					{#if project.links && project.links.length > 0}
						<div class="flex shrink-0 gap-2 text-xs">
							{#each project.links as link (link.label)}
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-500 hover:underline"
								>
									{link.label}
								</a>
							{/each}
						</div>
					{/if}
				</div>
				<p class="text-sm text-gray-600">{project.description}</p>
			</li>
		{/each}
	</ul>
</section>
