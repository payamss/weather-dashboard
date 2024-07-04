import React from 'react'

interface CurrentWeatherProps {
  weather: {
    temp: number
    description: string
    icon: string
  }
  city: string
  country: string
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, city, country }) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold">{city}, {country}</h2>
      <div className="flex items-center mt-4">
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@4x.png`}
          alt={weather.description}
          className="w-20 h-20"
        />
        <div className="ml-4">
          <p className="text-6xl">{weather.temp.toFixed(2)}°</p>
          <p className="capitalize text-2xl">{weather.description}</p>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
