"use client"

import "@/styles/globals.css"
// import { Metadata } from "next"
import Head from "next/head"
import { usePathname } from "next/navigation"
import { SessionProvider } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { metadata } from "@/config/metadata"
import { fontSans } from "@/app/lib/fonts"
import { cn } from "@/app/lib/utils"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { JsonLd } from "@/components/json-ld"


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()
  const isDashboardPage =
    pathname.startsWith("/user") || pathname.startsWith("/admin")
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
          <script src="https://accounts.google.com/gsi/client" async></script>
        </Head>
        <body
          className={cn(
            "max-h-auto bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                {!isDashboardPage && <SiteHeader />}
                <div className="flex-1">{children}</div>
                {!isDashboardPage && <SiteFooter />}
              </div>
              <TailwindIndicator />
              <JsonLd />
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
