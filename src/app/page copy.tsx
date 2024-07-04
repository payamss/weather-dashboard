'use client'

import { useState, useEffect } from 'react'
import CurrentWeather from './components/main/data_section/current_weather'
import Forecast from './components/main/data_section/forecast'
import UnitSelector from './components/main/unit_selectore'
import WeatherOverview from './components/main/data_section/weather_overview'
import { ForecastResponse } from './types/forecast_response'
import { WeatherResponse } from './types/weather_response'


const Home = () => {
  const [city, setCity] = useState<string>('')
  const [unit, setUnit] = useState<string>('metric')
  const [currentWeather, setCurrentWeather] = useState<WeatherResponse | null>(null)
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [overview, setOverview] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [lat, setLat] = useState<number | null>(null)
  const [lon, setLon] = useState<number | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      })
    }
  }, [])

  useEffect(() => {
    if (lat && lon) {
      fetchWeatherByCoords(lat, lon)
    } else {
      fetchWeatherByCity(city)
    }
  }, [city, lat, lon, unit])

  const fetchWeatherByCity = async (city: string) => {
    try {
      const weatherResponse = await fetch(`/api/weather/${city}/?units=${unit}`)
      const weatherData = await weatherResponse.json()

      const forecastResponse = await fetch(`/api/forecast/${city}?units=${unit}`)
      const forecastData = await forecastResponse.json()

      if (weatherResponse.ok && forecastResponse.ok) {
        setCurrentWeather(weatherData)
        setForecast(forecastData)

        setOverview({
          wind: weatherData.wind.speed,
          humidity: weatherData.main.humidity,
          uvIndex: 5.5, // Replace with actual UV Index data if available
          visibility: weatherData.visibility / 1000,
          sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
          feelsLike: weatherData.main.feels_like,
        })

        setError(null)
      } else {
        setError(weatherData.error || forecastData.message)
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

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      const weatherResponse = await fetch(`/api/weather?lat=${lat}&lon=${lon}&units=${unit}`)
      const weatherData = await weatherResponse.json()

      const forecastResponse = await fetch(`/api/forecast?lat=${lat}&lon=${lon}&units=${unit}`)
      const forecastData = await forecastResponse.json()

      if (weatherResponse.ok && forecastResponse.ok) {
        setCurrentWeather(weatherData)
        setForecast(forecastData)

        setOverview({
          wind: weatherData.wind.speed,
          humidity: weatherData.main.humidity,
          uvIndex: 5.5, // Replace with actual UV Index data if available
          visibility: weatherData.visibility / 1000,
          sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
          feelsLike: weatherData.main.feels_like,
        })

        setError(null)
      } else {
        setError(weatherData.error || forecastData.message)
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

  const handleCitySearch = () => {
    setLat(null)
    setLon(null)
    fetchWeatherByCity(city)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8  ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <UnitSelector unit={unit} setUnit={setUnit} />
          <div className="flex mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-2 rounded-l-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Search city"
            />
            <button
              onClick={handleCitySearch}
              className="p-2 bg-blue-600 rounded-r-lg text-white"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {currentWeather && (
            <CurrentWeather
              weather={{
                temp: currentWeather.main.temp,
                description: currentWeather.weather[0].description,
                icon: currentWeather.weather[0].icon,
              }}
              city={currentWeather.name}
              country={currentWeather.sys.country}
            />
          )}
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
        <div className="col-span-1">
          {forecast && <Forecast forecast={forecast.daily} />}
        </div>
      </div>
    </div>
  )
}

export default Home
