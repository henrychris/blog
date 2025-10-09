<script lang="ts">
	type MediaItem = {
		title: string;
		creator?: string; // author, artist, director, etc.
		year?: string;
		notes?: string;
		link?: string;
	};

	type MediaCategory = 'books' | 'music' | 'anime' | 'movies' | 'shows';

	let activeTab = $state<MediaCategory>('books');

	const mediaData: Record<MediaCategory, MediaItem[]> = {
		books: [
			{
				title: 'Purple Hibiscus',
				creator: 'Chimamanda Ngozi Adichie',
				year: '2003',
				notes:
					'Released the year I was born. I used to read this every year until I lended out my copy and never got it back.',
				link: 'https://www.goodreads.com/book/show/14569052-purple-hibiscus'
			}
		],
		music: [
			{
				title: 'Chrome Bull',
				creator: 'Duckwrth',
				year: '2022',
				notes:
					"I like music I can sing (and dance, even though I suck) along to. This album does that and helps me lock in too. It's also endlessly replayable.",
				link: 'https://open.spotify.com/album/3IJE33ruLyvq3yCiJubw4g?si=VGJpRwxhRBuF31vrJ0FrJg'
			}
		],
		anime: [
			{
				title: 'Attack On Titan',
				creator: 'WIT & MAPPA',
				year: '2013-2023',
				notes: "I don't need to explain why this is here. Just watch it if you haven't already.",
				link: 'https://www.imdb.com/title/tt2560140/'
			}
		],
		movies: [
			{
				title: 'Scott Pilgrim vs. the World',
				creator: 'Edgar Wright',
				year: '2010',
				notes:
					'I strongly believe Micheal Cera was not the best choice to play Scott, but it is a great (and fun!) movie from my favourite director. It is also endlessly rewatchable.',
				link: 'https://www.imdb.com/title/tt0446029/'
			}
		],
		shows: [
			{
				title: 'Bojack Horseman',
				creator: 'Raphael Bob-Waksberg',
				year: '2014-2020',
				notes:
					'I like to rewatch the last conversation between Bojack and Diane, because it reminds me of a relationship that ended in a similar manner.',
				link: 'https://www.imdb.com/title/tt3398228/'
			}
		]
	};

	const tabs: { key: MediaCategory; label: string }[] = [
		{ key: 'books', label: 'Books' },
		{ key: 'music', label: 'Music' },
		{ key: 'anime', label: 'Anime' },
		{ key: 'movies', label: 'Movies' },
		{ key: 'shows', label: 'Shows' }
	];
</script>

<svelte:head>
	<title>Media</title>
</svelte:head>

<section class="flex flex-col gap-4">
	<h1 class="text-2xl font-bold">Media</h1>

	<!-- Tabs -->
	<nav class="flex gap-4 border-b pb-2">
		{#each tabs as tab (tab.key)}
			<button
				onclick={() => (activeTab = tab.key)}
				class="text-sm {activeTab === tab.key
					? 'font-semibold underline'
					: 'text-gray-600 hover:text-gray-900'}"
			>
				{tab.label}
			</button>
		{/each}
	</nav>

	<!-- Content -->
	<ul class="flex flex-col gap-1">
		{#each mediaData[activeTab] as item (item.title)}
			<li class="flex flex-col gap-0 py-2 hover:bg-gray-50">
				<div class="flex items-baseline justify-between gap-4">
					<div class="flex items-baseline gap-2">
						{#if item.link}
							<a
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								class="font-medium text-blue-500 hover:underline"
							>
								{item.title}
							</a>
						{:else}
							<h2 class="font-medium">{item.title}</h2>
						{/if}
					</div>
					{#if item.year}
						<span class="shrink-0 text-xs text-gray-500">{item.year}</span>
					{/if}
				</div>
				{#if item.creator}
					<p class="text-sm text-gray-600">{item.creator}</p>
				{/if}
				{#if item.notes}
					<p class="text-xs text-gray-500 italic">{item.notes}</p>
				{/if}
			</li>
		{/each}
	</ul>
</section>
