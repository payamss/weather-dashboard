import React from 'react'

interface CurrentWeatherProps {
  weather: {
    temp: number
    description: string
    icon: string
  }
  city: string
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, city }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold">{city}</h2>
      <div className="flex items-center mt-4">
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
        <div>
          <p className="text-6xl">{weather.temp}°</p>
          <p className="capitalize">{weather.description}</p>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
