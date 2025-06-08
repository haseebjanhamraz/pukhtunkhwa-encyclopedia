"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import axios from "axios"
interface District {
  _id: string
  name: string
  image: string
  coordinates: number[]
  population: number
  area: number
  description: string
  history: string
  attractions: string[]
  funFacts: string[]
  mustVisit: boolean
}

export default function DistrictPage() {
  const params = useParams()
  const [district, setDistrict] = useState<District | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const response = await axios.get(`/api/districts/${params.id}`)
        setDistrict(response.data)
        setLoading(false)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        )
        setLoading(false)
      }
    }

    fetchDistrict()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!district) return <div>District not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-[500px] mb-8">
        <Image
          src={district.image}
          alt={district.name}
          fill
          objectPosition="center"
          className="relative object-cover rounded-lg bg-center dark:brightness-50"
          priority
        />
        // Overly Text
        <h1 className="absolute bg-blue-800 bg-opacity-50 px-4 py-2 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white dark:text-white font-bold text-shadow-lg/100">
          {district.name}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {district.description}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Facts</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Population:</span>{" "}
              {district.population.toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Area:</span>{" "}
              {district.area.toLocaleString()} km²
            </p>
            <p>
              <span className="font-medium">Coordinates:</span>{" "}
              {district.coordinates.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">History</h2>
        <p className="text-gray-700 dark:text-gray-300">{district.history}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tourist Attractions</h2>
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {district.attractions.map((attraction: any, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/10 ring-inset"
                >
                  {attraction}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Fun Facts</h2>
          <ul className="list-disc list-inside space-y-2">
            {district.funFacts.map((fact, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
