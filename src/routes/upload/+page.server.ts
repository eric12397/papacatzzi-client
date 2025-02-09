import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData()
		const reporter = data.get('reporter') as string
		const animal = data.get('animal') as string
		const description = data.get('description') as string
		const photoURL = data.get('photoURL') as string
        const latitude = data.get('latitude') as string
        const longitude = data.get('longitude') as string
        const timestamp = data.get('timestamp') as string

		const lat = parseFloat(latitude)
		const lng = parseFloat(longitude)
		const created = new Date(timestamp)
		
		// TODO: add validation
		// if (!email) {
		// 	return fail(400, { email, missing: true });
		// }

		const body: CreateSighting = {
			reporter,
			animal,
			description,
			photoURL,
			latitude: lat,
			longitude: lng,
			timestamp: created
		}

		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sightings`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${cookies.get("accessToken")}`,
			},
			body:  JSON.stringify(body),
		});
		
		if (!response.ok) {
			const data = await response.json();
			return {
				status: response.status,
				success: false,
				data
			}
		}

		throw redirect(303, "/")
	},
}