// src/components/ExpenseItem.jsx
// Displays a single expense as a modern card, with category icon/badge,
// search-term highlighting, and edit/delete actions.

import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { getCategoryMeta, formatCurrency, formatDate } from '../constants/categories';

// Wraps the part of the title that matches the current search term in a
// highlighted <mark>, so it's easy to see why an item matched.
function HighlightedTitle({ title, searchTerm }) {
  if (!searchTerm) return <>{title}</>;

  const lowerTitle = title.toLowerCase();
  const lowerSearch = searchTerm.toLowerCase();
  const matchIndex = lowerTitle.indexOf(lowerSearch);

  if (matchIndex === -1) return <>{title}</>;

  const before = title.slice(0, matchIndex);
  const match = title.slice(matchIndex, matchIndex + searchTerm.length);
  const after = title.slice(matchIndex + searchTerm.length);

  return (
    <>
      {before}
      <mark className="bg-yellow-200 dark:bg-yellow-500/40 text-inherit rounded px-0.5">
        {match}
      </mark>
      {after}
    </>
  );
}

function ExpenseItem({ expense, searchTerm, onEdit, onDeleteRequest }) {
  const category = getCategoryMeta(expense.category);
  const CategoryIcon = category.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md p-4 flex items-start justify-between gap-4 transition-shadow"
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div
          className="p-2.5 rounded-lg flex-shrink-0"
          style={{ backgroundColor: `${category.color}22`, color: category.color }}
        >
          <CategoryIcon className="w-5 h-5" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 truncate">
              <HighlightedTitle title={expense.title} searchTerm={searchTerm} />
            </h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${category.badgeClass}`}>
              {category.label}
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            {formatDate(expense.date)}
          </p>
          {expense.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {expense.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">
          {formatCurrency(expense.amount)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            aria-label="Edit expense"
            className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 hover:scale-105 transition-all"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteRequest(expense)}
            aria-label="Delete expense"
            className="p-1.5 rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 text-white transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ExpenseItem;
