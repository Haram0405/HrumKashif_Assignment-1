// src/components/ExpenseList.jsx
// Renders the list of ExpenseItem cards, or an empty-state illustration.

import { AnimatePresence } from 'framer-motion';
import ExpenseItem from './ExpenseItem';
import EmptyState from './EmptyState';

function ExpenseList({ expenses, searchTerm, onEdit, onDeleteRequest }) {
  if (expenses.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            searchTerm={searchTerm}
            onEdit={onEdit}
            onDeleteRequest={onDeleteRequest}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ExpenseList;
