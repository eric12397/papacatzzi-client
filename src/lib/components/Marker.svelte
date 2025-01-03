<script lang="ts">
    import { onMount } from "svelte";
    import L from 'leaflet';
	import { goto } from "$app/navigation";

    let { map, coords }: { map: L.Map, coords: SightingCoordinates } = $props()
    let marker: L.Marker;

    onMount(() => {
        const icon = L.icon({
            iconUrl: '/images/cat-marker.png',
            iconSize: [60, 60], // Adjust size of the icon (width, height)
        });

        marker = L.marker([coords.latitude, coords.longitude], { icon })
        marker.addTo(map)
        
        marker.on('click', async () => {
            goto(`/maps/sightings/${coords.id}`)
        });

        return () => {
            if (marker) {
                map.removeLayer(marker);
            }
        }
    })
</script>

    