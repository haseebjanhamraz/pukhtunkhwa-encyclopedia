"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Weather } from "../types/Weather"

export default function useWeather(id: string) {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`/api/weather/${id}`)
        setWeather(response.data)
        setLoading(false)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        )
        setLoading(false)
      }
    }

    fetchWeather()
  }, [id])

  return { weather, loading, error }
}
