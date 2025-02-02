import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		// TODO: add validation
		// if (!email) {
		// 	return fail(400, { email, missing: true });
		// }
		
		const body: LoginRequest = {email, password}
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
			method: "POST",
			body:  JSON.stringify(body),
		});
		
		const data = await response.json();	
		if (!response.ok) {
			return {
				status: response.status,
				success: false,
				data
			}
		}

		cookies.set('accessToken', data.access, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			//expires: new Date(exp * 1000),
		});

		cookies.set('refreshToken', data.refresh, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			//expires: new Date(exp * 1000),
		});

		throw redirect(303, "/")
	},
}