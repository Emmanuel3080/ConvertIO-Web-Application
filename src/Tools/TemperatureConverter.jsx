import { Thermometer } from 'lucide-react';
import ConverterCard from '../Components/ConverterCard';
import { convertTemperature } from '../Utils/Conversionlogic';

const temperatureUnitList = [
    { key: 'Celsius', label: 'Celsius', symbol: '°C' },
    { key: 'Fahrenheit', label: 'Fahrenheit', symbol: '°F' },
    { key: 'Kelvin', label: 'Kelvin', symbol: 'K' }
];

const TemperatureConverter = () => {
    return (
        <ConverterCard
            id="temperature-converter"
            title="Temperature Converter"
            description="Convert across Celsius, Fahrenheit, and Kelvin scales"
            icon={Thermometer}
            units={temperatureUnitList}
            convertFn={convertTemperature}
            defaultFrom="Celsius"
            defaultTo="Fahrenheit"
            defaultValue={25}
            allowNegative={true}
            maxDecimals={2}
        />
    );
};

export default TemperatureConverter;