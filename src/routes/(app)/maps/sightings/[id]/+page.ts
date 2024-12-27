import type { PageLoad } from './$types.js';

export const load: PageLoad = async ({ params }) => {
    const { id } = params;
    const sighting = await fetchSightingDetails(id)

    return { sighting };
}

const fetchSightingDetails = async (sightingID: string): Promise<SightingDetails> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sightings/${sightingID}`);
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