import { ErrorResponse } from '@/app/types/error_response';
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

    const url: string = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    const response = await fetch(url);
    const res = await response.json();

    if (response.ok) {
        const data: IWeather = res;
        return NextResponse.json(data);
    } else {
        const errorResponse: ErrorResponse = { error: res.message };
        return NextResponse.json(errorResponse, { status: response.status });
    }
}
