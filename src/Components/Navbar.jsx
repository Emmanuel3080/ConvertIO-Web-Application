import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return false;
        const savedTheme = localStorage.getItem('convertio-theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('convertio-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('convertio-theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Brand Logo & Name */}
                <a
                    href="#top"
                    className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md py-1"
                >
                    <img src="/favicon.svg" alt="ConvertIO Logo" className="h-8 w-8 rounded-lg shadow-2xs" />
                    <div>
                        <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                            ConvertIO
                        </span>
                        <span className="hidden sm:inline-block ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">
                            Unit & Calculation Suite
                        </span>
                    </div>
                </a>

                {/* Right controls: Theme Switcher */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                        title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                    >
                        {isDark ? (
                            <Sun className="h-4 w-4" aria-hidden="true" />
                        ) : (
                            <Moon className="h-4 w-4" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
