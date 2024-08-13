import React from 'react';
import { Daily } from '@/app/types/forecast_response';
import Image from 'next/image';

interface ForecastProps {
    forecast: Daily[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
    return (
        <div className='grid grid-cols-3 items-center justify-center gap-4 text-white sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7'>
            {forecast.slice(1, 7).map((item, index) => (
                <div key={index} className='max-h-full rounded-lg bg-gray-700 p-3 text-center'>
                    <p className='text-xs'>
                        {new Date(item.dt * 1000).toLocaleDateString('en-US', {
                            weekday: 'short',
                        })}
                    </p>
                    <hr className='py-0.25 mt-2 h-px border-0 dark:bg-gray-500'></hr>

                    <Image src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} width={50} height={50} />

                    <div className='mt-2 text-lg font-bold'>{item.temp.day.toFixed(0)}°</div>
                    <div className='text-xs'>
                        ({item.temp.min.toFixed(0)}/{item.temp.max.toFixed(0)})
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Forecast;
