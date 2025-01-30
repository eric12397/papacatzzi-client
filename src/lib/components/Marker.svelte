<script lang="ts">
    import { onMount, onDestroy } from "svelte";
	import { goto } from "$app/navigation";

    let { map, coords }: { map: L.Map, coords: SightingCoordinates } = $props()
    let marker: L.Marker;

    onMount(async () => {
        const L = await import("leaflet")
        const icon = L.icon({
            iconUrl: '/images/cat-marker.png',
            iconSize: [60, 60], // Adjust size of the icon (width, height)
        });

        marker = L.marker([coords.latitude, coords.longitude], { icon })
        marker.addTo(map)
        
        marker.on('click', async () => {
            goto(`/sightings/${coords.id}`)
        });
    })

    onDestroy(() => {
		if (marker) {
            map.removeLayer(marker);
        }
	});
</script>

    