import { redirect, type Handle, type RequestEvent } from "@sveltejs/kit"
import jwt from "jsonwebtoken"

const SECRET = import.meta.env.JWT_SECRET

export const handle: Handle = async ({ event, resolve }) => {

    if (event.url.pathname.startsWith("/upload")) {
        event.locals.user = await authenticateUser(event)
        if (!event.locals.user) {
            throw redirect(303, "/login")
        }
    }
    
    const response = await resolve(event)
    return response
}

const authenticateUser = async (event: RequestEvent): Promise<User | null> =>  {
    try {    
        const accessToken = event.cookies.get("accessToken") ?? ""
        const user = jwt.verify(accessToken, SECRET) as User
        return {
            id: user.id,
            email: user.email
        }
    } catch (e) {
        console.error(e)

        const refreshToken = event.cookies.get("refreshToken")
        if (!refreshToken) {
            return null
        }

        const body = {refresh: refreshToken}
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/refresh/token`, {
            method: 'POST',
            body:  JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            event.cookies.delete('accessToken', { path: '/' });
            event.cookies.delete('refreshToken', { path: '/' });
            return null
        }
        
        event.cookies.set('accessToken', data.access, {
            httpOnly: true,     
            path: '/',
            secure: true,
            sameSite: 'strict',
            //expires: new Date(exp * 1000),
        });

        const user = jwt.decode(data.access) as User
        return {
            id: user.id,
            email: user.email
        }
    }
}