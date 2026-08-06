import React from 'react';
import { Layers } from 'lucide-react';
import WeightConverter from '../Tools/WeightConverter';
import TemperatureConverter from '../Tools/TemperatureConverter';
import VolumeConverter from '../Tools/CovertVolume';
import PercentageCalculator from '../Tools/CalculatePercentage';
import BmiCalculator from '../Tools/BMICalculator';
import LengthConverter from '../Tools/LengthConver';
import HeroeSection from '../Components/HeroeSection';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
            <HeroeSection />

            <main className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                <div className="mb-10 md:mb-12 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Conversion & Calculation Suite
                    </h2>
                    <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        Select a tool below to perform accurate real-time calculations and unit transformations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    <LengthConverter />
                    <WeightConverter />
                    <TemperatureConverter />
                    <VolumeConverter />
                    <PercentageCalculator />
                    <BmiCalculator />
                </div>
            </main>
        </div>
    );
};

export default LandingPage;