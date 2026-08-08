import React, { useState } from 'react';
import { Percent, ArrowRight } from 'lucide-react';

const PercentageCalculator = () => {
    const [percentage, setPercentage] = useState(20);
    const [totalValue, setTotalValue] = useState(150);

    const resultValue = (percentage / 100) * totalValue;

    return (
        <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-lg mx-auto transition-all">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                {/* <div className="p-2.5 bg-purple-50 dark:bg-purple-950/50 text-purple-600 rounded-xl">
                    <Percent size={22} />
                </div> */}
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Percentage Calculator</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Quickly compute portions and percentage values</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Percentage (%)</label>
                        <input
                            type="number"
                            value={percentage}
                            onChange={(e) => setPercentage(parseFloat(e.target.value))}
                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl px-4 py-3 text-lg font-medium text-slate-800 dark:text-white outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Of Value</label>
                        <input
                            type="number"
                            value={totalValue}
                            onChange={(e) => setTotalValue(parseFloat(e.target.value))}
                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl px-4 py-3 text-lg font-medium text-slate-800 dark:text-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center py-2 text-slate-400">
                    <ArrowRight size={18} className="rotate-90" />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Result</label>
                    <div className="w-full bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 rounded-xl px-4 py-3.5 text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center justify-between">
                        <span>{isNaN(resultValue) ? '0' : resultValue.toFixed(2)}</span>
                        <span className="text-xs font-normal text-slate-400 uppercase tracking-wider">Total Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PercentageCalculator;