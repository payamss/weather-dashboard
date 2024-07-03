'use client'

import { useState, useEffect } from 'react'
import CurrentWeather from './components/current_weather'
import Forecast from './components/forecast'
import WeatherOverview from './components/weather_overview'
import { WeatherResponse } from './types/weather_response'
import UnitSelector from './components/unit_selectore'
const Home = () => {
  const [city, setCity] = useState<string>('London')
  const [unit, setUnit] = useState<string>('metric')
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse | null>(null)
  const [forecast, setForecast] = useState<any>(null)
  const [overview, setOverview] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?city=${city}&units=${unit}`)
        const data = await response.json()

        if (response.ok) {
          setCurrentWeather(data)

          // Mock forecast data, replace with actual forecast API call if needed
          setForecast(Array(7).fill(data))

          setOverview({
            wind: data.wind.speed,
            humidity: data.main.humidity,
            uvIndex: 5.5, // Replace with actual UV Index data if available
            visibility: data.visibility / 1000,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
            feelsLike: data.main.feels_like,
          })

          setError(null)
        } else {
          setError(data.error)
          setCurrentWeather(null)
          setForecast(null)
          setOverview(null)
        }
      } catch (error) {
        setError('An unexpected error occurred.')
        setCurrentWeather(null)
        setForecast(null)
        setOverview(null)
      }
    }

    fetchWeather()
  }, [city, unit])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <UnitSelector unit={unit} setUnit={setUnit} />
        {error && <p className="text-red-500">{error}</p>}
        {currentWeather && (
          <CurrentWeather
            weather={{
              temp: currentWeather.main.temp,
              description: currentWeather.weather[0].description,
              icon: currentWeather.weather[0].icon,
            }}
            city={currentWeather.name}
          />
        )}
        {forecast && <Forecast forecast={forecast} />}
        {overview && (
          <WeatherOverview
            wind={overview.wind}
            humidity={overview.humidity}
            uvIndex={overview.uvIndex}
            visibility={overview.visibility}
            sunrise={overview.sunrise}
            sunset={overview.sunset}
            feelsLike={overview.feelsLike}
          />
        )}
      </div>
    </div>
  )
}

export default Home