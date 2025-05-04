import { fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const refreshToken = cookies.get("refreshToken")
    if (!refreshToken) {
        return fail(400, { refreshToken, missing: true });
    }
    
    const body: LogoutRequest = {
        refresh: refreshToken,
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
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

    // clear access and refresh tokens
    cookies.delete('accessToken', { path: '/' });
    cookies.delete('refreshToken', { path: '/' });

    throw redirect(303, "/")
}