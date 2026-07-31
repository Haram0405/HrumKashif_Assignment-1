// src/components/ChartsSection.jsx
// Two bonus charts: spending by category (pie) and spending by month (bar).
// Reads from the extended /api/expenses/stats response (byCategory, byMonth).
// Both fields are optional-safe, so this never crashes on older stats data.

import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { getCategoryMeta, formatCurrency } from '../constants/categories';

function monthLabel(monthKey) {
  if (!monthKey || monthKey === 'unknown') return 'Unknown';
  const [year, month] = monthKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

function ChartsSection({ stats }) {
  if (!stats) return null;

  const byCategory = stats.byCategory || {};
  const byMonth = stats.byMonth || {};

  const pieData = Object.entries(byCategory).map(([category, data]) => ({
    name: getCategoryMeta(category).label,
    value: data.total,
    color: getCategoryMeta(category).color,
  }));

  const barData = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([monthKey, data]) => ({
      month: monthLabel(monthKey),
      total: data.total,
    }));

  if (pieData.length === 0 && barData.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {pieData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5"
        >
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-indigo-500" />
            Spending by Category
          </h3>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                animationDuration={700}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {barData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5"
        >
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-500" />
            Monthly Expenses
          </h3>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} animationDuration={700} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
}

export default ChartsSection;
