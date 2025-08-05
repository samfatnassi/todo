"use server"

import { v4 as uuidv4 } from "uuid"
import { getTodos, saveTodos } from "@/lib/todos"
import type { Todo } from "@/lib/types"
import { getCurrentUser } from "@/lib/simple-auth"

export async function addTodo(text: string): Promise<Todo> {
  const user = await getCurrentUser()
  const userId = user?.id

  const todos = await getTodos(userId)

  const newTodo: Todo = {
    id: uuidv4(),
    text,
    completed: false,
    createdAt: Date.now(),
  }

  await saveTodos([newTodo, ...todos], userId)
  return newTodo
}
