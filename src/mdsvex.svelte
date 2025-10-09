<script lang="ts" module>
	// https://mdsvex.pngwn.io/docs#custom-components
	import { img } from '$lib/components/custom'
	export { img }
</script>

<script lang="ts">
	let props = $props()
</script>

{@render props.children?.()}