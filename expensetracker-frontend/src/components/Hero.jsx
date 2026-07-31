// src/components/Hero.jsx
// A compact, elegant hero banner - not a full-height landing section.
// Keeps a small illustration and a soft gradient, but stays minimal so it
// doesn't dominate the dashboard.

import { motion } from 'framer-motion';
import { PlusCircle, BarChart3 } from 'lucide-react';

function DashboardIllustration() {
  // Lightweight abstract illustration - a small stylized bar chart + coin.
  return (
    <svg
      viewBox="0 0 220 150"
      className="w-full h-auto max-w-[180px] mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="15" width="200" height="120" rx="14" fill="rgba(255,255,255,0.10)" />
      <rect x="28" y="80" width="20" height="40" rx="5" fill="rgba(255,255,255,0.55)" />
      <rect x="58" y="62" width="20" height="58" rx="5" fill="rgba(255,255,255,0.75)" />
      <rect x="88" y="44" width="20" height="76" rx="5" fill="rgba(255,255,255,0.9)" />
      <rect x="118" y="68" width="20" height="52" rx="5" fill="rgba(255,255,255,0.65)" />
      <circle cx="172" cy="52" r="24" fill="#facc15" opacity="0.95" />
      <text x="172" y="58" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#78350f">
        $
      </text>
    </svg>
  );
}

function Hero({ onAddExpense, onViewAnalytics }) {
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden rounded-2xl mb-6 scroll-mt-24 bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-gray-900 dark:to-indigo-950"
    >
      {/* One soft glow accent - kept subtle on purpose */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 bg-purple-300/20 rounded-full blur-3xl" />

      <div className="relative grid grid-cols-1 sm:grid-cols-5 items-center gap-4 px-6 sm:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sm:col-span-3"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            💰 Track your expenses smarter.
          </h2>
          <p className="text-indigo-100 dark:text-indigo-200 mt-2 text-sm max-w-md">
            Manage your finances with confidence using real-time insights,
            interactive analytics, and smart expense tracking.
          </p>

          <div className="flex flex-wrap gap-2.5 mt-4">
            <button
              onClick={onAddExpense}
              className="flex items-center gap-1.5 bg-white text-indigo-700 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <PlusCircle className="w-4 h-4" />
              Add Expense
            </button>
            <button
              onClick={onViewAnalytics}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg border border-white/20 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden sm:block sm:col-span-2"
        >
          <DashboardIllustration />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
