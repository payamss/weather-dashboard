import { ErrorResponse } from '@/app/types/error_response';
import { WeatherResponse } from '@/app/types/weather_response';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { city: string } }) {
    const { city } = params;
    const units = new URL(request.url).searchParams.get('units') || 'metric';
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city || !apiKey) {
        const errorResponse: ErrorResponse = {
            error: 'City and API key are required',
        };
        return NextResponse.json(errorResponse, { status: 400 });
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?q=${city}&units=${units}&appid=${apiKey}`);
    const data = await response.json();

    if (response.ok) {
        const weatherData: WeatherResponse = data;
        return NextResponse.json(weatherData);
    } else {
        const errorResponse: ErrorResponse = { error: data.message };
        return NextResponse.json(errorResponse, { status: response.status });
    }
}
