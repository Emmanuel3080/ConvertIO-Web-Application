import { Scale } from 'lucide-react';
import ConverterCard from '../Components/ConverterCard';
import { convertWeight, weightUnits } from '../Utils/Conversionlogic';

const weightUnitList = Object.entries(weightUnits).map(([key, data]) => ({
    key,
    label: data.name,
    symbol: data.symbol
}));

const WeightConverter = () => {
    return (
        <ConverterCard
            id="weight-converter"
            title="Weight Converter"
            description="Convert between metric and imperial mass units"
            icon={Scale}
            units={weightUnitList}
            convertFn={convertWeight}
            defaultFrom="kilograms"
            defaultTo="pounds"
            defaultValue={1}
            allowNegative={false}
            maxDecimals={4}
        />
    );
};

export default WeightConverter;