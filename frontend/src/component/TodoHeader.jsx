import React from 'react';
import { FiSun, FiMoon, FiUser } from 'react-icons/fi';

/**
 * TodoHeader Component
 * Shows workspace title, date, Light/Dark mode switch, and User status / Sign In option.
 */
export default function TodoHeader({
  isDarkMode,
  setIsDarkMode,
  currentUser,
  onNavigateToSignin,
  onSignOut,
}) {
  // Format today's date (e.g., "Sun, Nov 24")
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
      {/* Workspace info & title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Workspace
          </span>
          <span>/</span>
          <span>Tasks</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
          Daily Focus
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {today} &bull; Stay organized and mindful
        </p>
      </div>

      {/* Action Controls: Theme Toggle & User Status */}
      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        {/* User Account Pill / Sign In Option */}
        {currentUser ? (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 shadow-xs">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
              </div>
              <span className="font-medium max-w-[110px] truncate">
                {currentUser.name || currentUser.email || 'User'}
              </span>
            </div>
            <button
              type="button"
              onClick={onSignOut}
              className="px-2.5 py-1.5 text-xs text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg border border-zinc-200 dark:border-zinc-700 transition cursor-pointer"
              title="Sign Out"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onNavigateToSignin}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-xs cursor-pointer"
            title="Go to Sign In page"
          >
            <FiUser className="text-zinc-500 dark:text-zinc-400" size={14} />
            <span>Sign In</span>
          </button>
        )}

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-xs cursor-pointer"
          title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}
        >
          {isDarkMode ? (
            <>
              <FiSun className="text-amber-400" size={14} />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <FiMoon className="text-zinc-600" size={14} />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
