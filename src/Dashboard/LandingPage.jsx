import { useState, useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import Navbar from '../Components/Navbar';
import LengthConverter from '../Tools/LengthConverter';
import WeightConverter from '../Tools/WeightConverter';
import TemperatureConverter from '../Tools/TemperatureConverter';
import VolumeConverter from '../Tools/VolumeConverter';
import PercentageCalculator from '../Tools/CalculatePercentage';
import BmiCalculator from '../Tools/BMICalculator';

const TOOL_DEFINITIONS = [
    {
        id: 'length',
        name: 'Length Converter',
        category: 'Units',
        keywords: ['length', 'distance', 'meters', 'feet', 'inches', 'miles', 'kilometers', 'centimeters', 'millimeters'],
        component: <LengthConverter key="length" />
    },
    {
        id: 'weight',
        name: 'Weight Converter',
        category: 'Units',
        keywords: ['weight', 'mass', 'kilograms', 'pounds', 'grams', 'ounces', 'milligrams', 'lbs', 'kg'],
        component: <WeightConverter key="weight" />
    },
    {
        id: 'temperature',
        name: 'Temperature Converter',
        category: 'Units',
        keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'heat', 'degrees'],
        component: <TemperatureConverter key="temperature" />
    },
    {
        id: 'volume',
        name: 'Volume Converter',
        category: 'Units',
        keywords: ['volume', 'capacity', 'liters', 'gallons', 'milliliters', 'quarts', 'cubic meters'],
        component: <VolumeConverter key="volume" />
    },
    {
        id: 'percentage',
        name: 'Percentage Calculator',
        category: 'Math',
        keywords: ['percentage', 'percent', 'portion', 'ratio', 'share', 'discount', 'math'],
        component: <PercentageCalculator key="percentage" />
    },
    {
        id: 'bmi',
        name: 'BMI Calculator',
        category: 'Health',
        keywords: ['bmi', 'body mass index', 'health', 'weight', 'height', 'fitness', 'obesity'],
        component: <BmiCalculator key="bmi" />
    }
];

const CATEGORIES = ['All', 'Units', 'Math', 'Health'];

const LandingPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredTools = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return TOOL_DEFINITIONS.filter((tool) => {
            const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
            if (!matchesCategory) return false;
            if (!query) return true;

            const nameMatch = tool.name.toLowerCase().includes(query);
            const keywordMatch = tool.keywords.some((kw) => kw.includes(query));
            return nameMatch || keywordMatch;
        });
    }, [searchQuery, selectedCategory]);

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All');
    };

    return (
        <div id="top" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-blue-600 selection:text-white">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Hero / Intro Header */}
                <section className="mb-8 md:mb-10 text-center max-w-3xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        All-in-One Unit Converter & Calculator Suite
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        Convert lengths, weights, volumes, and temperatures, or calculate percentages and BMI. Accurate, client-side, and completely private.
                    </p>

                    {/* Minimalist Filter Bar */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search units or tools..."
                                aria-label="Search units and tools"
                                className="w-full h-10 pl-9 pr-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-blue-500 shadow-2xs"
                            />
                        </div>

                        {/* Category Segmented Buttons */}
                        <div className="flex bg-slate-200/80 dark:bg-slate-800 p-1 rounded-lg text-xs font-medium self-stretch sm:self-auto justify-center">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-1.5 rounded-md transition-colors ${
                                        selectedCategory === cat
                                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tools Grid Section */}
                <section aria-label="Available Converters and Calculators">
                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map((tool) => tool.component)}
                        </div>
                    ) : (
                        <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                No tools match "{searchQuery}"
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Try searching for "meters", "pounds", "celsius", or "bmi".
                            </p>
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-200 transition-colors"
                            >
                                <RotateCcw className="h-3 w-3" />
                                Reset Filters
                            </button>
                        </div>
                    )}
                </section>

                {/* SEO-Rich Information & FAQ Section */}
                <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800/80">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                            Frequently Asked Questions & Standards
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
                                    How accurate are the conversions?
                                </h3>
                                <p>
                                    All conversion ratios use official International System of Units (SI) definitions and NIST standards (e.g., 1 inch = exactly 0.0254 meters, 1 pound = 0.45359237 kg).
                                </p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
                                    Is my input data secure?
                                </h3>
                                <p>
                                    Yes. ConvertIO operates 100% on the client side inside your web browser. None of your entered numbers, calculations, or health statistics are ever transmitted to any remote server.
                                </p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
                                    How is BMI calculated?
                                </h3>
                                <p>
                                    Body Mass Index (BMI) is calculated following World Health Organization (WHO) formulas: weight in kilograms divided by height in meters squared (or weight in lbs multiplied by 703 divided by height in inches squared).
                                </p>
                            </div>
                            <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800">
                                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
                                    Can I use ConvertIO offline?
                                </h3>
                                <p>
                                    Once loaded, ConvertIO requires no network requests for calculations. You can bookmark and use the calculators even on spotty internet connections.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Semantic Accessible Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-500 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p>© {new Date().getFullYear()} ConvertIO. All conversion formulas are NIST and SI compliant.</p>
                    <p className="flex items-center gap-4">
                        <span>Fast</span>
                        <span>•</span>
                        <span>Accessible</span>
                        <span>•</span>
                        <span>Zero Data Tracking</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;