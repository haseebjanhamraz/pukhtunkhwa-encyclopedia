import DistrictPageComp from "@/app/custom-components/pages/DistrictPageComp"
import { Metadata } from 'next'
import { districtsMetadata } from '@/config/metadata/pages'

export const metadata: Metadata = districtsMetadata
export default function DistrictPage() {
  return (
    <DistrictPageComp />
  )
}