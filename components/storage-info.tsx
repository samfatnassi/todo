"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, AlertTriangle, Database } from "lucide-react"
import { clearAllData } from "@/lib/local-storage"

export function StorageInfo() {
  const [storageSize, setStorageSize] = useState<string>("0 KB")
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const calculateStorageSize = () => {
      let total = 0
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length
        }
      }

      if (total < 1024) {
        setStorageSize(`${total} bytes`)
      } else if (total < 1024 * 1024) {
        setStorageSize(`${(total / 1024).toFixed(2)} KB`)
      } else {
        setStorageSize(`${(total / (1024 * 1024)).toFixed(2)} MB`)
      }
    }

    calculateStorageSize()
    const interval = setInterval(calculateStorageSize, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleClearData = () => {
    clearAllData()
    window.location.reload()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-white">
          <Database className="h-4 w-4" />
          Storage ({storageSize})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        {!showConfirm ? (
          <Button
            variant="outline"
            onClick={() => setShowConfirm(true)}
            className="w-full h-10 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Data
          </Button>
        ) : (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <h4 className="font-medium text-red-900 dark:text-red-100">Confirm Data Deletion</h4>
            </div>
            <p className="text-xs text-red-700 dark:text-red-300 mb-3">
              This will permanently delete all your tasks and user data.
            </p>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={handleClearData}
                className="flex-1 h-8 text-sm bg-red-600 hover:bg-red-700"
              >
                Delete All
              </Button>
              <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1 h-8 text-sm">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
