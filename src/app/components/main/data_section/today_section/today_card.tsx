import React from 'react';
import Image from 'next/image';
import Timer from './timer';
import IconValueComponent from './icon_value_component';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { PiGaugeBold } from 'react-icons/pi';
import { FaLocationArrow, FaWind } from 'react-icons/fa6';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { TbUvIndex } from 'react-icons/tb';
import { MdVisibility } from 'react-icons/md';
function TodayCard(weather: CurrentWeather, high: number, low: number) {
    return (
        <div className='glass-panel w-80 p-5 text-white'>
            <div className='mb-3 flex items-center justify-between'>
                <div className='text-lg font-semibold'>
                    {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
                        weekday: 'short',
                    })}
                </div>
                <div className='rounded-lg border border-slate-300/20 bg-slate-950/40 px-2 py-1 text-lg font-bold'>
                    <Timer />
                </div>
            </div>
            <hr className='border-slate-300/20'></hr>

            <div className='mt-3 flex items-center justify-between'>
                <div className='grid-row-2 grid text-xs'>
                    <div className='inline-block w-fit pr-2 text-5xl font-bold leading-[1.08] text-sky-100 [text-shadow:0_1px_12px_rgba(125,211,252,0.2)]'>{weather.temp.toFixed(1)}°</div>
                    <div className='text-xs text-slate-300'>Feels like {weather.feels_like.toFixed(1)}°</div>
                </div>
                <div className='grid-row-2 grid text-center align-middle text-xs'>
                    <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description} width={64} height={64} />
                    <div className='text-xs capitalize text-slate-200'>{weather.weather[0].description}</div>
                </div>
            </div>
            <div className='m-1 mt-4 grid grid-cols-2 gap-1'>
                <IconValueComponent icon={FaTemperatureLow} value={low.toString()} unit='°' iconColor='text-green-300' />
                <IconValueComponent icon={FaTemperatureHigh} value={high.toString()} unit='°' iconColor='text-red-400' />
            </div>

            <div className='m-1 grid grid-cols-2 gap-1'>
                <IconValueComponent icon={PiGaugeBold} value={weather.pressure.toString()} unit='Mpa' iconColor='text-blue-700' />
                <IconValueComponent icon={WiHumidity} value={weather.humidity.toString()} unit='%' iconColor='text-blue-700' />
            </div>
            <div className='m-1 grid grid-cols-2 gap-1'>
                <IconValueComponent icon={FaWind} value={weather.wind_speed.toString()} unit='km/h' iconColor='text-blue-700' />
                <IconValueComponent icon={FaLocationArrow} value={weather.wind_deg.toString()} unit='°' iconColor='text-blue-700' iconStyle={{ transform: `rotate(${weather.wind_deg - 45}deg)` }} />
            </div>
            <div className='m-1 grid grid-cols-2 gap-1'>
                <IconValueComponent icon={TbUvIndex} value={weather.uvi.toString()} unit='' iconColor='text-orange-700' />
                <IconValueComponent icon={MdVisibility} value={(weather.visibility / 1000).toString()} unit=' km' iconColor='text-blue-700' />
            </div>
            <div className='m-1 grid grid-cols-2 gap-1'>
                <IconValueComponent
                    icon={FiSunrise}
                    value={new Date(weather.sunrise * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hourCycle: 'h24',
                    })}
                    unit=''
                    iconColor='text-yellow-200'
                />
                <IconValueComponent
                    icon={FiSunset}
                    value={new Date(weather.sunset * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hourCycle: 'h24',
                    })}
                    unit=''
                    iconColor='text-yellow-200'
                />
            </div>
        </div>
    );
}

export default TodayCard;
