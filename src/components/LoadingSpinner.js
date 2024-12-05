import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="text-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-600 loading-spinner mx-auto"></div>
      <p className="mt-2 text-slate-400">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
