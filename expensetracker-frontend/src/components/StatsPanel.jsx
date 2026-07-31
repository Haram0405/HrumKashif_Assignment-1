// src/components/StatsPanel.jsx
// Premium summary cards fed by GET /api/expenses/stats.
// Falls back gracefully if optional fields (averageAmount, categoriesUsed)
// are missing, so this stays compatible with the original stats shape too.

import { motion } from 'framer-motion';
import { Receipt, Wallet, TrendingUp, TrendingDown, BarChart3, Tags } from 'lucide-react';
import { formatCurrency } from '../constants/categories';

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35 },
  }),
};

function StatCard({ index, icon: Icon, label, value, gradient }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3 }}
      className={`relative overflow-hidden rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 text-white ${gradient}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="bg-white/20 p-2 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-sm text-white/80">{label}</p>
      <p className="text-xl font-bold mt-0.5 truncate">{value}</p>
    </motion.div>
  );
}

function StatsPanel({ stats }) {
  if (!stats) return null;

  const {
    totalExpenses = 0,
    totalAmount = 0,
    averageAmount,
    categoriesUsed,
    byCategory = {},
    highestExpense,
    lowestExpense,
  } = stats;

  const computedAverage =
    averageAmount !== undefined ? averageAmount : totalExpenses > 0 ? totalAmount / totalExpenses : 0;
  const computedCategoriesUsed =
    categoriesUsed !== undefined ? categoriesUsed : Object.keys(byCategory).length;

  const cards = [
    {
      icon: Receipt,
      label: 'Total Expenses',
      value: totalExpenses,
      gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    },
    {
      icon: Wallet,
      label: 'Total Amount',
      value: formatCurrency(totalAmount),
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
    },
    {
      icon: BarChart3,
      label: 'Average Expense',
      value: formatCurrency(computedAverage, 2),
      gradient: 'bg-gradient-to-br from-sky-500 to-sky-700',
    },
    {
      icon: TrendingUp,
      label: 'Highest Expense',
      value: highestExpense ? formatCurrency(highestExpense.amount) : '—',
      gradient: 'bg-gradient-to-br from-rose-500 to-rose-700',
    },
    {
      icon: TrendingDown,
      label: 'Lowest Expense',
      value: lowestExpense ? formatCurrency(lowestExpense.amount) : '—',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    },
    {
      icon: Tags,
      label: 'Categories Used',
      value: computedCategoriesUsed,
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {cards.map((card, index) => (
        <StatCard key={card.label} index={index} {...card} />
      ))}
    </div>
  );
}

export default StatsPanel;
