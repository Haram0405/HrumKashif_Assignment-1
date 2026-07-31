// src/hooks/useTheme.js
// Small custom hook that manages the dark/light theme.
// The choice is saved in localStorage so it persists across visits,
// and it toggles the "dark" class on <html> so Tailwind's dark: classes apply.

import { useState, useEffect } from 'react';

function getInitialTheme() {
  const savedTheme = localStorage.getItem('expensetracker-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  // Fall back to the user's system preference if nothing is saved yet.
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('expensetracker-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
