import React from "react"
import Image from "next/image"

export default function DistrictCard(district: any) {
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
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-700">
            {district.district.name}
          </h5>
        </a>
        <p className="mb-3 font-normal w-96 text-gray-700"></p>
      </div>
    </div>
  )
}
