import React from 'react';

interface WeatherOverviewProps {
    wind: number;
    humidity: number;
    uvIndex: number;
    visibility: number;
    sunrise: string;
    sunset: string;
    feelsLike: number;
}

const WeatherOverview: React.FC<WeatherOverviewProps> = ({ wind, humidity, uvIndex, visibility, sunrise, sunset, feelsLike }) => {
    return (
        <div className='mt-4 grid grid-cols-3 gap-4 text-xs'>
            <div className='rounded-lg bg-gray-800 p-4 text-white shadow-md'>
                <h3 className='font-bold'>Wind Status</h3>
                <p>{wind} km/h</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4 text-white shadow-md'>
                <h3 className='font-bold'>UV Index</h3>
                <p>{uvIndex.toFixed(0)}</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4 text-white shadow-md'>
                <h3 className='font-bold'>Humidity</h3>
                <p>{humidity}%</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4 text-white shadow-md'>
                <h3 className='font-bold'>Visibility</h3>
                <p>{visibility} km</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4 text-white shadow-md'>
                <h3 className='font-bold'>Sunrise</h3>
                <p>{sunrise}</p>
            </div>
            <div className='rounded-lg bg-gray-800 p-4 text-white shadow-md'>
                <h3 className='font-bold'>Sunset</h3>
                <p>{sunset}</p>
            </div>
            <div className='col-span-2 rounded-lg bg-gray-800 p-4 text-white shadow-md'>
                <h3 className='font-bold'>Feels Like</h3>
                <p>{feelsLike.toFixed(1)}°C</p>
            </div>
        </div>
    );
};

export default WeatherOverview;
