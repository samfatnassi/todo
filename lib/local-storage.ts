import type { Todo } from "./types"
import { DEMO_TODOS } from "./constants"

const TODOS_STORAGE_KEY = "todos-app-data"
const USER_STORAGE_KEY = "todos-app-user"

export interface User {
  id: string
  name: string
  email: string
}

// User management functions
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const userData = localStorage.getItem(USER_STORAGE_KEY)
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error("Error getting user from localStorage:", error)
    return null
  }
}

export function saveUser(user: User): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } catch (error) {
    console.error("Error saving user to localStorage:", error)
  }
}

export function removeUser(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(USER_STORAGE_KEY)
  } catch (error) {
    console.error("Error removing user from localStorage:", error)
  }
}

// Todo management functions
export function getTodos(userId?: string): Todo[] {
  if (typeof window === "undefined") {
    return [...DEMO_TODOS]
  }

  // If no user, return demo todos
  if (!userId) {
    return [...DEMO_TODOS]
  }

  try {
    const allData = localStorage.getItem(TODOS_STORAGE_KEY)
    const userData = allData ? JSON.parse(allData) : {}

    // Get user-specific todos or return empty array
    const userTodos = userData[userId] || []
    return userTodos.sort((a: Todo, b: Todo) => b.createdAt - a.createdAt)
  } catch (error) {
    console.error("Error getting todos from localStorage:", error)
    return []
  }
}

export function saveTodos(todos: Todo[], userId?: string): void {
  if (typeof window === "undefined") return

  // If no user, don't save
  if (!userId) {
    console.log("No user ID provided, changes won't persist")
    return
  }

  try {
    // Get existing data
    const allData = localStorage.getItem(TODOS_STORAGE_KEY)
    const userData = allData ? JSON.parse(allData) : {}

    // Update user-specific todos
    userData[userId] = todos

    // Save back to localStorage
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(userData))
  } catch (error) {
    console.error("Error saving todos to localStorage:", error)
  }
}

// Clear all data (for testing/reset purposes)
export function clearAllData(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(TODOS_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing localStorage:", error)
  }
}
