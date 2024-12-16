<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	let { children } = $props();
</script>

<Map/>
{@render children()}
