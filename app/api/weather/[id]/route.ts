import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { fetchWeatherApi } from "openmeteo"
import axios from "axios"

import clientPromise from "@/app/utils/MongoDB"

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const client = await clientPromise
    const db = client.db("pukhtunkhwa")
    const collection = db.collection("districts")
    const district = await collection.findOne({ _id: new ObjectId(id) })
    if (!district) {
      return NextResponse.json(
        { message: "District not found" },
        { status: 404 }
      )
    }

    const paramCoordinates = {
      latitude: district.coordinates[0],
      longitude: district.coordinates[1],
      hourly: "temperature_2m",
    }
    const url = "https://api.open-meteo.com/v1/forecast"
    const responses = await fetchWeatherApi(url, paramCoordinates)

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0]

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds()
    // Build timezone string from UTC offset and timezone abbreviation
    const timezone = response.timezone()!
    const timezoneAbbreviation = response.timezoneAbbreviation()
    const latitude = response.latitude()
    const longitude = response.longitude()

    const hourly = response.hourly()!

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
      },
    }
    const weather = weatherData.hourly.time
      .slice(0, 2)
      .map((time, index) => ({
        time: time.toLocaleTimeString(),
        temperature: Math.floor(weatherData.hourly.temperature2m[index]),
      }))

    const { name, coordinates } = district
    // Fetch current weather
    const currentWeatherResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${OPENWEATHER_API_KEY}&units=metric`
    )

    // Fetch 5-day forecast
    const forecastResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${OPENWEATHER_API_KEY}&units=metric`
    )

    // Process current weather
    const currentWeather = {
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      temperature: Math.round(currentWeatherResponse.data.main.temp),
      condition: currentWeatherResponse.data.weather[0].main,
      icon: getWeatherIcon(currentWeatherResponse.data.weather[0].id),
      feelsLike: Math.round(currentWeatherResponse.data.main.feels_like),
      humidity: currentWeatherResponse.data.main.humidity,
      wind: Math.round(currentWeatherResponse.data.wind.speed * 3.6), // Convert m/s to km/h
      uvIndex: 0, // UV index requires separate API call
    }

    // Process hourly forecast
    const hourlyForecast = forecastResponse.data.list.slice(0, 6).map((item: any) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      temperature: Math.round(item.main.temp),
      icon: getWeatherIcon(item.weather[0].id),
    }))

    return NextResponse.json(
      {
        name,
        coordinates,
        currentHourWeather: currentWeather,
        weather: hourlyForecast,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error fetching weather:", error)
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    )
  }
}

// Helper function to map OpenWeather condition codes to emoji icons
function getWeatherIcon(code: number): string {
  if (code >= 200 && code < 300) return "⛈️" // Thunderstorm
  if (code >= 300 && code < 400) return "🌧️" // Drizzle
  if (code >= 500 && code < 600) return "🌧️" // Rain
  if (code >= 600 && code < 700) return "❄️" // Snow
  if (code >= 700 && code < 800) return "🌫️" // Atmosphere (fog, mist)
  if (code === 800) return "☀️" // Clear
  if (code > 800) return "☁️" // Clouds
  return "🌈" // Default
}
