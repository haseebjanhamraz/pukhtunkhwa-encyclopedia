"use client"

import { useState } from "react"

import "@/styles/globals.css"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dash-header"
import DashboardSidebar from "@/components/dash-sidebar"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased flex flex-col",
        fontSans.variable
      )}
    >
      {/* Header */}
      <DashboardHeader />

      {/* Sidebar */}
      <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 flex-1 p-4",
          collapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        <div className="mx-auto px-8 py-5">{children}</div>
      </div>
    </div>
  )
}
