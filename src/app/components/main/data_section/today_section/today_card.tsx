import React from 'react';
import Image from 'next/image';
import Timer from './timer';
import IconValueComponent from './icon_value_component';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { PiGaugeBold } from 'react-icons/pi';
import { FaLocationArrow, FaWind } from 'react-icons/fa6';
import { FiSunrise, FiSunset } from 'react-icons/fi';

function TodayCard(weather: CurrentWeather, high: number, low: number, local: IWeatherLocal) {
    return (
        <div className="bg-gray-500 text-white p-4 rounded-3xl w-80">
            <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold">
                    {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
                        weekday: 'short',
                    })}
                </div>
                <div className="text-lg font-bold">
                    <Timer />
                </div>
            </div>
            <hr></hr>

            <div className="grid grid-cols-2 m-1">
                <IconValueComponent icon={FaTemperatureHigh} value={local.Temperature.toString()} unit={local.Temperature_unit} iconColor="text-red-700" />
                <IconValueComponent icon={WiHumidity} value={local.Humidity.toString()} unit={local.Humidity_unit} iconColor="text-blue-700" />
            </div>
            <hr></hr>
            <div className="flex items-center justify-between">
                <div className="grid grid-row-2  text-xs">
                    <div className="grid grid-cols-2">
                        <div className="text-5xl font-bold w-auto">{weather.temp.toFixed(1)}° </div>
                    </div>
                    <div className="text-xs">Feel: {weather.feels_like.toFixed(1)}°</div>
                </div>
                <div className="grid grid-row-2 text-xs align-middle text-center">
                    <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description} width={50} height={50} />
                    <div className="text-xs">{weather.weather[0].description}</div>
                </div>
            </div>
            <div className="grid grid-cols-2 m-1">
                <IconValueComponent icon={FaTemperatureHigh} value={high.toString()} unit="°" iconColor="text-orange-600" />
                <IconValueComponent icon={FaTemperatureLow} value={low.toString()} unit="°" iconColor="text-pink-900" />
            </div>

            <div className="grid grid-cols-2 m-1">
                <IconValueComponent icon={PiGaugeBold} value={weather.pressure.toString()} unit="Mpa" iconColor="text-yellow-600" />
                <IconValueComponent icon={WiHumidity} value={weather.humidity.toString()} unit={local.Humidity_unit} iconColor="text-blue-700" />
            </div>
            <div className="grid grid-cols-2 m-1">
                <IconValueComponent icon={FaWind} value={weather.wind_speed.toString()} unit="km/h" iconColor="text-red-700" />
                <IconValueComponent icon={FaLocationArrow} value={weather.wind_deg.toString()} unit="°" iconColor="text-blue-700" iconStyle={{ transform: `rotate(${weather.wind_deg - 45}deg)` }} />
            </div>
            <div className="grid grid-cols-2 m-1">
                <IconValueComponent
                    icon={FiSunrise}
                    value={new Date(weather.sunrise * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hourCycle: 'h24',
                    })}
                    unit=""
                    iconColor="text-orange-600"
                />
                <IconValueComponent
                    icon={FiSunset}
                    value={new Date(weather.sunset * 1000).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hourCycle: 'h24',
                    })}
                    unit=""
                    iconColor="text-pink-900"
                />
            </div>
        </div>
    );
}

export default TodayCard;
