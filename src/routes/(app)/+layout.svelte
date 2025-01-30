<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Map from '$lib/components/Map.svelte';
	let { children } = $props();
</script>

<Header/>
<Map />
{@render children()}
