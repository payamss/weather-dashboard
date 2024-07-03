import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city')
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!city || !apiKey) {
    return NextResponse.json({ error: 'City and API key are required' }, { status: 400 })
  }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
  const data = await response.json()

  if (response.ok) {
    return NextResponse.json(data)
  } else {
    return NextResponse.json({ error: data.message }, { status: response.status })
  }
}
