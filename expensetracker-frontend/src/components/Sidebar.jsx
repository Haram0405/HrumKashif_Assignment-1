// src/components/Sidebar.jsx
// Desktop: a persistent sidebar that can collapse to icons-only (with tooltips).
// Mobile: a slide-in drawer triggered by the hamburger button in the Header.
// Both share the same nav item list and the same active-section highlighting.

import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  FileBarChart,
  Settings,
  Download,
  FileText,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  X,
  Wallet,
} from 'lucide-react';

function buildNavItems({ onExportCSV, onExportPDF }) {
  return [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, type: 'scroll' },
    { id: 'add-expense', label: 'Add Expense', icon: PlusCircle, type: 'scroll' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, type: 'scroll' },
    { id: 'reports', label: 'Reports', icon: FileBarChart, type: 'scroll' },
    { id: 'settings', label: 'Settings', icon: Settings, type: 'placeholder' },
    { id: 'export-csv', label: 'Export CSV', icon: Download, type: 'action', onClick: onExportCSV },
    { id: 'export-pdf', label: 'Export PDF', icon: FileText, type: 'action', onClick: onExportPDF },
  ];
}

function NavButton({ item, isActive, collapsed, onNavigate }) {
  const Icon = item.icon;

  const handleClick = () => {
    if (item.type === 'scroll') onNavigate(item.id);
    else if (item.type === 'action') item.onClick?.();
    else if (item.type === 'placeholder') {
      // Settings is a placeholder in this assignment - intentionally does nothing yet.
    }
  };

  return (
    <button
      onClick={handleClick}
      title={collapsed ? item.label : undefined}
      className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
        ${collapsed ? 'justify-center' : 'justify-start'}
        ${
          isActive
            ? 'bg-white/20 text-white'
            : 'text-indigo-100 hover:bg-white/10 hover:text-white'
        }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}

      {/* Tooltip shown only in collapsed (icons-only) mode */}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
          {item.label}
        </span>
      )}
    </button>
  );
}

function SidebarContents({ collapsed, activeSection, onNavigate, theme, onToggleTheme, navItems }) {
  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-2 px-3 py-2 mb-2 ${collapsed ? 'justify-center' : ''}`}>
        <div className="bg-white/15 p-1.5 rounded-lg">
          <Wallet className="w-4 h-4 text-white" />
        </div>
        {!collapsed && <span className="text-white font-semibold text-sm">Menu</span>}
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeSection === item.id}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="px-2 pb-3 pt-2 border-t border-white/10">
        <button
          onClick={onToggleTheme}
          title={collapsed ? 'Toggle Theme' : undefined}
          className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-indigo-100 hover:bg-white/10 hover:text-white transition-colors ${
            collapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          {collapsed && (
            <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
              Theme Toggle
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  activeSection,
  onNavigateSection,
  onExportCSV,
  onExportPDF,
  theme,
  onToggleTheme,
}) {
  const navItems = buildNavItems({ onExportCSV, onExportPDF });

  const handleNavigate = (id) => {
    onNavigateSection(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Desktop persistent sidebar */}
      <aside
        className={`hidden md:flex flex-col relative sticky top-[72px] h-[calc(100vh-72px)] bg-gradient-to-b from-indigo-600 to-purple-700 dark:from-gray-900 dark:to-indigo-950 shadow-xl transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContents
          collapsed={collapsed}
          activeSection={activeSection}
          onNavigate={handleNavigate}
          theme={theme}
          onToggleTheme={onToggleTheme}
          navItems={navItems}
        />

        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 bg-white dark:bg-gray-700 shadow-md rounded-full p-1 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:text-indigo-600"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Mobile slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-indigo-600 to-purple-700 dark:from-gray-900 dark:to-indigo-950 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between px-3 py-3">
                <span className="text-white font-semibold">ExpenseTracker Pro</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-lg bg-white/10 text-white"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="h-[calc(100%-52px)]">
                <SidebarContents
                  collapsed={false}
                  activeSection={activeSection}
                  onNavigate={handleNavigate}
                  theme={theme}
                  onToggleTheme={onToggleTheme}
                  navItems={navItems}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
