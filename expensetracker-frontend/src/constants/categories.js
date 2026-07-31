// src/constants/categories.js
// Single source of truth for category metadata so every component
// (form, badges, charts, icons) stays in sync.

import { Utensils, Car, ShoppingBag, Zap, HeartPulse, MoreHorizontal } from 'lucide-react';

export const CATEGORIES = [
  { value: 'food', label: 'Food', icon: Utensils, color: '#22c55e', badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' },
  { value: 'transport', label: 'Transport', icon: Car, color: '#3b82f6', badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
  { value: 'shopping', label: 'Shopping', icon: ShoppingBag, color: '#a855f7', badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
  { value: 'utilities', label: 'Utilities', icon: Zap, color: '#eab308', badgeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' },
  { value: 'health', label: 'Health', icon: HeartPulse, color: '#ef4444', badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' },
  { value: 'other', label: 'Other', icon: MoreHorizontal, color: '#6b7280', badgeClass: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
];

export function getCategoryMeta(categoryValue) {
  return CATEGORIES.find((c) => c.value === categoryValue) || CATEGORIES[CATEGORIES.length - 1];
}

export function formatCurrency(amount, decimals = 0) {
  const value = Number(amount || 0);
  return `PKR ${value.toLocaleString('en-PK', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
