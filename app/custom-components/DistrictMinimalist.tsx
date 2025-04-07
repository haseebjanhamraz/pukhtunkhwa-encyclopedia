import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function DistrictMinimalist(district: {
  // Define the structure of the district prop
  district: {
    _id?: string
    id: string
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
}) {
  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="w-full">
        <Image
          src={district.district.image}
          height={300}
          width={300}
          alt={`${district.district.name} image`}
          className="h-[300px] w-full object-cover"
        />
      </div>
      <div className="p-5">
        <Link href={`/districts/${district.district._id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-700">
            {district.district.name}
          </h5>
        </Link>
        <div className="flex flex-wrap gap-2">
          {district.district.attractions.map(
            (attraction: any, index: number) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/10"
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
