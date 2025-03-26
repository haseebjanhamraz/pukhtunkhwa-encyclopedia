import "@/styles/globals.css"
import { Metadata } from "next"
import Head from 'next/head'

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import RetroGrid from "@/components/magicui/retro-grid"
import TextReveal from "@/components/magicui/text-reveal"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import AnimatedListDemo from "./animatedlist-demo/page"
import GlobePage from "./globe-section/page"
import NostalgiaPage from "./nostalgia-section/page"
import GameCard from "./game-card/page"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <title>{siteConfig.name}</title>
          <meta name="description" content={siteConfig.description} />
          <meta name="theme-color" content="#ffffff" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head>
        <body
          className={cn(
            "max-h-auto bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1 mx-auto justify-center items-center">
                {children}
                <div className="pt-20 flex flex-col lg:flex-row justify-center items-center space-y-8 lg:space-y-0 lg:space-x-8">
                  <GlobePage />
                  <AnimatedListDemo />
                </div>
              </div>
            </div>
            {/* <div className="pt-20"> */}
            <div className="flex items-center justify-center rounded-lg bg-white dark:bg-black overflow-hidden h-auto">
              {/* <NostalgiaPage /> */}
              <TextReveal

                text="Pukhtunkhwa – Where history echoes, culture thrives, and the spirit of the Pashtun nation lives on."
              />

              <TextReveal

                text="Pukhtunkhwa, historically known as Khyber Pakhtunkhwa, is the cultural heartland of the Pashtun nation, rich in history, traditions, and resilience. Nestled in the northwest of Pakistan, it is a land of breathtaking landscapes, from the rugged mountains of Swat and Chitral to the fertile plains of Peshawar. Pukhtunkhwa.com is dedicated to preserving and promoting the region's heritage by documenting its history, music, art, and traditions. Through interactive maps and curated content, we aim to highlight the beauty, struggles, and contributions of the Pashtun people, ensuring that their legacy continues to thrive for future generations."
              />

            </div>

            {/* </div> */}
            <GameCard />
            <SiteFooter className=" fixed border-t bottom-0 inset-x-0 sm:static" />

            {/* <div className="fixed bottom-0 inset-x-0 sm:static bg-neutral-900/3"> */}

            {/* </div> */}
            <TailwindIndicator />

          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

