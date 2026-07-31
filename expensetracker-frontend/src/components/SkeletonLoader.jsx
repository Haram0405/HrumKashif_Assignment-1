// src/components/SkeletonLoader.jsx
// Simple pulsing skeleton cards shown while the expense list is loading,
// instead of a plain "Loading..." text.

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex items-center gap-4 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-1/5 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}

function SkeletonLoader({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export default SkeletonLoader;
