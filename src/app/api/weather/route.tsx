import { ErrorResponse } from '@/app/types/error_response'
import { WeatherResponse } from '@/app/types/weather_response'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const units = searchParams.get('units') || 'metric'

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!city || !apiKey) {
    return NextResponse.json({ error: 'City and API key are required' }, { status: 400 })
  }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
  const data = await response.json()

  if (response.ok) {
    const weatherData: WeatherResponse = data
    return NextResponse.json(weatherData)
  } else {
    const errorResponse: ErrorResponse = { error: data.message }

    return NextResponse.json({ errorResponse}, { status: response.status })
  }
}
