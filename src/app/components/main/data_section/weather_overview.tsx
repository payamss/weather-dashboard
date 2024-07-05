import React from 'react'

interface WeatherOverviewProps {
  wind: number
  humidity: number
  uvIndex: number
  visibility: number
  sunrise: string
  sunset: string
  feelsLike: number
}

const WeatherOverview: React.FC<WeatherOverviewProps> = ({
  wind,
  humidity,
  uvIndex,
  visibility,
  sunrise,
  sunset,
  feelsLike,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold">Wind Status</h3>
        <p>{wind} km/h</p>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold">UV Index</h3>
        <p>{uvIndex.toFixed(0)}</p>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold">Humidity</h3>
        <p>{humidity}%</p>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold">Visibility</h3>
        <p>{visibility} km</p>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold">Sunrise</h3>
        <p>{sunrise}</p>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold">Sunset</h3>
        <p>{sunset}</p>
      </div>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md col-span-2">
        <h3 className="font-bold">Feels Like</h3>
        <p>{feelsLike.toFixed(1)}°C</p>
      </div>
    </div>
  )
}

export default WeatherOverview
