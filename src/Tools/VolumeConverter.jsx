import { Droplet } from 'lucide-react';
import ConverterCard from '../Components/ConverterCard';
import { convertVolume, volumeUnits } from '../Utils/Conversionlogic';

const volumeUnitList = Object.entries(volumeUnits).map(([key, data]) => ({
    key,
    label: data.name,
    symbol: data.symbol
}));

const VolumeConverter = () => {
    return (
        <ConverterCard
            id="volume-converter"
            title="Volume Converter"
            description="Convert between liquid and cubic capacity units"
            icon={Droplet}
            units={volumeUnitList}
            convertFn={convertVolume}
            defaultFrom="liters"
            defaultTo="gallons"
            defaultValue={1}
            allowNegative={false}
            maxDecimals={4}
        />
    );
};

export default VolumeConverter;
