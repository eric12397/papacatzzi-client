<script lang="ts">
	import { onMount } from "svelte";
    import L from 'leaflet';

    let { map, coords }: { map: L.Map, coords: PostCoordinates } = $props()
    let marker: L.Marker;

    onMount(() => {
        marker = L.marker([coords.Latitude, coords.Longitude])
        marker.addTo(map)
            .bindPopup('Cat spotted!')
            .openPopup();

        marker.on('click', async () => {
            const post = await fetchPostDetails(coords.PostID)
        });

        return () => {
            if (marker) {
                map.removeLayer(marker);
            }
        }
    })

    const fetchPostDetails = async (postID: number) => {
       
    }
</script>

    