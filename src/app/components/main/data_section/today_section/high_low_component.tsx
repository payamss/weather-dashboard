// components/WindComponent.tsx
import React from 'react';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
interface PrHuComponentProps {
    h: number;
    l: number;
}

const HighLow: React.FC<PrHuComponentProps> = ({ h, l }) => {
    return (
        <div className='flex-col-4 m-4 flex items-center justify-between text-center align-middle text-xs'>
            <div className='text-xl text-red-700'>
                <FaTemperatureHigh />{' '}
            </div>
            <div className='text-xs font-bold text-red-700'>{h}°</div>
            <div className='text-xl text-blue-700'>
                <FaTemperatureLow />{' '}
            </div>
            <div className='text-xs font-bold text-blue-700'>{l}°</div>
        </div>
    );
};

export default HighLow;
