import { ErrorResponse } from '@/app/types/error_response';
import { mapCurrentWeather, mapDailyForecast } from '@/lib/openweather-mappers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const units = searchParams.get('units') || 'metric';
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    if (!lat || !lon) {
        const errorResponse: ErrorResponse = {
            error: 'Latitude and Longitude are required',
        };
        return NextResponse.json(errorResponse, { status: 400 });
    }

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    const [currentResponse, forecastResponse] = await Promise.all([fetch(currentUrl), fetch(forecastUrl)]);
    const currentJson = await currentResponse.json();
    const forecastJson = await forecastResponse.json();

    if (!currentResponse.ok) {
        const errorResponse: ErrorResponse = { error: currentJson.message ?? 'Failed to fetch current weather' };
        return NextResponse.json(errorResponse, { status: currentResponse.status });
    }

    if (!forecastResponse.ok) {
        const errorResponse: ErrorResponse = { error: forecastJson.message ?? 'Failed to fetch weather forecast' };
        return NextResponse.json(errorResponse, { status: forecastResponse.status });
    }

    return NextResponse.json({
        current: mapCurrentWeather(currentJson),
        daily: mapDailyForecast(forecastJson),
    });
}
