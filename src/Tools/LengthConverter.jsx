import { Ruler } from 'lucide-react';
import ConverterCard from '../Components/ConverterCard';
import { convertLength, lengthUnits } from '../Utils/Conversionlogic';

const lengthUnitList = Object.entries(lengthUnits).map(([key, data]) => ({
    key,
    label: data.name,
    symbol: data.symbol
}));

const LengthConverter = () => {
    return (
        <ConverterCard
            id="length-converter"
            title="Length Converter"
            description="Convert between metric and imperial distance units"
            icon={Ruler}
            units={lengthUnitList}
            convertFn={convertLength}
            defaultFrom="meters"
            defaultTo="feet"
            defaultValue={1}
            allowNegative={false}
            maxDecimals={4}
        />
    );
};

export default LengthConverter;
