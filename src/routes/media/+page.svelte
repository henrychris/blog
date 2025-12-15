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
					'Released the year I was born. I used to read this every year until I lent out my copy and never got it back.',
				link: 'https://www.goodreads.com/book/show/14569052-purple-hibiscus'
			}
		],
		music: [
			{
				title: 'Chrome Bull DLX',
				creator: 'Duckwrth',
				year: '2022',
				notes:
					"I like music I can sing (and dance, even though I suck) along to. This album does that and helps me lock in too. It's also endlessly replayable.",
				link: 'https://open.spotify.com/album/5u8lkrEjY9W9yUevdcueWm?si=0TTatLSOSzmtHCE0NVep_A'
			},
			{
				title: 'Sometimes I Might Be Introvert',
				creator: 'Little Simz',
				year: '2021',
				notes: 'Simbi should be more popular than she currently is. This album is timeless.',
				link: 'https://open.spotify.com/album/0DBoWQ52XUHtrZQdfAqOVj?si=8EnVH1WqTe-c1T4amxY0Jg'
			},
			{
				title: 'If You Say',
				creator: 'Obongjayar',
				year: '2021',
				notes: 'One of the greatest songs of all time. Sarz and Obongjayar are phenomenal.',
				link: 'https://open.spotify.com/track/0Gti54i0mUfipe9LQDsbGC?si=7eede7f2086e448b'
			},
			{
				title: 'So Good',
				creator: 'Wurld',
				year: '2019',
				notes: 'This song is like butter - smooth, and fun to sing along to.',
				link: 'https://open.spotify.com/track/5YHbKDKSlMJ5QXdtXwAiP4?si=b3633f89d6a74621'
			},
			{
				title: 'I Go Nowhere',
				creator: 'Dwin The Stoic',
				year: '2024',
				notes:
					"The first song I heard from Dwin was Ifunanyam. I didn't see the need to explore his discography until someone I was talking to recommended this song. Some trivia: I once applied to Zikoko while he was still Chief Editor - I did not get in. I'm also not a writer anymore, so it's all good.",
				link: 'https://open.spotify.com/track/4e6F0OgG46Fh3mkLBrxoK6?si=fdbc53addc204529'
			},
			{
				title: 'Habit',
				creator: 'Still Woozy',
				year: '2019',
				notes: 'I consider this a love song.',
				link: 'https://open.spotify.com/track/4BsLwvaJOTOHDNg7xMpvrL?si=2db3d689051f4a4a'
			},
			{
				title: '100 Bad Days',
				creator: 'AJR',
				year: '2019',
				notes:
					"I live by the statement, 'A 100 bad days, make a 100 good stories'. It is why I don't take any misfortune seriously.",
				link: 'https://open.spotify.com/track/0WmH9fXWCQ51RQi1kWPJrI?si=4148f4d667b648fc'
			}
		],
		anime: [
			{
				title: 'Attack On Titan',
				creator: 'Hajime Isayama',
				year: '2013-2023',
				notes: "I don't need to explain why this is here. Just watch it if you haven't already.",
				link: 'https://www.imdb.com/title/tt2560140/'
			},
			{
				title: 'The Disastrous Life of Saiki K',
				creator: 'Shuichi Aso',
				year: '2010-2019',
				notes: 'God tier comedy anime. Nothing else compares to it.',
				link: 'https://www.imdb.com/title/tt6354518/'
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
			},
			{
				title: 'Sinners',
				creator: 'Ryan Coogler',
				year: '2025',
				notes:
					'I watched this 5 times (3 in theaters) and you should do the same. That scene had my mouth open for minutes. I also listened to the soundtrack more times than a reasonable person should.',
				link: 'https://www.imdb.com/title/tt31193180/'
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
