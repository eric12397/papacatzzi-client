<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Map from '$lib/components/Map.svelte';
	let { children, data } = $props();
</script>

<Header user={data.user}/>
<Map />
{@render children()}
