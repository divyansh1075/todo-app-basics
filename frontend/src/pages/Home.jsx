import React from 'react';

// Subcomponents
import TodoHeader from '../component/TodoHeader';
import TodoStats from '../component/TodoStats';
import TodoForm from '../component/TodoForm';
import TodoFilter from '../component/TodoFilter';
import TodoList from '../component/TodoList';
import EditModal from '../component/EditModal';

/**
 * Home Page (Main Workspace Dashboard)
 * Shows the user's tasks, stats, search/filter, and quick-add form.
 */
export default function Home({
  todos,
  visibleTodos,
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  isDarkMode,
  setIsDarkMode,
  editingTodo,
  setEditingTodo,
  serverNotice,
  setServerNotice,
  currentUser,
  onNavigateToSignin,
  onSignOut,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onSaveEdit,
  counts,
  progress,
}) {
  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
        
        {/* Offline / Info banner */}
        {serverNotice && (
          <div className="flex items-center justify-between text-xs px-3.5 py-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <span>ℹ️ {serverNotice}</span>
            <button
              type="button"
              onClick={() => setServerNotice(null)}
              className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-200 cursor-pointer ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header: Title, Date, Dark/Light Mode switch & User Status */}
        <TodoHeader
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          currentUser={currentUser}
          onNavigateToSignin={onNavigateToSignin}
          onSignOut={onSignOut}
        />

        {/* SaaS Stats: Metric cards and dynamic completion bar */}
        <TodoStats
          total={counts.total}
          active={counts.active}
          completed={counts.completed}
          progress={progress}
        />

        {/* Notion-style Quick Add */}
        <TodoForm onAddTodo={onAddTodo} />

        {/* Filter Tabs and Search Bar */}
        <TodoFilter
          currentFilter={filter}
          setCurrentFilter={setFilter}
          counts={counts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Task List */}
        <TodoList
          todos={visibleTodos}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onOpenEdit={(todo) => setEditingTodo(todo)}
        />
      </main>

      {/* Edit Modal Popup */}
      <EditModal
        isOpen={Boolean(editingTodo)}
        initialText={editingTodo ? editingTodo.text : ''}
        onClose={() => setEditingTodo(null)}
        onSave={onSaveEdit}
      />
    </div>
  );
}
