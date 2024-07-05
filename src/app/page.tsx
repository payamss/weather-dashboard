"use client";

import { useState, useEffect } from "react";
import CurrentWeather from "./components/main/data_section/current_weather";
import Header from "@/app/components/header";
import WeatherOverview from "./components/main/data_section/weather_overview";
import { WeatherResponse } from "./types/weather_response";
import { Daily, ForecastResponse } from "./types/forecast_response";
import Forecast from "./components/main/data_section/forecast";

const Home = () => {
  const [city, setCity] = useState<string>("Berlin");
  const [unit, setUnit] = useState<string>("metric");
  const [weather, setWeather] = useState<any>(null);
  const [country, setCountry] = useState<string>("");
  const [overview, setOverview] = useState<any>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);

  useEffect(() => {
    if (city) {
      fetch(`/api/weather/${city}/?units=${unit}`)
        .then((response) => response.json())
        .then((data: WeatherResponse) => {
          fetch(
            `/api/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=${unit}`
          )
            .then((res) => res.json())
            .then((forecastData: ForecastResponse) => {
              setForecast(forecastData);

              setWeather({
                temp: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
              });

              setOverview({
                wind: data.wind.speed,
                humidity: data.main.humidity,
                uvIndex: forecastData.daily[0].uvi,
                visibility: data.visibility / 1000,
                sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                feelsLike: data.main.feels_like,
              });

              setCountry(data.sys.country);
            })
            .catch((error) =>
              console.error("Error fetching weather c data:", error)
            );
        })
        .catch((error) =>
          console.error("Error fetching weather c data:", error)
        );
    }
  }, [city, unit]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 ">
      <Header city={city} setCity={setCity} unit={unit} setUnit={setUnit} />

      <main className="flex-grow m-3">
        <div className="flex flex-row justify-between">
          <div className="flex">
            {weather && (
              <CurrentWeather weather={weather} city={city} country={country} />
            )}
          </div>
          <div className="flex flex-grow  justify-around ">
            {forecast && <Forecast forecast={forecast.daily} />}
          </div>
        </div>
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
      </main>
    </div>
  );
};

export default Home;
