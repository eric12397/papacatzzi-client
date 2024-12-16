<script lang="ts">
    import { onMount } from "svelte";
    import L from 'leaflet';
	import { goto } from "$app/navigation";

    let { map, coords }: { map: L.Map, coords: SightingCoordinates } = $props()
    let marker: L.Marker;

    onMount(() => {
        marker = L.marker([coords.Latitude, coords.Longitude])
        marker.addTo(map)
        
        marker.on('click', async () => {
            goto(`maps/sightings/${coords.ID}`)
        });

        return () => {
            if (marker) {
                map.removeLayer(marker);
            }
        }
    })
</script>

    