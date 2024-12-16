<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import '../app.css';
	let { children } = $props();
	// possible nav/logo
</script>

<Map/>
{@render children()}
