import React from 'react';
import { Daily } from '@/app/types/forecast_response';

interface ForecastProps {
    forecast: Daily[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
    return (
        <div className='text-l grid grid-cols-3 gap-4 px-5 py-20 font-bold text-white sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7'>
            {forecast.slice(1, 7).map((item, index) => (
                <div key={index} className='rounded-lg bg-gray-700 p-4 text-center'>
                    <p className='text-xs'>
                        {new Date(item.dt * 1000).toLocaleDateString('en-US', {
                            weekday: 'short',
                        })}
                    </p>
                    <hr className='py-0.25 mt-2 h-px border-0 dark:bg-gray-500'></hr>
                    <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} className='mx-auto' />
                    <p className='text-xl'>{item.temp.day.toFixed(0)}°</p>
                </div>
            ))}
        </div>
    );
};

export default Forecast;
