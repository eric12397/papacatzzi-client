<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import Marker from './Marker.svelte';

	let map: L.Map;
	let coords: PostCoordinates[]
	let initialView: L.LatLngExpression;

	onMount(async () => {
		try {
			const currPos = await getCurrentPosition()
			initialView = [currPos.coords.latitude, currPos.coords.longitude]
		} catch (e) {
			console.error(e)
		}

		// Initialize the map
		map = L.map('map').setView(initialView, 20);

		// Add a tile layer (OpenStreetMap - free)
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
			'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		const bounds = map.getBounds()
		coords = await fetchCoordinates(bounds)
	});
		

	// Clean up map instance when component is destroyed
	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});

    const getCurrentPosition = () => {
		return new Promise<GeolocationPosition>((resolve, reject) =>
			navigator.geolocation.getCurrentPosition(resolve, reject)
		);
	}

	const fetchCoordinates = async (bounds: L.LatLngBounds): Promise<PostCoordinates[]> => {
		const northEast = bounds.getNorthEast()
		const southWest = bounds.getSouthWest()

		const url = new URL('http://localhost:8080/posts/coordinates');
		url.searchParams.set('minLat', southWest.lat.toString());
		url.searchParams.set('minLng', southWest.lng.toString());
		url.searchParams.set('maxLat', northEast.lat.toString());
		url.searchParams.set('maxLng', northEast.lng.toString());

		try {
			const response = await fetch(url.toString());
			if (!response.ok) {
				throw new Error(`Failed to fetch posts: ${response.statusText}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching posts:', error);
			throw error;
		}
	}

</script>

<style>
#map {
    height: 100vh; /* Ensure the map fills the container */
    width: 100% 
}
</style>

<div id="map" style="">
	{#each coords as c (c.PostID)}
    	<Marker {map} coords={c} />
  	{/each}
</div>
  