type OpenWeatherCondition = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

type OpenWeatherCurrentResponse = {
    dt: number;
    timezone: number;
    visibility: number;
    weather: OpenWeatherCondition[];
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    coord: {
        lat: number;
        lon: number;
    };
};

type OpenWeatherForecastItem = {
    dt: number;
    pop?: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    weather: OpenWeatherCondition[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
};

type OpenWeatherForecastResponse = {
    list: OpenWeatherForecastItem[];
};

type DailyAccumulator = {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    tempMin: number;
    tempMax: number;
    tempSum: number;
    tempCount: number;
    feelsLikeSum: number;
    pressure: number;
    humidity: number;
    dewPoint: number;
    windSpeed: number;
    windDeg: number;
    windGust: number;
    clouds: number;
    popMax: number;
    rain: number;
    uvi: number;
    weather: OpenWeatherCondition[];
};

export const mapCurrentWeather = (current: OpenWeatherCurrentResponse): CurrentWeather => ({
    dt: current.dt,
    sunrise: current.sys.sunrise,
    sunset: current.sys.sunset,
    temp: current.main.temp,
    feels_like: current.main.feels_like,
    pressure: current.main.pressure,
    humidity: current.main.humidity,
    dew_point: 0,
    uvi: 0,
    clouds: current.clouds.all,
    visibility: current.visibility ?? 0,
    wind_speed: current.wind.speed,
    wind_deg: current.wind.deg,
    wind_gust: current.wind.gust ?? current.wind.speed,
    weather: current.weather,
});

export const mapDailyForecast = (forecast: OpenWeatherForecastResponse): DailyWeather[] => {
    const dailyMap = new Map<string, DailyAccumulator>();

    for (const item of forecast.list) {
        const dayKey = new Date(item.dt * 1000).toISOString().split('T')[0];
        const existing = dailyMap.get(dayKey);

        if (!existing) {
            dailyMap.set(dayKey, {
                dt: item.dt,
                sunrise: 0,
                sunset: 0,
                moonrise: 0,
                moonset: 0,
                moon_phase: 0,
                tempMin: item.main.temp_min,
                tempMax: item.main.temp_max,
                tempSum: item.main.temp,
                tempCount: 1,
                feelsLikeSum: item.main.feels_like,
                pressure: item.main.pressure,
                humidity: item.main.humidity,
                dewPoint: 0,
                windSpeed: item.wind.speed,
                windDeg: item.wind.deg,
                windGust: item.wind.gust ?? item.wind.speed,
                clouds: item.clouds.all,
                popMax: item.pop ?? 0,
                rain: 0,
                uvi: 0,
                weather: item.weather,
            });
            continue;
        }

        existing.dt = Math.min(existing.dt, item.dt);
        existing.tempMin = Math.min(existing.tempMin, item.main.temp_min);
        existing.tempMax = Math.max(existing.tempMax, item.main.temp_max);
        existing.tempSum += item.main.temp;
        existing.tempCount += 1;
        existing.feelsLikeSum += item.main.feels_like;
        existing.pressure = item.main.pressure;
        existing.humidity = item.main.humidity;
        existing.windSpeed = item.wind.speed;
        existing.windDeg = item.wind.deg;
        existing.windGust = item.wind.gust ?? item.wind.speed;
        existing.clouds = item.clouds.all;
        existing.popMax = Math.max(existing.popMax, item.pop ?? 0);
        if (item.weather.length > 0) {
            existing.weather = item.weather;
        }
    }

    return Array.from(dailyMap.values())
        .sort((a, b) => a.dt - b.dt)
        .map((entry) => ({
            dt: entry.dt,
            sunrise: entry.sunrise,
            sunset: entry.sunset,
            moonrise: entry.moonrise,
            moonset: entry.moonset,
            moon_phase: entry.moon_phase,
            temp: {
                day: entry.tempSum / entry.tempCount,
                min: entry.tempMin,
                max: entry.tempMax,
                night: entry.tempSum / entry.tempCount,
                eve: entry.tempSum / entry.tempCount,
                morn: entry.tempSum / entry.tempCount,
            },
            feels_like: {
                day: entry.feelsLikeSum / entry.tempCount,
                night: entry.feelsLikeSum / entry.tempCount,
                eve: entry.feelsLikeSum / entry.tempCount,
                morn: entry.feelsLikeSum / entry.tempCount,
            },
            pressure: entry.pressure,
            humidity: entry.humidity,
            dew_point: entry.dewPoint,
            wind_speed: entry.windSpeed,
            wind_deg: entry.windDeg,
            wind_gust: entry.windGust,
            weather: entry.weather,
            clouds: entry.clouds,
            pop: entry.popMax,
            rain: entry.rain,
            uvi: entry.uvi,
        }));
};
