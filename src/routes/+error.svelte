<script>
	import { page } from '$app/state';
</script>

<div class="grid h-full place-content-center">
	<h1>{page.status}: {page.error?.message}</h1>
</div>
