"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addTodo,
  toggleTodo,
  togglePriority,
  deleteTodo,
  updateTodo,
} from "@/store/todosSlice";
import { Star, X, Trash2, Plus } from "lucide-react";

const TodoPage = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state) => state.todos);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      dispatch(addTodo(newTaskText.trim()));
      setNewTaskText("");
    }
  };

  const handleToggleComplete = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleTogglePriority = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    dispatch(togglePriority(id));
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTodo(id));
    }
  };

  const handleStartEdit = (todo: { id: number; text: string }) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleSaveEdit = (id: number) => {
    if (editingText.trim()) {
      dispatch(updateTodo({ id, text: editingText.trim() }));
    }
    setEditingId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      handleSaveEdit(id);
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  // Sort todos: completed at bottom, priority at top
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (a.isPriority !== b.isPriority) {
      return a.isPriority ? -1 : 1;
    }
    return a.id - b.id;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">To-Do List</h1>
        <button
          onClick={handleAddTask}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Task
        </button>
      </div>

      {/* Add Task Input */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
            placeholder="Enter new task..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {sortedTodos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No tasks yet. Add a new task to get started!</p>
          </div>
        ) : (
          sortedTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                todo.completed
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                className="w-5 h-5 rounded border-2 cursor-pointer"
                style={{
                  accentColor: todo.completed ? "#ffffff" : "#3b82f6",
                }}
              />

              {/* Task Text */}
              <div className="flex-1">
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleSaveEdit(todo.id)}
                    onKeyDown={(e) => handleKeyPress(e, todo.id)}
                    autoFocus
                    className={`w-full px-2 py-1 rounded ${
                      todo.completed
                        ? "bg-blue-500 text-white placeholder-blue-200"
                        : "bg-gray-50 border border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Edit task..."
                  />
                ) : (
                  <span
                    onClick={() => !todo.completed && handleStartEdit(todo)}
                    className={`cursor-pointer ${
                      todo.completed ? "line-through opacity-90" : ""
                    } ${!todo.completed ? "hover:text-blue-600" : ""}`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              {todo.completed ? (
                /* Completed Task - Show only delete button */
                <button
                  onClick={(e) => handleDelete(e, todo.id)}
                  className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              ) : (
                /* Incomplete Task - Show star and delete */
                <>
                  <button
                    onClick={(e) => handleTogglePriority(e, todo.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      todo.isPriority
                        ? "text-yellow-500 hover:bg-yellow-50"
                        : "text-gray-400 hover:bg-gray-100"
                    }`}
                    title={todo.isPriority ? "Remove priority" : "Mark as priority"}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        todo.isPriority ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, todo.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Total Tasks: <span className="font-semibold text-gray-900">{todos.length}</span>
            </span>
            <span className="text-gray-600">
              Completed:{" "}
              <span className="font-semibold text-green-600">
                {todos.filter((t) => t.completed).length}
              </span>
            </span>
            <span className="text-gray-600">
              Priority:{" "}
              <span className="font-semibold text-yellow-600">
                {todos.filter((t) => t.isPriority && !t.completed).length}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPage;

