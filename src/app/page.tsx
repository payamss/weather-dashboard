'use client';

import { useState, useEffect, useCallback } from 'react';
import TodayCard from './components/main/data_section/today_section/today_card';
import Header from '@/app/components/header';
import { WeatherResponse } from './types/weather_response';
import Forecast from './components/main/data_section/forecast';

const Home = () => {
    const [city, setCity] = useState<string>('Frankfurt am Main');
    const [unit, setUnit] = useState<string>('metric');
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [localWeather, setLocalWeather] = useState<IWeatherLocal | null>(null);
    const [, setCountry] = useState<string>('');
    const [cityId, setId] = useState<number>();
    const [forecast, setForecast] = useState<DailyWeather[] | null>(null);

    const fetchWeatherData = useCallback(() => {
        fetch('/api/local')
            .then((response) => response.json())
            .then((localWeather: IWeatherLocal) => {
                setLocalWeather(localWeather);
            });

        if (city) {
            fetch(`/api/weather/${city}/?units=${unit}`)
                .then((response) => response.json())
                .then((data: WeatherResponse) => {
                    fetch(`/api/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=${unit}`)
                        .then((res) => res.json())
                        .then((weatherData: IWeather) => {
                            setForecast(weatherData.daily);
                            setWeather(weatherData.current);
                            setCountry(data.sys.country);
                            setId(data.id);
                        })
                        .catch((error) => console.error('Error fetching weather data:', error));
                })
                .catch((error) => console.error('Error fetching weather data:', error));
        }
    }, [city, unit]);

    useEffect(() => {
        fetchWeatherData(); // Initial fetch

        const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000); // Auto-refresh every 30 min

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [fetchWeatherData]);

    return (
        <div className='flex min-h-screen flex-col bg-gray-900'>
            <Header city={city} setCity={setCity} unit={unit} setUnit={setUnit} />

            <main className='m-3 justify-center align-middle'>
                <div className='flex flex-col justify-center md:flex-row'>
                    <a href={`https://openweathermap.org/city/${cityId}`} target='_blank' rel='noopener noreferrer'>
                        <div className='mx-5 my-5 flex justify-center'>{weather && TodayCard(weather, forecast![0].temp.max, forecast![0].temp.min, localWeather!)}</div>
                    </a>
                    <div className='flex flex-grow justify-around'>{forecast && <Forecast forecast={forecast} />}</div>
                </div>
            </main>
        </div>
    );
};

export default Home;
