import React from 'react';

interface TemperatureGraphProps {
    temperatures: { time: string; temp: number }[];
}

const TemperatureGraph: React.FC<TemperatureGraphProps> = ({ temperatures }) => {
    return (
        <div className='mt-4 rounded-lg bg-gray-800 p-6 text-white shadow-md'>
            <h3 className='font-bold'>Temperature</h3>
            <div className='mt-4'>
                {temperatures.map((item, index) => (
                    <div key={index} className='flex justify-between'>
                        <span>{item.time}</span>
                        <span>{item.temp}°C</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemperatureGraph;
