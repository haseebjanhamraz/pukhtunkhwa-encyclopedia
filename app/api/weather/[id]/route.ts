import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const districtResponse = await fetch(`${baseUrl}/api/districts/${id}`)
    
    if (!districtResponse.ok) {
      throw new Error('Failed to fetch district')
    }

    const district = await districtResponse.json()

    const { latitude, longitude } = district

    if (!latitude || !longitude) {
      throw new Error('District coordinates not found')
    }

    // Fetch weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    )

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const weatherData = await weatherResponse.json()
    return NextResponse.json(weatherData)
  } catch (error) {
    console.error('Weather API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}