import { useState } from 'react';
import { Percent, Copy, Check } from 'lucide-react';
import { calculatePercentageValue, calculatePartToPercentage, formatNumber } from '../Utils/Conversionlogic';

const CalculatePercentage = () => {
    const [mode, setMode] = useState('value'); // 'value' (X% of Y) or 'share' (X of Y = ?%)
    const [valA, setValA] = useState('20');
    const [valB, setValB] = useState('150');
    const [copied, setCopied] = useState(false);

    const numA = valA === '' ? 0 : parseFloat(valA);
    const numB = valB === '' ? 0 : parseFloat(valB);

    const rawResult = mode === 'value'
        ? calculatePercentageValue(numA, numB)
        : calculatePartToPercentage(numA, numB);

    const formattedResult = formatNumber(rawResult, 2) + (mode === 'share' ? '%' : '');

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(formattedResult);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard fallback
        }
    };

    return (
        <article className="flex flex-col justify-between bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
                {/* Header with Segmented Mode Picker */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            <Percent className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                                Percentage Calculator
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Compute portions, rates, and ratios
                            </p>
                        </div>
                    </div>

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => setMode('value')}
                            className={`px-2.5 py-1 rounded-md transition-colors ${
                                mode === 'value'
                                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            % of Value
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('share')}
                            className={`px-2.5 py-1 rounded-md transition-colors ${
                                mode === 'share'
                                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            Part to %
                        </button>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label
                                htmlFor="percentage-input-a"
                                className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                            >
                                {mode === 'value' ? 'Percentage (%)' : 'Portion / Part'}
                            </label>
                            <input
                                id="percentage-input-a"
                                type="number"
                                step="any"
                                value={valA}
                                onChange={(e) => setValA(e.target.value)}
                                placeholder="0"
                                className="w-full h-11 px-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="percentage-input-b"
                                className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                            >
                                Total / Base Value
                            </label>
                            <input
                                id="percentage-input-b"
                                type="number"
                                step="any"
                                value={valB}
                                onChange={(e) => setValB(e.target.value)}
                                placeholder="0"
                                className="w-full h-11 px-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Result Output */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                Calculated Result
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                {mode === 'value' ? `${numA}% of ${numB}` : `${numA} of ${numB}`}
                            </span>
                        </div>
                        <div
                            aria-live="polite"
                            className="flex items-center justify-between w-full h-11 px-3.5 bg-slate-100/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-slate-100 text-base font-semibold select-all"
                        >
                            <span>{formattedResult}</span>
                            <button
                                type="button"
                                onClick={handleCopy}
                                aria-label={`Copy result: ${formattedResult}`}
                                title={copied ? 'Copied!' : 'Copy result'}
                                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                            >
                                {copied ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Quick Reference */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>Formula: {mode === 'value' ? 'P = (% / 100) × Total' : '% = (Part / Total) × 100'}</span>
                {copied && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied to clipboard</span>}
            </div>
        </article>
    );
};

export default CalculatePercentage;