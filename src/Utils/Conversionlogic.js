const lengthUnits = {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    miles: 1609.34,
    feet: 0.3048,
    inches: 0.0254
};

export const convertLength = (value, fromUnit, toUnit) => {
    const valueInMeters = value * lengthUnits[fromUnit];
    return valueInMeters / lengthUnits[toUnit];
};

const weightUnits = {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    pounds: 0.453592,
    ounces: 0.0283495
};

export const convertWeight = (value, fromUnit, toUnit) => {
    const valueInKg = value * weightUnits[fromUnit];
    return valueInKg / weightUnits[toUnit];
};

export const convertTemperature = (value, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return value;

    let celsius;
    if (fromUnit === 'Celsius') celsius = value;
    else if (fromUnit === 'Fahrenheit') celsius = (value - 32) * (5 / 9);
    else if (fromUnit === 'Kelvin') celsius = value - 273.15;

    if (toUnit === 'Celsius') return celsius;
    if (toUnit === 'Fahrenheit') return celsius * (9 / 5) + 32;
    if (toUnit === 'Kelvin') return celsius + 273.15;
};

const volumeUnits = {
    liters: 1,
    milliliters: 0.001,
    cubicMeters: 1000,
    gallons: 3.78541,
    quarts: 0.946353
};

export const convertVolume = (value, fromUnit, toUnit) => {
    const valueInLiters = value * volumeUnits[fromUnit];
    return valueInLiters / volumeUnits[toUnit];
};


export const calculateBMI = (weight, height, system) => {
  if (!weight || !height || height <= 0) return 0;
  
  if (system === 'metric') {
    return weight / (height * height);
  } else {
    return (weight / (height * height)) * 703;
  }
};
export const getBMICategory = (bmi) => {
  if (bmi <= 0) return { label: 'Enter valid data', color: 'text-slate-400' };
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
  if (bmi < 25) return { label: 'Normal weight', color: 'text-emerald-500' };
  if (bmi < 30) return { label: 'Overweight', color: 'text-amber-500' };
  return { label: 'Obese', color: 'text-rose-500' };
};


export const calculatePercentageValue = (percentage, total) => {
    if (!percentage || !total) return 0;
    return (percentage / total) * total;
};

export const calculatePartToPercentage = (part, total) => {
    if (!total || total === 0) return 0;
    return (part / total) * 100;
};