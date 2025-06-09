import React from 'react'
import MapPageComp from '@/app/custom-components/pages/MapPageComp'
import { Metadata } from 'next'
import { mapMetadata } from '@/config/metadata/pages'

export const metadata: Metadata = mapMetadata

export default function MapPage() {
  return (
    <MapPageComp />
  )
}