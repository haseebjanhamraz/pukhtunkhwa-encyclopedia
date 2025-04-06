"use client"

import "@/styles/globals.css"
// import { Metadata } from "next"
import Head from "next/head"
import { usePathname } from "next/navigation"
import { SessionProvider } from "next-auth/react"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon-16x16.png",
//     apple: "/apple-touch-icon.png",
//   },
// }

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
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
