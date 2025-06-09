import { Metadata } from "next"
import { aboutMetadata } from "@/config/metadata/pages"
import AboutPageComp from "@/app/custom-components/pages/AboutPageComp"

export const metadata: Metadata = aboutMetadata

export default function AboutPage() {
  return <AboutPageComp />
}
