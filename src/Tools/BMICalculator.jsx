import React, { useState } from 'react';
import { calculateBMI, getBMICategory } from '../Utils/Conversionlogic';
import { Activity } from 'lucide-react';

const BmiCalculator = () => {
    const [system, setSystem] = useState('metric'); 
    const [weight, setWeight] = useState(70); 
    const [height, setHeight] = useState(1.75); 

    const bmi = calculateBMI(weight, height, system);
    const category = getBMICategory(bmi);

    return (
        <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-lg mx-auto transition-all">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    {/* <div className="p-2.5 bg-rose-50 dark:bg-rose-950/50 text-rose-600 rounded-xl">
                        <Activity size={22} />
                    </div> */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">BMI Calculator</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Check body mass index and health status</p>
                    </div>
                </div>
                
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                    <button
                        onClick={() => { setSystem('metric'); setWeight(70); setHeight(1.75); }}
                        className={`px-3 py-1.5 rounded-lg transition-all ${system === 'metric' ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        Metric
                    </button>
                    <button
                        onClick={() => { setSystem('imperial'); setWeight(150); setHeight(68); }}
                        className={`px-3 py-1.5 rounded-lg transition-all ${system === 'imperial' ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-sm' : 'text-slate-500'}`}
                    >
                        Imperial
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Weight ({system === 'metric' ? 'kg' : 'lbs'})
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-3 text-lg font-medium text-slate-800 dark:text-white outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Height ({system === 'metric' ? 'm' : 'in'})
                        </label>
                        <input
                            type="number"
                            step={system === 'metric' ? '0.01' : '1'}
                            value={height}
                            onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 rounded-xl px-4 py-3 text-lg font-medium text-slate-800 dark:text-white outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Your BMI Result</label>
                    <div className="w-full bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 rounded-xl px-4 py-4 flex items-center justify-between">
                        <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                            {isNaN(bmi) ? '0.00' : bmi.toFixed(1)}
                        </span>
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow-sm ${category.color}`}>
                            {category.label}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BmiCalculator;