// src/components/Footer.jsx
// Simple footer for the dashboard.

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
        Built with React &amp; Tailwind CSS — ExpenseTracker Pro © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
