"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, LogOut, UserIcon } from "lucide-react"
import { signIn, signOut } from "@/actions/auth-actions"

interface SimpleAuthButtonProps {
  user: { id: string; name: string; email: string } | null
}

export function SimpleAuthButton({ user }: SimpleAuthButtonProps) {
  const [showSignIn, setShowSignIn] = useState(false)

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="h-4 w-4" />
          <span>{user.name}</span>
        </div>
        <form action={signOut}>
          <Button variant="outline" size="sm" type="submit">
            <LogOut className="h-4 w-4 mr-2" />
            تسجيل خروج
          </Button>
        </form>
      </div>
    )
  }

  if (showSignIn) {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-center">تسجيل دخول</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="space-y-4">
            <Input name="name" placeholder="الاسم" required />
            <Input name="email" type="email" placeholder="البريد الإلكتروني" required />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                دخول
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowSignIn(false)}>
                إلغاء
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Button variant="default" size="sm" onClick={() => setShowSignIn(true)}>
      <LogIn className="h-4 w-4 mr-2" />
      تسجيل دخول
    </Button>
  )
}
