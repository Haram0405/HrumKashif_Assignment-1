// src/components/EmptyState.jsx
// Friendly illustration + message shown when the expense list is empty.

import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-10 text-center"
    >
      <div className="mx-auto w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center mb-4">
        <Wallet className="w-8 h-8 text-indigo-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        No expenses found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
        Start by adding your first expense.
      </p>
    </motion.div>
  );
}

export default EmptyState;
