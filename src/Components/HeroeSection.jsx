import { Layers } from 'lucide-react';
import React from 'react';

const HeroeSection = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              ConvertIO
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              All-in-One Utility & Conversion Dashboard
            </p>
          </div>
        </div>

        {/* Optional badge (uncomment if needed) */}
        {/* <div className="hidden sm:inline-flex items-center text-xs font-medium px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-900/50">
          Final Year Project v1.0
        </div> */}
      </div>
    </header>
  );
};

export default HeroeSection;