"use server"

import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

interface User {
  id: string
  name: string
  email: string
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get("simple-auth-user")

    if (!userCookie?.value) {
      return null
    }

    return JSON.parse(userCookie.value)
  } catch (error) {
    return null
  }
}

export async function signInUser(name: string, email: string): Promise<User> {
  const user: User = {
    id: uuidv4(),
    name,
    email,
  }

  const cookieStore = await cookies()
  cookieStore.set("simple-auth-user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return user
}

export async function signOutUser(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("simple-auth-user")
}
