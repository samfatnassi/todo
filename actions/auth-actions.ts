"use server"

import { signInUser, signOutUser } from "@/lib/simple-auth"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    throw new Error("Name and email are required")
  }

  await signInUser(name, email)
  redirect("/")
}

export async function signOut() {
  await signOutUser()
  redirect("/")
}
