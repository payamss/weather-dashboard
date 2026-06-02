'use client';

import { useState, useEffect, useCallback } from 'react';
import TodayCard from '../components/main/data_section/today_section/today_card';
import Header from '@/app/components/header';
import { WeatherResponse } from '../types/weather_response';
import Forecast from '../components/main/data_section/forecast';
import LocalSensorCard from '../components/main/data_section/today_section/local_sensor_card';

const Home = () => {
    const [city, setCity] = useState<string>('Frankfurt am Main');
    const [unit, setUnit] = useState<string>('metric');
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [localWeather, setLocalWeather] = useState<IWeatherLocal | null>(null);
    const [, setCountry] = useState<string>('');
    const [cityId, setId] = useState<number>();
    const [forecast, setForecast] = useState<DailyWeather[] | null>(null);
    const [weatherError, setWeatherError] = useState<string | null>(null);
    const [localError, setLocalError] = useState<string | null>(null);
    const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false);
    const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);

    const fetchWeatherData = useCallback(async () => {
        setIsLocalLoading(true);
        setIsWeatherLoading(true);
        setLocalError(null);
        setWeatherError(null);

        try {
            const localResponse = await fetch('/api/local');
            const localData = await localResponse.json();
            if (!localResponse.ok) {
                throw new Error(localData.error ?? 'Failed to fetch local sensor data');
            }
            setLocalWeather(localData as IWeatherLocal);
        } catch (error) {
            const localMessage = error instanceof Error ? error.message : 'Failed to fetch local sensor data';
            setLocalError(localMessage);
        } finally {
            setIsLocalLoading(false);
        }

        if (!city) {
            setIsWeatherLoading(false);
            return;
        }

        try {
            const weatherResponse = await fetch(`/api/weather/${city}/?units=${unit}`);
            const weatherData = await weatherResponse.json();
            if (!weatherResponse.ok) {
                throw new Error(weatherData.error ?? 'Failed to fetch weather location data');
            }

            const locationData = weatherData as WeatherResponse;
            const bundleResponse = await fetch(`/api/weather-bundle?lat=${locationData.coord.lat}&lon=${locationData.coord.lon}&units=${unit}`);
            const bundleData = await bundleResponse.json();

            if (!bundleResponse.ok) {
                throw new Error(bundleData.error ?? 'Failed to fetch weather details');
            }

            const mappedWeather = bundleData as IWeather;
            setForecast(mappedWeather.daily);
            setWeather(mappedWeather.current);
            setCountry(locationData.sys.country);
            setId(locationData.id);
        } catch (error) {
            setWeather(null);
            setForecast(null);
            const weatherMessage = error instanceof Error ? error.message : 'OpenWeather request failed';
            setWeatherError(weatherMessage);
        } finally {
            setIsWeatherLoading(false);
        }
    }, [city, unit]);

    useEffect(() => {
        fetchWeatherData();

        const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [fetchWeatherData]);

    return (
        <div className='flex min-h-screen flex-col font-[var(--font-source-sans)] text-slate-100'>
            <Header city={city} setCity={setCity} unit={unit} setUnit={setUnit} />

            <main className='mx-3 mb-6 mt-4 justify-center align-middle'>
                {weatherError && (
                    <div className='glass-panel mx-2 my-2 border-yellow-300/35 bg-yellow-900/40 p-3 text-sm text-yellow-100'>
                        OpenWeather unavailable: {weatherError}. Showing local sensor data when available.
                    </div>
                )}
                {localError && <div className='glass-panel mx-2 my-2 border-red-300/35 bg-red-900/40 p-3 text-sm text-red-100'>Local sensor unavailable: {localError}</div>}
                <div className='flex flex-col justify-center gap-2 xl:flex-row'>
                    <div className='mx-2 my-3 flex items-start justify-center'>
                        {isLocalLoading && <div className='glass-panel w-80 p-4 text-center text-white'>Loading local sensor...</div>}
                        {!isLocalLoading && localWeather && <LocalSensorCard local={localWeather} unit={unit} />}
                    </div>
                    <a href={`https://openweathermap.org/city/${cityId}`} target='_blank' rel='noopener noreferrer'>
                        <div className='mx-2 my-3 flex items-start justify-center'>{weather && forecast?.[0] && TodayCard(weather, forecast[0].temp.max, forecast[0].temp.min)}</div>
                    </a>
                    <div className='mx-2 my-3 flex flex-grow items-start justify-around'>
                        {isWeatherLoading ? <div className='glass-panel p-4 text-white'>Loading weather forecast...</div> : forecast && <Forecast forecast={forecast} />}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
