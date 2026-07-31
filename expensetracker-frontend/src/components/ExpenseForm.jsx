// src/components/ExpenseForm.jsx
// Controlled form used for BOTH adding a new expense and editing an
// existing one. When `editingExpense` is passed in, the form pre-fills
// itself and switches to "Update Expense" mode.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Tag, Wallet, Calendar, FileText, Loader2, X } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';

const today = new Date().toISOString().split('T')[0];

const emptyForm = {
  title: '',
  amount: '',
  category: 'food',
  date: today,
  description: '',
};

function ExpenseForm({ onCreate, onUpdate, editingExpense, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEditing = Boolean(editingExpense);

  // Pre-fill the form whenever a different expense is selected for editing.
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        description: editingExpense.description || '',
      });
      setFormError('');
    }
  }, [editingExpense]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.amount) {
      setFormError('Title and amount are required.');
      return;
    }

    if (Number(formData.amount) <= 0) {
      setFormError('Amount must be greater than 0.');
      return;
    }

    setFormError('');
    setSubmitting(true);

    const payload = { ...formData, amount: Number(formData.amount) };

    try {
      if (isEditing) {
        await onUpdate(editingExpense.id, payload);
      } else {
        await onCreate(payload);
      }
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <motion.form
      layout
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 mb-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-indigo-500" />
          {isEditing ? 'Edit Expense' : 'Add Expense'}
        </h2>
        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Cancel edit"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {formError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2"
        >
          {formError}
        </motion.p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g. Grocery shopping"
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5" /> Amount (PKR)
          </label>
          <input
            type="number"
            min="1"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder="e.g. 2500"
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
          <FileText className="w-3.5 h-3.5" /> Description (optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Any extra notes about this expense"
          rows={2}
          className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </motion.button>

        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
}

export default ExpenseForm;
