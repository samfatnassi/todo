"use server"

import { getTodos, saveTodos } from "@/lib/todos"
import { getCurrentUser } from "@/lib/simple-auth"

export async function deleteTodo(id: string): Promise<void> {
  const user = await getCurrentUser()
  const userId = user?.id

  const todos = await getTodos(userId)
  const updatedTodos = todos.filter((todo) => todo.id !== id)

  await saveTodos(updatedTodos, userId)
}
