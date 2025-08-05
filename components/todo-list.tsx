"use client"

import type React from "react"

import { useState } from "react"
import type { Todo } from "@/lib/types"
import { addTodo } from "@/actions/add-todo"
import { toggleTodo } from "@/actions/toggle-todo"
import { deleteTodo } from "@/actions/delete-todo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash, Loader2, Plus } from "lucide-react"

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [newTodo, setNewTodo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pendingTodos, setPendingTodos] = useState<Record<string, "add" | "delete" | "toggle">>({})

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    // Create optimistic todo
    const optimisticTodo: Todo = {
      id: `optimistic-${Date.now()}`,
      text: newTodo,
      completed: false,
      createdAt: Date.now(),
    }

    // Add optimistic todo to the list
    setTodos((prev) => [optimisticTodo, ...prev])
    setNewTodo("")
    setPendingTodos((prev) => ({ ...prev, [optimisticTodo.id]: "add" }))

    try {
      // Actual server request
      const actualTodo = await addTodo(newTodo)

      // Replace optimistic todo with actual todo
      setTodos((prev) => prev.map((todo) => (todo.id === optimisticTodo.id ? actualTodo : todo)))
    } catch (error) {
      console.error("Failed to add todo:", error)
      // Remove optimistic todo on error
      setTodos((prev) => prev.filter((todo) => todo.id !== optimisticTodo.id))
    } finally {
      setPendingTodos((prev) => {
        const updated = { ...prev }
        delete updated[optimisticTodo.id]
        return updated
      })
    }
  }

  const handleToggleTodo = async (id: string) => {
    // Optimistically update the UI
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    setPendingTodos((prev) => ({ ...prev, [id]: "toggle" }))

    try {
      // Actual server request
      await toggleTodo(id)
    } catch (error) {
      console.error("Failed to toggle todo:", error)
      // Revert on error
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    } finally {
      setPendingTodos((prev) => {
        const updated = { ...prev }
        delete updated[id]
        return updated
      })
    }
  }

  const handleDeleteTodo = async (id: string) => {
    // Optimistically remove from UI
    const todoToDelete = todos.find((todo) => todo.id === id)
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    setPendingTodos((prev) => ({ ...prev, [id]: "delete" }))

    try {
      // Actual server request
      await deleteTodo(id)
    } catch (error) {
      console.error("Failed to delete todo:", error)
      // Restore on error
      if (todoToDelete) {
        setTodos((prev) => [...prev, todoToDelete])
      }
    } finally {
      setPendingTodos((prev) => {
        const updated = { ...prev }
        delete updated[id]
        return updated
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto h-full">
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!newTodo.trim()} aria-label="Add todo">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <ul className="space-y-2 min-h-[200px]">
        {todos.length === 0 ? (
          <li className="text-center text-muted-foreground py-4">No todos yet. Add one above!</li>
        ) : (
          todos.map((todo) => {
            const isPending = pendingTodos[todo.id]
            return (
              <li
                key={todo.id}
                className={`flex items-center justify-between py-3 px-1 border-b border-border last:border-0 ${
                  isPending === "add" ? "animate-pulse bg-muted/20" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => handleToggleTodo(todo.id)}
                    disabled={!!isPending}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`text-sm ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTodo(todo.id)}
                  disabled={!!isPending}
                  aria-label="Delete todo"
                  className="h-8 w-8"
                >
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
                </Button>
              </li>
            )
          })
        )}
      </ul>
    </div>
  )
}
