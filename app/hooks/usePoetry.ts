import { useEffect, useState } from "react"
import axios from "axios"

interface Poetry {
  id: string
  content: string[]
  poet: string
  created_at: string
  updated_at: string
}

export default function usePoetry() {
  const [poetry, setPoetry] = useState<Poetry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPoetry = async () => {
      try {
        const response = await axios.get("/api/poetry")
        setPoetry(response.data)
        setLoading(false)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        )
        setLoading(false)
      }
    }

    fetchPoetry()
  }, [])

  return { poetry, loading, error }
}
