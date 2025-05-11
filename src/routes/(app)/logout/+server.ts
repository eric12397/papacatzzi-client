import { redirect, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ cookies, fetch }) => {
    const refreshToken = cookies.get("refreshToken") ?? ""
   
    const body: LogoutRequest = {
        refresh: refreshToken,
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        method: "POST",
        body:  JSON.stringify(body),
    });

    if (!response.ok) {
        return new Response(null, { status: response.status })
    }

    // clear access and refresh tokens
    cookies.delete('accessToken', { path: '/' });
    cookies.delete('refreshToken', { path: '/' });

    throw redirect(303, "/")
}