import { useState } from 'react';
import { Activity, Copy, Check } from 'lucide-react';
import { calculateBMI, getBMICategory } from '../Utils/Conversionlogic';

const BmiCalculator = () => {
    const [system, setSystem] = useState('metric');
    const [weight, setWeight] = useState('70');
    const [height, setHeight] = useState('1.75');
    const [copied, setCopied] = useState(false);

    // Normalize metric height if user typed centimeters (e.g. 175 cm -> 1.75 m)
    const rawWeight = weight === '' ? 0 : parseFloat(weight);
    let rawHeight = height === '' ? 0 : parseFloat(height);

    if (system === 'metric' && rawHeight > 3) {
        rawHeight = rawHeight / 100;
    }

    const bmi = calculateBMI(rawWeight, rawHeight, system);
    const category = getBMICategory(bmi);
    const formattedBmi = bmi > 0 ? bmi.toFixed(1) : '—';

    const handleSystemChange = (newSystem) => {
        setSystem(newSystem);
        if (newSystem === 'metric') {
            setWeight('70');
            setHeight('1.75');
        } else {
            setWeight('154');
            setHeight('69');
        }
    };

    const handleCopy = async () => {
        if (bmi <= 0) return;
        try {
            await navigator.clipboard.writeText(`${formattedBmi} (${category.label})`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard fallback
        }
    };

    return (
        <article className="flex flex-col justify-between bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
                {/* Header with Metric / Imperial Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            <Activity className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                                BMI Calculator
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Body Mass Index & health category
                            </p>
                        </div>
                    </div>

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => handleSystemChange('metric')}
                            className={`px-2.5 py-1 rounded-md transition-colors ${
                                system === 'metric'
                                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            Metric (kg/m)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSystemChange('imperial')}
                            className={`px-2.5 py-1 rounded-md transition-colors ${
                                system === 'imperial'
                                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                            }`}
                        >
                            Imperial (lb/in)
                        </button>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label
                                htmlFor="bmi-weight-input"
                                className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                            >
                                Weight ({system === 'metric' ? 'kg' : 'lbs'})
                            </label>
                            <input
                                id="bmi-weight-input"
                                type="number"
                                step="any"
                                min="0"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="0"
                                className="w-full h-11 px-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="bmi-height-input"
                                className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5"
                            >
                                Height ({system === 'metric' ? 'm or cm' : 'inches'})
                            </label>
                            <input
                                id="bmi-height-input"
                                type="number"
                                step="any"
                                min="0"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder={system === 'metric' ? '1.75' : '68'}
                                className="w-full h-11 px-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Result Output */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                Your BMI
                            </span>
                            <span className={`text-xs font-semibold ${category.color}`}>
                                {category.label} {category.range ? `(${category.range})` : ''}
                            </span>
                        </div>
                        <div
                            aria-live="polite"
                            className="flex items-center justify-between w-full h-11 px-3.5 bg-slate-100/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-slate-100 text-base font-semibold select-all"
                        >
                            <span>{formattedBmi}</span>
                            <button
                                type="button"
                                onClick={handleCopy}
                                disabled={bmi <= 0}
                                aria-label={`Copy result: ${formattedBmi}`}
                                title={copied ? 'Copied!' : 'Copy result'}
                                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded disabled:opacity-40"
                            >
                                {copied ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Minimalist Visual Range Indicator */}
                    <div className="pt-1">
                        <div className="grid grid-cols-4 gap-1 h-1.5 w-full rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                            <div className={`transition-opacity ${bmi > 0 && bmi < 18.5 ? 'bg-sky-500 opacity-100' : 'bg-sky-300 dark:bg-sky-900 opacity-40'}`} title="Underweight (< 18.5)" />
                            <div className={`transition-opacity ${bmi >= 18.5 && bmi < 25 ? 'bg-emerald-500 opacity-100' : 'bg-emerald-300 dark:bg-emerald-900 opacity-40'}`} title="Normal (18.5 - 24.9)" />
                            <div className={`transition-opacity ${bmi >= 25 && bmi < 30 ? 'bg-amber-500 opacity-100' : 'bg-amber-300 dark:bg-amber-900 opacity-40'}`} title="Overweight (25 - 29.9)" />
                            <div className={`transition-opacity ${bmi >= 30 ? 'bg-rose-500 opacity-100' : 'bg-rose-300 dark:bg-rose-900 opacity-40'}`} title="Obese (≥ 30)" />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                            <span>Under (&lt;18.5)</span>
                            <span>Normal (18.5-25)</span>
                            <span>Over (25-30)</span>
                            <span>Obese (30+)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>WHO Adult Classification standard</span>
                {copied && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied to clipboard</span>}
            </div>
        </article>
    );
};

export default BmiCalculator;