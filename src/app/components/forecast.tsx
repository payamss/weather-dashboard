import React from 'react'

interface ForecastProps {
  forecast: {
    dt_txt: string
    main: { temp: number }
    weather: { description: string; icon: string }[]
  }[]
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Forecast</h2>
      <div className="grid grid-cols-3 gap-4">
        {forecast.map((item, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p className="text-xl">{item.main.temp}°</p>
            <p className="capitalize">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast
