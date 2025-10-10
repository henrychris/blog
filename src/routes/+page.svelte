<script lang="ts">
	import * as config from '$lib/config';
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<article class="flex flex-col gap-4">
	<div>
		<h1 class="text-2xl font-bold">Henry Ihenacho</h1>
		<p class="text-sm italic">Product Engineer</p>
	</div>

	<div class="flex flex-col gap-2 text-base">
		<p>
			I'm a product engineer. I love all things technology, literature, videogames, animanga and
			movies. Oh. Sports too - football and F1.
		</p>
		<p>
			I'm currently figuring out my niche within the world of technology. Some choose databases,
			others go with compilers - I have none, at the time of writing.
		</p>
		<p>
			You'll find the odd technical article here, some yapping about movies, a lot of music
			recommendations and some old fiction I wrote back in 2022 (and earlier).
		</p>
	</div>

	<!-- socials -->
	<ul class="flex gap-2 text-sm text-blue-500 underline">
		<li>
			<a href="https://x.com/hiddenhenry" target="_blank">Twitter</a>
		</li>
		<li>
			<a href="https://github.com/henrychris" target="_blank">GitHub</a>
		</li>
		<li>
			<a href="https://www.linkedin.com/in/henry-ihenacho" target="_blank">LinkedIn</a>
		</li>
		<li>
			<a href="mailto:henrychris2003@gmail.com" target="_blank">Email</a>
		</li>
	</ul>
</article>
