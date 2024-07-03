import React from 'react'
import { Daily } from '@/app/types/forecast_response'


interface ForecastProps {
  forecast: Daily[]
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Weekly Forecast</h2>
      <div className="grid grid-cols-7 gap-4">
        {forecast.slice(0, 7).map((item, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg text-center">
            <p>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="mx-auto"
            />
            <p className="text-lg">{item.temp.day.toFixed(0)}°</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
