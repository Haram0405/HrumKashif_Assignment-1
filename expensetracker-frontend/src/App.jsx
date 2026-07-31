// src/App.jsx
// All application state lives here and is passed down to child components.
// Sidebar has been removed per the latest UI refinement - layout is back
// to a single centered column below the top navbar. No state, handlers,
// or features were changed - only the surrounding layout.

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  getAllExpenses,
  getStats,
  createExpense,
  updateExpense,
  deleteExpense,
} from './api/expenseApi';
import { exportExpensesToPDF } from './utils/exportPDF';
import { useTheme } from './hooks/useTheme';
import { scrollToSection } from './utils/scrollToSection';

import Header from './components/Header';
import Hero from './components/Hero';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import StatsPanel from './components/StatsPanel';
import ChartsSection from './components/ChartsSection';
import ConfirmModal from './components/ConfirmModal';
import SkeletonLoader from './components/SkeletonLoader';
import Footer from './components/Footer';

const BACKEND_BASE_URL = 'http://localhost:3000';

const initialFilters = {
  category: '',
  search: '',
  minAmount: '',
  maxAmount: '',
  dateFrom: '',
  dateTo: '',
};

function sortExpenses(expenses, sortBy) {
  const sorted = [...expenses];

  switch (sortBy) {
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'highest':
      return sorted.sort((a, b) => b.amount - a.amount);
    case 'lowest':
      return sorted.sort((a, b) => a.amount - b.amount);
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

function App() {
  const { theme, toggleTheme } = useTheme();

  // ---- Original state (unchanged in spirit from the base assignment) ----
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // ---- State added for the bonus features ----
  const [sortBy, setSortBy] = useState('newest');
  const [editingExpense, setEditingExpense] = useState(null);
  const [expensePendingDelete, setExpensePendingDelete] = useState(null);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllExpenses(filters);
      setExpenses(response.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getStats();
      setStats(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Re-fetch expenses whenever filters change
  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Fetch stats once on mount
  useEffect(() => {
    fetchStats();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createExpense(formData);
      await fetchExpenses();
      await fetchStats();
      toast.success('Expense added successfully');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to add expense');
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await updateExpense(id, formData);
      await fetchExpenses();
      await fetchStats();
      setEditingExpense(null);
      toast.success('Expense updated successfully');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to update expense');
    }
  };

  // Opens the ConfirmModal instead of using window.confirm.
  const handleDeleteRequest = (expense) => {
    setExpensePendingDelete(expense);
  };

  const handleConfirmDelete = async () => {
    if (!expensePendingDelete) return;
    try {
      await deleteExpense(expensePendingDelete.id);
      await fetchExpenses();
      await fetchStats();
      toast.success('Expense deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to delete expense');
    } finally {
      setExpensePendingDelete(null);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = (resetValues) => {
    setFilters(resetValues);
    setSortBy('newest');
  };

  const handleExportCSV = () => {
    // The backend streams the CSV file directly, so we just navigate to it.
    window.open(`${BACKEND_BASE_URL}/api/expenses/export`, '_blank');
  };

  const handleExportPDF = () => {
    exportExpensesToPDF(sortedExpenses, stats);
    toast.success('PDF exported');
  };

  const sortedExpenses = sortExpenses(expenses, sortBy);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <Hero
          onAddExpense={() => scrollToSection('add-expense')}
          onViewAnalytics={() => scrollToSection('analytics')}
        />

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <StatsPanel stats={stats} />

        <div id="analytics" className="scroll-mt-24">
          <ChartsSection stats={stats} />
        </div>

        <div id="add-expense" className="scroll-mt-24">
          <ExpenseForm
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            editingExpense={editingExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />
        </div>

        <div id="reports" className="scroll-mt-24">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleResetFilters}
          />

          {loading ? (
            <SkeletonLoader />
          ) : (
            <ExpenseList
              expenses={sortedExpenses}
              searchTerm={filters.search}
              onEdit={setEditingExpense}
              onDeleteRequest={handleDeleteRequest}
            />
          )}
        </div>
      </main>

      <Footer />

      <ConfirmModal
        isOpen={Boolean(expensePendingDelete)}
        title="Delete this expense?"
        message={
          expensePendingDelete
            ? `"${expensePendingDelete.title}" will be permanently removed. This cannot be undone.`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setExpensePendingDelete(null)}
      />

      <ToastContainer position="top-right" autoClose={2500} theme={theme} />
    </div>
  );
}

export default App;
