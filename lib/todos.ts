import { Redis } from "@upstash/redis"
import type { Todo } from "./types"
import { DEMO_TODOS } from "./constants"

// Create Redis client using Vercel KV environment variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
})

// Helper function to check if we're in demo mode
function isInDemoMode(): boolean {
  return !(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

// Generate user-specific key for todos
function getUserTodosKey(userId: string): string {
  return `todos:${userId}`
}

export async function getTodos(userId?: string): Promise<Todo[]> {
  // If no userId provided (not authenticated), return demo todos
  if (!userId) {
    return [...DEMO_TODOS]
  }

  // If we're in demo mode, return demo todos
  if (isInDemoMode()) {
    return [...DEMO_TODOS]
  }

  try {
    // Get user-specific todos from Upstash Redis
    const userTodosKey = getUserTodosKey(userId)
    const todos = await redis.get<Todo[]>(userTodosKey)

    // If we get a response (even empty array), return it sorted
    if (todos !== null && todos !== undefined) {
      return todos.sort((a, b) => b.createdAt - a.createdAt)
    }

    // If we get null/undefined (first time use), return an empty array
    return []
  } catch (error) {
    console.error("Failed to fetch todos:", error)
    // Return an empty array on error
    return []
  }
}

export async function saveTodos(todos: Todo[], userId?: string): Promise<void> {
  // If no userId provided (not authenticated), don't save
  if (!userId) {
    console.log("No user ID provided, changes won't persist")
    return
  }

  // If we're in demo mode, don't try to save to Redis
  if (isInDemoMode()) {
    console.log("Running in demo mode, changes won't persist")
    return
  }

  try {
    const userTodosKey = getUserTodosKey(userId)
    await redis.set(userTodosKey, todos)
  } catch (error) {
    console.error("Failed to save todos:", error)
    throw new Error("Failed to save todos")
  }
}

// Function to get all users (for admin purposes)
export async function getAllUserTodos(): Promise<Record<string, Todo[]>> {
  if (isInDemoMode()) {
    return {}
  }

  try {
    // Get all keys that match the pattern "todos:*"
    const keys = await redis.keys("todos:*")
    const allUserTodos: Record<string, Todo[]> = {}

    for (const key of keys) {
      const userId = key.replace("todos:", "")
      const todos = await redis.get<Todo[]>(key)
      if (todos) {
        allUserTodos[userId] = todos
      }
    }

    return allUserTodos
  } catch (error) {
    console.error("Failed to fetch all user todos:", error)
    return {}
  }
}
