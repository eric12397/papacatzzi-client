<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getCurrentPosition } from '$lib/utils/currPos';
	import 'leaflet/dist/leaflet.css';
	import Marker from './Marker.svelte';

	let map: L.Map;
	let sightings: SightingCoordinates[]
	let initialView: L.LatLngExpression;

	onMount(async () => {
		const L = await import("leaflet")
		try {
			const currPos = await getCurrentPosition()
			initialView = [currPos.coords.latitude, currPos.coords.longitude]
		} catch (e) {
			// TODO: set some default location
			console.error(e)
		}

		// Initialize the map
		map = L.map('map', { zoomControl: false }).setView(initialView, 16);

		// Add a tile layer (OpenStreetMap - free)
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
			'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		const bounds = map.getBounds()
		sightings = await fetchSightings(bounds)
	});
		

	// Clean up map instance when component is destroyed
	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});

	const fetchSightings = async (bounds: L.LatLngBounds): Promise<SightingCoordinates[]> => {
		const northEast = bounds.getNorthEast()
		const southWest = bounds.getSouthWest()

		const url = new URL(`${import.meta.env.VITE_BASE_URL}/sightings`);
		url.searchParams.set('minLat', southWest.lat.toString());
		url.searchParams.set('minLng', southWest.lng.toString());
		url.searchParams.set('maxLat', northEast.lat.toString());
		url.searchParams.set('maxLng', northEast.lng.toString());

		try {
			const response = await fetch(url.toString());
			if (!response.ok) {
				throw new Error(`Failed to fetch sightings: ${response.statusText}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching sightings:', error);
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
	{#if map}
		{#each sightings as s (s.id)}
			<Marker {map} coords={s} />
		{/each}
	{/if}
</div>
  