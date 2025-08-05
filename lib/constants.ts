import type { Todo } from "./types"

export const TODOS_KEY = "todos"

export const DEMO_TODOS: Todo[] = [
  {
    id: "demo-1",
    text: "Learn about Upstash Redis",
    completed: false,
    createdAt: Date.now() - 86400000 * 2, // 2 days ago
  },
  {
    id: "demo-2",
    text: "Connect Upstash integration",
    completed: false,
    createdAt: Date.now() - 86400000, // 1 day ago
  },
  {
    id: "demo-3",
    text: "Build awesome apps with serverless data",
    completed: false,
    createdAt: Date.now(),
  },
]
