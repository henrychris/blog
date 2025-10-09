<script lang="ts">
	import * as config from '$lib/config';
</script>

<nav class="flex justify-between">
	<a href="/">
		<b>{config.title} </b>
	</a>

	<ul class="flex gap-7">
		<li class="hover:underline">
			<a href="/about">About</a>
		</li>
		<li class="hover:underline">
			<a href="/contact">Contact</a>
		</li>
		<li class="hover:underline">
			<a href="/resume">Resume</a>
		</li>
	</ul>
</nav>
