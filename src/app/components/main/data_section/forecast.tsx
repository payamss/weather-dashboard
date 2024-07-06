import React from 'react'
import { Daily } from '@/app/types/forecast_response'


interface ForecastProps {
  forecast: Daily[]
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (

      <div className=" flex flex-grow grid grid-cols-7 gap-4 px-5 py-10 text-l font-bold text-white  ">
        {forecast.slice(0, 7).map((item, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg text-center">
            <p className='text-xs'>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <hr className="h-px mt-2 py-0.25  border-0 dark:bg-gray-500"></hr>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="mx-auto"
            />
            <p className="text-xl">{item.temp.day.toFixed(0)}°</p>
          </div>
        ))}
      </div>

  )
}

export default Forecast
