import React from "react"
import Image from "next/image"
import Link from "next/link"
import useWeather from "../hooks/useWeather"

export default function DistrictCard(district: any) {
  if (!district.district) {
    return <div className="text-center">No district found</div>
  }
  const { weather, loading, error } = useWeather(district.district._id)
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!district) return <div>District not found</div>

  return (
    <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="w-full">
        <Image
          src={district.district.image}
          height={300}
          width={300}
          alt={`${district.district.name} image`}
          className="w-full h-[300px] object-cover"
        />
      </div>
      <div className="p-5">
        <Link href={`districts/${district.district._id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-700">
            {district.district.name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700">
          {district.district.description}
        </p>
      </div>
      <div className="border-t-2 border-gray-300 w-full"></div>
      <div className="p-4">
        <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
          History
        </h4>
        <p>{district.district.history}</p>
        <div className="flex gap-3">
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
            Population : {district.district.population.toLocaleString()}
          </span>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/10 ring-inset">
            Area: {district.district.area.toLocaleString()} km²
          </span>
        </div>
      </div>
      <div className="border-t-2 border-gray-300 w-full"></div>
      <div className="p-4">
        <h4 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
          Attractions
        </h4>
        <div className="flex flex-wrap gap-2">
          {district.district.attractions.map(
            (attraction: any, index: number) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/10 ring-inset"
              >
                {attraction}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  )
}
