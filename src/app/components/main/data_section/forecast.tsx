import React from 'react';
import { Daily } from '@/app/types/forecast_response';
import Image from 'next/image';

interface ForecastProps {
    forecast: Daily[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
    return (
        <div className='flex w-full flex-wrap items-stretch justify-center gap-3 text-white'>
            {forecast.slice(1, 7).map((item, index) => (
                <div key={index} className='glass-panel w-[96px] p-3 text-center transition duration-200 hover:-translate-y-0.5 hover:border-sky-300/30 sm:w-[110px]'>
                    <p className='text-xs uppercase tracking-[0.12em] text-sky-100/85'>
                        {new Date(item.dt * 1000).toLocaleDateString('en-US', {
                            weekday: 'short',
                        })}
                    </p>
                    <hr className='mt-2 h-px border-0 bg-slate-300/20'></hr>

                    <Image className='mx-auto mt-1' src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} width={52} height={52} />

                    <div className='mt-1 text-lg font-bold text-slate-100'>{item.temp.day.toFixed(0)}°</div>
                    <div className='text-xs text-slate-300'>
                        ({item.temp.min.toFixed(0)}/{item.temp.max.toFixed(0)})
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Forecast;
