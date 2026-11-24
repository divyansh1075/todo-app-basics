import React from 'react';

/**
 * TodoStats Component
 * Displays SaaS metrics (Total, Pending, Completed) and completion progress.
 */
export default function TodoStats({ total, active, completed, progress }) {
  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {/* Total Tasks */}
        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
            Total
          </span>
          <p className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 mt-0.5">
            {total}
          </p>
        </div>

        {/* Pending Tasks */}
        <div className="p-3 rounded-lg bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-700 dark:text-amber-400">
            Pending
          </span>
          <p className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-400 mt-0.5">
            {active}
          </p>
        </div>

        {/* Completed Tasks */}
        <div className="p-3 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
            Completed
          </span>
          <p className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
            {completed}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          <span className="text-zinc-600 dark:text-zinc-400">Overall Progress</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">{progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
