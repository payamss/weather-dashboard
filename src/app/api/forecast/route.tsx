import { ErrorResponse } from "@/app/types/error_response";
import { ForecastResponse } from "@/app/types/forecast_response";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const units = searchParams.get("units") || "metric";
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "API key is required" }, { status: 400 });
    }

    if (!city && (!lat || !lon)) {
        const errorResponse: ErrorResponse = {
            error: "City or Latitude and Longitude are required",
        };
        return NextResponse.json(errorResponse, { status: 400 });
    }

    let url: string;
    if (city) {
        url = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&units=${units}&appid=${apiKey}`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
        const forecastData: ForecastResponse = data;
        return NextResponse.json(forecastData);
    } else {
        const errorResponse: ErrorResponse = { error: data.message };
        return NextResponse.json(errorResponse, { status: response.status });
    }
}
