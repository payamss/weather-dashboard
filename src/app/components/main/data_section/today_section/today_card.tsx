import React from 'react';
import Image from 'next/image';
import WindComponent from './wind_component';
import PrHuComponent from './pressure_humidity_component';
import SunComponent from './sun_component';
import HighLow from './high_low_component';
import Timer from './timer';

function TodayCard(weather: CurrentWeather, high: number, low: number, local: IWeatherLocal) {
    return (
        <div className="bg-gray-500 text-white p-2 rounded-3xl w-60">
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

            <div className="flex items-center justify-between">
                <div className="grid grid-row-2  text-xs">
                    <div className="grid grid-cols-2">
                        <div className="text-5xl font-bold w-auto">{weather.temp.toFixed(1)}° </div>
                        <div className="text-sm font-bold">
                            ({local.Temperature}
                            {local.Temperature_unit})
                        </div>
                    </div>
                    <div className="text-xs">Feel: {weather.feels_like.toFixed(1)}°</div>
                </div>
                <div className="grid grid-row-2 text-xs align-middle text-center">
                    <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description} width={50} height={50} />
                    <div className="text-xs">{weather.weather[0].description}</div>
                </div>
            </div>
            <div className="grid grid-cols-2 m-1">
                <div className=""></div>
                <div className="">
                    {local.Humidity}
                    {local.Humidity_unit}
                </div>
            </div>
            <div className="py-2">
                <HighLow h={high} l={low} />
                <WindComponent windSpeed={weather.wind_speed} windDeg={weather.wind_deg} />
                <PrHuComponent pressure={weather.pressure} humidity={weather.humidity} />
                <SunComponent sunrise={weather.sunrise} sunset={weather.sunset} />
            </div>
        </div>
    );
}

export default TodayCard;
