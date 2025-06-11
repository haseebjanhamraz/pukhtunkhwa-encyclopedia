"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface District {
  id: string
  name: string
  image: string
  latitude: number
  longitude: number
  population: number
  area: number
  description: string
  history: string
  attractions: string[]
  fun_facts: string[]
  must_visit: boolean
}

export default function useDistricts() {
  const [districts, setDistricts] = useState<District[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("/api/districts")
        setDistricts(response.data)
        setLoading(false)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        )
        setLoading(false)
      }
    }

    fetchDistricts()
  }, [])

  return { districts, loading, error }
}

export async function useSingleDistrict(id: string) {
  try {
    const response = await axios.get(`/api/districts/${id}`)
    return response.data
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "An unknown error occurred"
    )
  }
}
