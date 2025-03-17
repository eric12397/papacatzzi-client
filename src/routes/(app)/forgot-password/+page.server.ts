import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
		const email = formData.get('email') as string

        // TODO: add validation
		// if (!email) {
		// 	return fail(400, { email, missing: true });
		// }
		
		const body: ForgotPasswordRequest = {email}
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/forgot-password`, {
			method: "POST",
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

        return {
			success: true, email
		}
    }
}