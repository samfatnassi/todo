"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, X, Mail, User } from "lucide-react"
import { getCurrentUser, saveUser, removeUser, type User as UserType } from "@/lib/local-storage"
import { UserMenu } from "@/components/user-menu"
import { v4 as uuidv4 } from "uuid"

interface LocalAuthProps {
  onUserChange: (user: UserType | null) => void
}

export function LocalAuth({ onUserChange }: LocalAuthProps) {
  const [user, setUser] = useState<UserType | null>(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    onUserChange(currentUser)
    setIsLoading(false)
  }, [onUserChange])

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSigningIn(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    if (!name || !email) {
      setIsSigningIn(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 800))

    const newUser: UserType = {
      id: uuidv4(),
      name,
      email,
    }

    saveUser(newUser)
    setUser(newUser)
    onUserChange(newUser)
    setShowSignIn(false)
    setIsSigningIn(false)
  }

  const handleSignOut = () => {
    removeUser()
    setUser(null)
    onUserChange(null)
    setShowSignIn(false)
  }

  const handleCancelSignIn = () => {
    setShowSignIn(false)
    setIsSigningIn(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        Loading...
      </div>
    )
  }

  if (user) {
    return <UserMenu user={user} onSignOut={handleSignOut} />
  }

  if (showSignIn) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white dark:bg-gray-800">
          <CardHeader className="pb-4 text-center">
            <div className="flex items-center justify-between mb-4">
              <div className="w-6"></div>
              <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center">
                <LogIn className="h-6 w-6 text-white dark:text-gray-900" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancelSignIn}
                className="w-6 h-6 hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={isSigningIn}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Sign in to access your personal workspace</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  disabled={isSigningIn}
                  className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  disabled={isSigningIn}
                  className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-gray-300"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-11 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium"
                  disabled={isSigningIn}
                >
                  {isSigningIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-gray-900/30 dark:border-t-gray-900 rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                🔒 Your information is stored locally and never shared
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Button
      onClick={() => setShowSignIn(true)}
      className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium px-6 py-2"
    >
      <LogIn className="h-4 w-4 mr-2" />
      Sign In
    </Button>
  )
}
