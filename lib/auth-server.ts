import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"

export async function auth() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("next-auth.session-token") || cookieStore.get("__Secure-next-auth.session-token")

    if (!token?.value) {
      return null
    }

    const decoded = await decode({
      token: token.value,
      secret: process.env.NEXTAUTH_SECRET || "fallback-secret",
    })

    if (!decoded) {
      return null
    }

    return {
      user: {
        id: decoded.sub || "",
        name: decoded.name || "",
        email: decoded.email || "",
        image: decoded.picture || "",
      },
    }
  } catch (error) {
    console.error("Auth error:", error)
    return null
  }
}
