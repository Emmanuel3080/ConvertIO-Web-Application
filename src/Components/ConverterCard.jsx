import { useState, useId } from 'react';
import { ArrowUpDown, Copy, Check } from 'lucide-react';
import { formatNumber } from '../Utils/Conversionlogic';

/**
 * Minimal, accessible, high-performance Unit Converter Card
 */
const ConverterCard = ({
    id,
    title,
    description,
    icon: Icon,
    units,
    convertFn,
    defaultFrom,
    defaultTo,
    defaultValue = 1,
    allowNegative = false,
    maxDecimals = 4
}) => {
    const componentId = useId();
    const baseId = id || componentId.replace(/:/g, '');

    const [value, setValue] = useState(defaultValue.toString());
    const [fromUnit, setFromUnit] = useState(defaultFrom);
    const [toUnit, setToUnit] = useState(defaultTo);
    const [copied, setCopied] = useState(false);

    // Calculate conversion
    const numericValue = value === '' ? 0 : parseFloat(value);
    const rawResult = Number.isFinite(numericValue) ? convertFn(numericValue, fromUnit, toUnit) : 0;
    const formattedResult = formatNumber(rawResult, maxDecimals);

    const handleValueChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            setValue('');
            return;
        }
        const parsed = parseFloat(val);
        if (!allowNegative && parsed < 0) {
            setValue('0');
            return;
        }
        setValue(val);
    };

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(formattedResult);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard access fallback
        }
    };

    const inputId = `${baseId}-input`;
    const fromSelectId = `${baseId}-from-select`;
    const toSelectId = `${baseId}-to-select`;

    return (
        <article className="flex flex-col justify-between bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            {/* Header */}
            <div>
                <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div>
                        <div className="flex items-center gap-2.5">
                            {Icon && (
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </div>
                            )}
                            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                                {title}
                            </h2>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Form Controls */}
                <div className="space-y-4">
                    {/* From Section */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label
                                htmlFor={inputId}
                                className="text-xs font-medium text-slate-600 dark:text-slate-400"
                            >
                                Convert from
                            </label>
                            <label
                                htmlFor={fromSelectId}
                                className="text-xs font-medium text-slate-600 dark:text-slate-400"
                            >
                                Source Unit
                            </label>
                        </div>
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-7">
                                <input
                                    id={inputId}
                                    type="number"
                                    step="any"
                                    min={allowNegative ? undefined : 0}
                                    value={value}
                                    onChange={handleValueChange}
                                    placeholder="0"
                                    className="w-full h-11 px-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 transition-colors"
                                />
                            </div>
                            <div className="col-span-5">
                                <select
                                    id={fromSelectId}
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                    className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 transition-colors cursor-pointer"
                                >
                                    {units.map((u) => (
                                        <option key={u.key} value={u.key}>
                                            {u.label} {u.symbol ? `(${u.symbol})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Swap Button Divider */}
                    <div className="relative flex items-center justify-center py-1">
                        <div className="w-full border-t border-slate-100 dark:border-slate-800" />
                        <button
                            type="button"
                            onClick={handleSwap}
                            aria-label={`Swap ${fromUnit} and ${toUnit} units`}
                            title="Swap units"
                            className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                        >
                            <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                    </div>

                    {/* To Section */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                Result
                            </span>
                            <label
                                htmlFor={toSelectId}
                                className="text-xs font-medium text-slate-600 dark:text-slate-400"
                            >
                                Target Unit
                            </label>
                        </div>
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-7">
                                <div
                                    aria-live="polite"
                                    className="flex items-center justify-between w-full h-11 px-3.5 bg-slate-100/70 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-semibold select-all overflow-hidden"
                                >
                                    <span className="truncate pr-1">{formattedResult}</span>
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        aria-label={`Copy result: ${formattedResult}`}
                                        title={copied ? 'Copied!' : 'Copy result'}
                                        className="shrink-0 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                                    >
                                        {copied ? (
                                            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                                        ) : (
                                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-5">
                                <select
                                    id={toSelectId}
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                    className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 transition-colors cursor-pointer"
                                >
                                    {units.map((u) => (
                                        <option key={u.key} value={u.key}>
                                            {u.label} {u.symbol ? `(${u.symbol})` : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Quick Reference */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>1 {units.find((u) => u.key === fromUnit)?.symbol || fromUnit} = {formatNumber(convertFn(1, fromUnit, toUnit), 4)} {units.find((u) => u.key === toUnit)?.symbol || toUnit}</span>
                {copied && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied to clipboard</span>}
            </div>
        </article>
    );
};

export default ConverterCard;
