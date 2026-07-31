// src/components/Header.jsx
// Top navigation bar: logo, current date, theme toggle, and a responsive
// mobile menu. Kept as its own component so App.jsx stays focused on state.

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Sun, Moon, Menu, X, Download, FileText } from 'lucide-react';

function Header({ theme, onToggleTheme, onExportCSV, onExportPDF }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-white/15 backdrop-blur-sm p-2 rounded-xl">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">ExpenseTracker Pro</h1>
            <p className="text-indigo-100 dark:text-indigo-200 text-xs hidden sm:block">{todayLabel}</p>
          </div>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center gap-1.5 text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg"
          >
            <FileText className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg bg-white/10 text-white"
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="px-4 py-3 flex flex-col gap-2">
              <button
                onClick={onExportCSV}
                className="flex items-center gap-2 text-sm text-white bg-white/10 px-3 py-2 rounded-lg"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
              <button
                onClick={onExportPDF}
                className="flex items-center gap-2 text-sm text-white bg-white/10 px-3 py-2 rounded-lg"
              >
                <FileText className="w-4 h-4" /> Export PDF
              </button>
              <button
                onClick={onToggleTheme}
                className="flex items-center gap-2 text-sm text-white bg-white/10 px-3 py-2 rounded-lg"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
