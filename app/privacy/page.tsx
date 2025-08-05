"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-3xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Todo
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Your Privacy Matters</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Todo is designed with privacy at its core. Your personal information and tasks are stored locally in
                your browser and never transmitted to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Local Storage Only</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                All your data is stored using your browser's localStorage technology:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Your tasks never leave your device</li>
                <li>We have no access to your data</li>
                <li>Works completely offline</li>
                <li>No data transmission to external servers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">No Data Collection</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We don't collect, store, or process any personal information. When you sign in, your name and email are
                stored only in your browser's local storage and never sent to us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Your Data, Your Control</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                You have complete control over your data. You can delete all your information at any time using the
                "Clear All Data" button, or by clearing your browser's storage.
              </p>
            </section>

            <section className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Our Promise</h2>
              <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed">
                We're committed to keeping your data private and secure. Your information belongs to you and stays with
                you.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
