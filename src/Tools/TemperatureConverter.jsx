import React, { useState } from 'react';
import { convertTemperature } from '../Utils/Conversionlogic';
import { ArrowRightLeft, Thermometer } from 'lucide-react';

const TemperatureConverter = () => {
    const [value, setValue] = useState(25);
    const [fromUnit, setFromUnit] = useState('Celsius');
    const [toUnit, setToUnit] = useState('Fahrenheit');

    const result = convertTemperature(value, fromUnit, toUnit);

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    return (
        <div className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-lg mx-auto transition-all">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                {/* <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 text-amber-600 rounded-xl">
                    <Thermometer size={22} />
                </div> */}
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Temperature Converter</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Convert accurately across temperature scales</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">From</label>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                            className="w-3/5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-lg font-medium text-slate-800 dark:text-white outline-none transition-all"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-2/5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none transition-all cursor-pointer"
                        >
                            <option value="Celsius">Celsius (°C)</option>
                            <option value="Fahrenheit">Fahrenheit (°F)</option>
                            <option value="Kelvin">Kelvin (K)</option>
                        </select>
                    </div>
                </div>

                {/* Swap Action Button */}
                <div className="relative flex justify-center my-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                    </div>
                    <button
                        onClick={handleSwap}
                        className="relative z-10 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 hover:border-amber-500 rounded-full shadow-sm transition-all active:scale-95"
                        title="Swap units"
                    >
                        <ArrowRightLeft size={16} className="rotate-90 sm:rotate-0" />
                    </button>
                </div>

                {/* Output Section */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">To</label>
                    <div className="flex gap-3">
                        <div className="w-3/5 bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 rounded-xl px-4 py-3 text-lg font-bold text-amber-600 dark:text-amber-400 flex items-center overflow-hidden text-ellipsis">
                            {isNaN(result) ? '0' : result.toFixed(2)}
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-2/5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none transition-all cursor-pointer"
                        >
                            <option value="Celsius">Celsius (°C)</option>
                            <option value="Fahrenheit">Fahrenheit (°F)</option>
                            <option value="Kelvin">Kelvin (K)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemperatureConverter;