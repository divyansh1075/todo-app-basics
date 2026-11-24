import React from 'react';
import { FiCheck, FiTrash2, FiEdit2, FiInbox } from 'react-icons/fi';

/**
 * TodoList Component
 * Displays tasks with Notion-style checkboxes, priority badges,
 * and hover action buttons for editing and deleting.
 */
export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onOpenEdit }) {
  // Empty State when no tasks exist
  if (!todos || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-zinc-900 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl transition-colors">
        <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 mb-3">
          <FiInbox size={24} />
        </div>
        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          No tasks found
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs">
          Your task list is empty. Add a new task above or adjust your search filter!
        </p>
      </div>
    );
  }

  // Priority badge styling
  const getBadgeStyle = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'Work':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'Personal':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700';
    }
  };

  return (
    <div className="space-y-2">
      {todos.map((todo) => {
        const isDone = Boolean(todo.completed);

        return (
          <div
            key={todo._id}
            className={`group flex items-center justify-between p-3 sm:px-4 rounded-xl border transition-all duration-150 ${
              isDone
                ? 'bg-zinc-50/60 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-zinc-800/60'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
            }`}
          >
            {/* Checkbox and task text */}
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
              <button
                type="button"
                onClick={() => onToggleTodo(todo._id)}
                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isDone
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'border-zinc-300 dark:border-zinc-600 hover:border-blue-500 bg-white dark:bg-zinc-800'
                }`}
                title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
              >
                {isDone && <FiCheck size={13} strokeWidth={3} />}
              </button>

              <span
                onClick={() => onToggleTodo(todo._id)}
                className={`text-sm cursor-pointer select-none truncate transition-all ${
                  isDone
                    ? 'line-through text-zinc-400 dark:text-zinc-500'
                    : 'text-zinc-800 dark:text-zinc-200 font-medium'
                }`}
              >
                {todo.text}
              </span>

              {/* Priority badge if present */}
              {todo.priority && (
                <span
                  className={`hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full border font-medium ${getBadgeStyle(
                    todo.priority
                  )}`}
                >
                  {todo.priority}
                </span>
              )}
            </div>

            {/* Hover Actions: Edit & Delete */}
            <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onOpenEdit(todo)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:text-zinc-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30 transition cursor-pointer"
                title="Edit task"
              >
                <FiEdit2 size={14} />
              </button>

              <button
                type="button"
                onClick={() => onDeleteTodo(todo._id)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:text-zinc-400 dark:hover:text-red-400 dark:hover:bg-red-900/30 transition cursor-pointer"
                title="Delete task"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
