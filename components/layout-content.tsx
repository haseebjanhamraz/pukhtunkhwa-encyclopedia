"use client"

import { usePathname } from "next/navigation"
import { SessionProvider } from "next-auth/react"

import { fontSans } from "@/app/lib/fonts"
import { cn } from "@/app/lib/utils"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { JsonLd } from "@/components/json-ld"

interface LayoutContentProps {
    children: React.ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
    const pathname = usePathname()
    const isDashboardPage =
        pathname.startsWith("/user") || pathname.startsWith("/admin")

    return (
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
    )
} 