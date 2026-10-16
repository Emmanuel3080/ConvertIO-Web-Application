/**
 * ConvertIO Conversion and Calculation Utilities
 * High-precision, zero-dependency conversion functions.
 */

export const lengthUnits = {
    meters: { name: 'Meters', symbol: 'm', factor: 1 },
    kilometers: { name: 'Kilometers', symbol: 'km', factor: 1000 },
    centimeters: { name: 'Centimeters', symbol: 'cm', factor: 0.01 },
    millimeters: { name: 'Millimeters', symbol: 'mm', factor: 0.001 },
    miles: { name: 'Miles', symbol: 'mi', factor: 1609.344 },
    feet: { name: 'Feet', symbol: 'ft', factor: 0.3048 },
    inches: { name: 'Inches', symbol: 'in', factor: 0.0254 }
};

export const convertLength = (value, fromUnit, toUnit) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return 0;
    if (fromUnit === toUnit) return num;

    const fromFactor = lengthUnits[fromUnit]?.factor ?? 1;
    const toFactor = lengthUnits[toUnit]?.factor ?? 1;

    const inMeters = num * fromFactor;
    return inMeters / toFactor;
};

export const weightUnits = {
    kilograms: { name: 'Kilograms', symbol: 'kg', factor: 1 },
    grams: { name: 'Grams', symbol: 'g', factor: 0.001 },
    milligrams: { name: 'Milligrams', symbol: 'mg', factor: 0.000001 },
    pounds: { name: 'Pounds', symbol: 'lb', factor: 0.45359237 },
    ounces: { name: 'Ounces', symbol: 'oz', factor: 0.028349523125 }
};

export const convertWeight = (value, fromUnit, toUnit) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return 0;
    if (fromUnit === toUnit) return num;

    const fromFactor = weightUnits[fromUnit]?.factor ?? 1;
    const toFactor = weightUnits[toUnit]?.factor ?? 1;

    const inKg = num * fromFactor;
    return inKg / toFactor;
};

export const convertTemperature = (value, fromUnit, toUnit) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return 0;
    if (fromUnit === toUnit) return num;

    let celsius;
    if (fromUnit === 'Celsius') {
        celsius = num;
    } else if (fromUnit === 'Fahrenheit') {
        celsius = (num - 32) * (5 / 9);
    } else if (fromUnit === 'Kelvin') {
        celsius = num - 273.15;
    } else {
        celsius = num;
    }

    if (toUnit === 'Celsius') return celsius;
    if (toUnit === 'Fahrenheit') return (celsius * 9) / 5 + 32;
    if (toUnit === 'Kelvin') return celsius + 273.15;

    return celsius;
};

export const volumeUnits = {
    liters: { name: 'Liters', symbol: 'L', factor: 1 },
    milliliters: { name: 'Milliliters', symbol: 'mL', factor: 0.001 },
    cubicMeters: { name: 'Cubic Meters', symbol: 'm³', factor: 1000 },
    gallons: { name: 'Gallons (US)', symbol: 'gal', factor: 3.785411784 },
    quarts: { name: 'Quarts (US)', symbol: 'qt', factor: 0.946352946 }
};

export const convertVolume = (value, fromUnit, toUnit) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return 0;
    if (fromUnit === toUnit) return num;

    const fromFactor = volumeUnits[fromUnit]?.factor ?? 1;
    const toFactor = volumeUnits[toUnit]?.factor ?? 1;

    const inLiters = num * fromFactor;
    return inLiters / toFactor;
};

export const calculateBMI = (weight, height, system = 'metric') => {
    const w = Number(weight);
    const h = Number(height);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return 0;

    if (system === 'metric') {
        // weight in kg, height in meters
        return w / (h * h);
    } else {
        // weight in lbs, height in inches
        return (w / (h * h)) * 703;
    }
};

export const getBMICategory = (bmi) => {
    if (!Number.isFinite(bmi) || bmi <= 0) {
        return { label: 'Enter positive measurements', color: 'text-slate-500 dark:text-slate-400', range: '' };
    }
    if (bmi < 18.5) {
        return { label: 'Underweight', color: 'text-sky-600 dark:text-sky-400', range: '< 18.5' };
    }
    if (bmi < 25) {
        return { label: 'Normal weight', color: 'text-emerald-600 dark:text-emerald-400', range: '18.5 – 24.9' };
    }
    if (bmi < 30) {
        return { label: 'Overweight', color: 'text-amber-600 dark:text-amber-400', range: '25.0 – 29.9' };
    }
    return { label: 'Obese', color: 'text-rose-600 dark:text-rose-400', range: '≥ 30.0' };
};

/**
 * Calculates what is P percent of Total
 * Example: 20% of 150 = 30
 */
export const calculatePercentageValue = (percentage, total) => {
    const p = Number(percentage);
    const t = Number(total);
    if (!Number.isFinite(p) || !Number.isFinite(t)) return 0;
    return (p / 100) * t;
};

/**
 * Calculates what percentage Part is of Total
 * Example: 30 of 150 = 20%
 */
export const calculatePartToPercentage = (part, total) => {
    const p = Number(part);
    const t = Number(total);
    if (!Number.isFinite(p) || !Number.isFinite(t) || t === 0) return 0;
    return (p / t) * 100;
};

/**
 * Smart number formatter:
 * - Truncates floating-point inaccuracies
 * - Displays tiny numbers in scientific notation instead of 0.0000
 * - Strips unnecessary trailing zeroes
 */
export const formatNumber = (value, maxDecimals = 4) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return '0';
    if (num === 0) return '0';

    const abs = Math.abs(num);
    // If very small (below 0.0001), scientific notation prevents deceiving 0.0000
    if (abs < 0.0001) {
        return num.toExponential(3);
    }

    // Limit decimals without floating point precision issues
    const factor = Math.pow(10, maxDecimals);
    const rounded = Math.round(num * factor) / factor;
    return rounded.toLocaleString('en-US', {
        maximumFractionDigits: maxDecimals,
        useGrouping: true
    });
};