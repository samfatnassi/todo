"use client"

import { useState } from "react"
import { LocalAuth } from "@/components/local-auth"
import { LocalTodoList } from "@/components/local-todo-list"
import { StorageInfo } from "@/components/storage-info"
import type { User } from "@/lib/local-storage"

export function LocalApp() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 dark:text-green-400 font-medium">Secure & Private</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">Your data stays on your device</span>
          </div>
        </div>
      </div>

      <main className="container max-w-5xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-1">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Todo</h1>
          </div>
          <LocalAuth onUserChange={setUser} />
        </div>

        {/* Main Content */}
        {!user ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="max-w-lg mx-auto text-center">
              {/* Hero Animation */}
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gray-900 dark:bg-gray-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <svg
                    className="w-12 h-12 text-white dark:text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to your personal task manager
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                Simple, fast, and completely private. Sign in to start organizing your tasks with confidence.
              </p>

              {/* Quick Features */}
              <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg
                      className="w-4 h-4 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">Private</h3>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">Fast</h3>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg
                      className="w-4 h-4 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">Simple</h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Welcome Message with Animation */}
            <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 transform hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">👋</span>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome back, {user.name}!</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Ready to tackle your tasks? Let's get things done.</p>
            </div>

            {/* Todo List */}
            <LocalTodoList user={user} />

            {/* Storage Info */}
            <StorageInfo />
          </div>
        )}
      </main>
    </div>
  )
}
