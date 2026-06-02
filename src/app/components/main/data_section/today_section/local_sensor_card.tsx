import React from 'react';
import IconValueComponent from './icon_value_component';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

interface LocalSensorCardProps {
    local: IWeatherLocal;
}

const LocalSensorCard: React.FC<LocalSensorCardProps> = ({ local }) => {
    return (
        <div className='w-80 rounded-3xl bg-gray-500 p-4 text-white'>
            <div className='mb-2 text-lg font-semibold'>Home Sensor</div>
            <hr></hr>
            <div className='m-1 grid grid-cols-2'>
                <IconValueComponent icon={FaTemperatureHigh} value={local.Temperature.toFixed(1)} unit={local.Temperature_unit} iconColor='text-red-700' />
                <IconValueComponent icon={WiHumidity} value={local.Humidity.toFixed(0)} unit={local.Humidity_unit} iconColor='text-blue-700' />
            </div>
        </div>
    );
};

export default LocalSensorCard;
