"use client";

import { useState, useEffect } from "react";
import TodayCard from "./components/main/data_section/today_section/today_card";
import Header from "@/app/components/header";
import WeatherOverview from "./components/main/data_section/weather_overview";
import { WeatherResponse } from "./types/weather_response";
import { Daily, ForecastResponse } from "./types/forecast_response";
import Forecast from "./components/main/data_section/forecast";

const Home = () => {
  const [city, setCity] = useState<string>("Frankfurt am Main");
  const [unit, setUnit] = useState<string>("metric");
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [localWeather, setLocalWeather] = useState<IWeatherLocal | null>(null);
  const [country, setCountry] = useState<string>("");
  const [overview, setOverview] = useState<any>(null);
  const [forecast, setForecast] = useState<DailyWeather[] | null>(null);

  useEffect(() => {
    fetch(`/api/local`).then((response) => response.json())
      .then((localWeather: IWeatherLocal) => {
        setLocalWeather(localWeather);
      });
    if (city) {
      fetch(`/api/weather/${city}/?units=${unit}`)
        .then((response) => response.json())
        .then((data: WeatherResponse) => {
          fetch(
            `/api/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=${unit}`
          )
            .then((res) => res.json())
            .then((weatherData: IWeather) => {
              setForecast(weatherData.daily);
              setWeather(weatherData.current);

              // setOverview({
              //   wind: data.wind.speed,
              //   humidity: data.main.humidity,
              //   uvIndex: weatherData.current.uvi,
              //   visibility: data.visibility / 1000,
              //   sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(
              //     [],
              //     { hour: "2-digit", minute: "2-digit", hourCycle: "h24" }
              //   ),
              //   sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(
              //     [],
              //     { hour: "2-digit", minute: "2-digit", hourCycle: "h24" }
              //   ),
              //   feelsLike: data.main.feels_like,
              // });

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
            {weather && TodayCard(weather, forecast![0].temp.max, forecast![0].temp.min, localWeather!)}
          </div>
          <div className="flex flex-grow  justify-around ">
            {forecast && <Forecast forecast={forecast} />}
          </div>
        </div>
        {/* {overview && (
          <WeatherOverview
            wind={overview.wind}
            humidity={overview.humidity}
            uvIndex={overview.uvIndex}
            visibility={overview.visibility}
            sunrise={overview.sunrise}
            sunset={overview.sunset}
            feelsLike={overview.feelsLike}
          />
        )} */}
      </main>
    </div>
  );
};

export default Home;
