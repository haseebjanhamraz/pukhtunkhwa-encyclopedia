"use client"

import React from "react"
import dynamic from "next/dynamic"

import Sidebar from "../../custom-components/Sidebar"

const DynamicMap = dynamic(() => import("../../custom-components/Map"), {
    ssr: false, // Disables server-side rendering
})
export default function MapPageComp() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <DynamicMap />
        </div>
    )
}
