import { Metadata } from "next"
import { Districts } from "@/app/types/Districts"

export const homeMetadata: Metadata = {
  title: {
    default: "Home | Pukhtunkhwa Encyclopedia",
    template: "%s | Pukhtunkhwa Encyclopedia",
  },
  description: "Discover the rich culture, history, and heritage of Pukhtunkhwa. Explore interactive maps, historical districts, and cultural insights of Khyber Pakhtunkhwa.",
  openGraph: {
    title: "Pukhtunkhwa Encyclopedia - Discover KP's Rich Heritage",
    description: "Your gateway to exploring the rich culture, history, and heritage of Pukhtunkhwa. Interactive maps, historical insights, and cultural exploration.",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Pukhtunkhwa Encyclopedia Homepage",
      },
    ],
  },
}

export const aboutMetadata: Metadata = {
  title: "About Pukhtunkhwa | Our Story",
  description: "Learn about Pukhtunkhwa Encyclopedia's mission to preserve and share the rich cultural heritage of Khyber Pakhtunkhwa. Discover our story and vision.",
  openGraph: {
    title: "About Pukhtunkhwa Encyclopedia | Our Mission",
    description: "Discover our mission to preserve and share the rich cultural heritage of Khyber Pakhtunkhwa. Learn about our story, vision, and commitment to cultural preservation.",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Pukhtunkhwa Encyclopedia",
      },
    ],
  },
}

export const mapMetadata: Metadata = {
  title: "Interactive Map of Pukhtunkhwa | Explore KP",
  description: "Explore Khyber Pakhtunkhwa through our interactive map. Discover districts, landmarks, and cultural sites across Pukhtunkhwa with detailed information.",
  openGraph: {
    title: "Interactive Map of Pukhtunkhwa | Explore KP's Regions",
    description: "Navigate through Khyber Pakhtunkhwa's districts and landmarks with our interactive map. Discover cultural sites, historical locations, and regional information.",
    images: [
      {
        url: "/og-map.jpg",
        width: 1200,
        height: 630,
        alt: "Interactive Map of Pukhtunkhwa",
      },
    ],
  },
}

export const contactMetadata: Metadata = {
  title: "Contact Us | Pukhtunkhwa Encyclopedia",
  description: "Get in touch with the Pukhtunkhwa Encyclopedia team. Share your stories, contribute content, or ask questions about Khyber Pakhtunkhwa's heritage.",
  openGraph: {
    title: "Contact Pukhtunkhwa Encyclopedia | Get in Touch",
    description: "Connect with us to share your stories, contribute content, or learn more about Khyber Pakhtunkhwa's rich heritage. We'd love to hear from you!",
    images: [
      {
        url: "/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Pukhtunkhwa Encyclopedia",
      },
    ],
  },
}

export const districtsMetadata: Metadata = {
  title: "Districts of Pukhtunkhwa | Explore KP Regions",
  description: "Explore the diverse districts of Khyber Pakhtunkhwa. Learn about each district's unique culture, history, landmarks, and local traditions.",
  openGraph: {
    title: "Districts of Pukhtunkhwa | Regional Guide",
    description: "Discover the unique characteristics of each district in Khyber Pakhtunkhwa. From culture and history to landmarks and traditions, explore KP's diverse regions.",
    images: [
      {
        url: "/og-districts.jpg",
        width: 1200,
        height: 630,
        alt: "Districts of Pukhtunkhwa",
      },
    ],
  },
}

// Dynamic District Metadata
export const districtMetadata = (district: Districts) => {
  return {
    title: `${district.name} | Pukhtunkhwa Encyclopedia`,
    description: `Learn about ${district.name}, a district in Khyber Pakhtunkhwa. Discover its culture, history, landmarks, and local traditions.`,
  }
}