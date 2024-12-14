<script lang="ts">
	import { onMount } from "svelte";
    import L from 'leaflet';

    let { map, coords }: { map: L.Map, coords: SightingCoordinates } = $props()
    let marker: L.Marker;

    onMount(() => {
        marker = L.marker([coords.Latitude, coords.Longitude])
        marker.addTo(map)
            .bindPopup('Cat spotted!')
            .openPopup();

        marker.on('click', async () => {
            const sighting = await fetchSightingDetails(coords.ID)
            console.log(sighting)
        });

        return () => {
            if (marker) {
                map.removeLayer(marker);
            }
        }
    })

    const fetchSightingDetails = async (sightingID: number): Promise<SightingDetails> => {
        try {
            const response = await fetch(`http://localhost:8080/sightings/${sightingID}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch sighting details: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching sighting details:', error);
            throw error;
        }
    }
</script>

    