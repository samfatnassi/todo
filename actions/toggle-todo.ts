"use server"

import { getTodos, saveTodos } from "@/lib/todos"
import { getCurrentUser } from "@/lib/simple-auth"

export async function toggleTodo(id: string): Promise<void> {
  const user = await getCurrentUser()
  const userId = user?.id

  const todos = await getTodos(userId)
  const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))

  await saveTodos(updatedTodos, userId)
}
