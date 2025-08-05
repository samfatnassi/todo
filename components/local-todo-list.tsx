"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Todo } from "@/lib/types"
import { getTodos, saveTodos, type User } from "@/lib/local-storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash, Plus, CheckCircle2, Circle, Sparkles } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface LocalTodoListProps {
  user: User | null
}

export function LocalTodoList({ user }: LocalTodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    const userTodos = getTodos(user?.id)
    setTodos(userTodos)
  }, [user?.id])

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    const todo: Todo = {
      id: uuidv4(),
      text: newTodo,
      completed: false,
      createdAt: Date.now(),
    }

    const updatedTodos = [todo, ...todos]
    setTodos(updatedTodos)
    saveTodos(updatedTodos, user?.id)
    setNewTodo("")
    setIsAdding(false)
  }

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    setTodos(updatedTodos)
    saveTodos(updatedTodos, user?.id)
  }

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
    saveTodos(updatedTodos, user?.id)
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Add Todo Form - Enhanced */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg mb-8 transform hover:shadow-xl transition-shadow duration-200">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-6 w-6 text-gray-400 dark:text-gray-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">What's on your mind?</h2>
        </div>
        <form onSubmit={handleAddTodo} className="flex gap-4">
          <Input
            type="text"
            placeholder="Add a new task and press Enter..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 h-14 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-gray-300 text-lg rounded-xl px-6 placeholder:text-gray-400"
            disabled={isAdding}
            autoFocus
          />
          <Button
            type="submit"
            size="lg"
            disabled={!newTodo.trim() || isAdding}
            className="h-14 px-8 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900 font-medium rounded-xl transform hover:scale-105 transition-all duration-200"
          >
            {isAdding ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-gray-900/30 dark:border-t-gray-900 rounded-full animate-spin"></div>
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>

      {/* Progress Indicator - Enhanced */}
      {totalCount > 0 && (
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-gray-900 dark:text-white text-lg">Your Progress</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((completedCount / totalCount) * 100)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {completedCount} of {totalCount} done
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            ></div>
          </div>
          {completedCount === totalCount && totalCount > 0 && (
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
                🎉 All tasks completed! Amazing work!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Todo List - Enhanced */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
        {todos.length === 0 ? (
          <div className="text-center py-20 px-6">
            <div className="relative mb-6">
              <Circle className="h-20 w-20 text-gray-300 dark:text-gray-600 mx-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Your canvas awaits</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Start by adding your first task above and watch your productivity soar
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {todos.map((todo, index) => (
              <div
                key={todo.id}
                className={`flex items-center gap-6 p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-200 group ${
                  todo.completed ? "opacity-60" : ""
                } ${index === 0 ? "bg-gray-50/50 dark:bg-gray-700/20" : ""}`}
              >
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(todo.id)}
                  className="w-6 h-6 rounded-lg border-2 transition-all duration-200"
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`flex-1 cursor-pointer transition-all duration-200 text-lg ${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                >
                  {todo.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 h-10 w-10 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 rounded-lg"
                >
                  <Trash className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {user && (
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm border border-green-200 dark:border-green-800">
            🔒 <span>Stored securely in your browser</span>
          </div>
        </div>
      )}
    </div>
  )
}
