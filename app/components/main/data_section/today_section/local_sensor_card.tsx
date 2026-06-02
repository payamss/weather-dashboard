import React from 'react';
import IconValueComponent from './icon_value_component';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

interface LocalSensorCardProps {
    local: IWeatherLocal;
    unit: string;
}

const LocalSensorCard: React.FC<LocalSensorCardProps> = ({ local, unit }) => {
    const isImperial = unit === 'imperial';
    const convertedTemperature = isImperial ? (local.Temperature * 9) / 5 + 32 : local.Temperature;
    const temperatureUnit = isImperial ? '°F' : local.Temperature_unit;

    return (
        <div className='glass-panel w-80 p-5 text-white'>
            <div className='soft-title'>Home network</div>
            <div className='mb-2 mt-1 text-lg font-semibold'>Local Sensor</div>
            <hr className='border-slate-300/20'></hr>
            <div className='m-1 mt-3 grid grid-cols-2 gap-1'>
                <IconValueComponent icon={FaTemperatureHigh} value={convertedTemperature.toFixed(1)} unit={temperatureUnit} iconColor='text-red-700' />
                <IconValueComponent icon={WiHumidity} value={local.Humidity.toFixed(0)} unit={local.Humidity_unit} iconColor='text-blue-700' />
            </div>
        </div>
    );
};

export default LocalSensorCard;
