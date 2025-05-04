import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData()
		const password = formData.get('password') as string
		const confirmPassword = formData.get('confirmPassword') as string

        // TODO: add validation
		// if (password !== confirmPassword) {
		// 	return fail(400, { email, missing: true });
		// }

		const token = event.url.searchParams.get("token")
		if (!token) {
			return fail(400, { token, missing: true });
		}
		
		const body: ResetPasswordRequest = {
			token: token,
			newPassword: password,
		}

		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reset-password`, {
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

        throw redirect(303, "/login")
    }
}