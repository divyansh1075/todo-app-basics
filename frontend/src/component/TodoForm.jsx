import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

/**
 * TodoForm Component
 * Notion-style clean quick-add input with Enter key support.
 */
export default function TodoForm({ onAddTodo }) {
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState('Normal');

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    onAddTodo(trimmed, priority);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 sm:p-3 shadow-xs transition-colors flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center"
    >
      {/* Icon and Input */}
      <div className="flex items-center gap-2.5 flex-1 px-2">
        <span className="text-zinc-400 dark:text-zinc-500 font-light text-lg select-none">
          +
        </span>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a new task... (press Enter to save)"
          className="w-full bg-transparent border-none text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-hidden"
        />
      </div>

      {/* Priority tag & Add button */}
      <div className="flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden cursor-pointer"
        >
          <option value="Normal">Normal</option>
          <option value="High">High ⚡</option>
          <option value="Work">Work 💼</option>
          <option value="Personal">Personal 🏠</option>
        </select>

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
        >
          <FiPlus size={14} />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
}
