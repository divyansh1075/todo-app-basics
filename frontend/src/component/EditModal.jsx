import React, { useState, useEffect } from 'react';
import { FiEdit2, FiX, FiCheck } from 'react-icons/fi';

/**
 * EditModal Component
 * Accessible popup modal to edit existing task text.
 */
export default function EditModal({ isOpen, onClose, onSave, initialText }) {
  const [editText, setEditText] = useState(initialText || '');

  // Keep input synchronized when editing item changes
  useEffect(() => {
    setEditText(initialText || '');
  }, [initialText]);

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onSave(trimmed);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 w-full max-w-md shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <FiEdit2 size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Edit Task
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Update task description and save
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Input */}
        <div className="mt-4">
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Task Description
          </label>
          <input
            type="text"
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/60 p-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:border-blue-500 dark:focus:border-blue-400 transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!editText.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition shadow-xs cursor-pointer"
          >
            <FiCheck size={14} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
