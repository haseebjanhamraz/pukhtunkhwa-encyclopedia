"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Building2, Home, Menu, Settings, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Overview", href: "/admin", icon: <Home className="w-5 h-5" /> },
  {
    name: "Districts",
    href: "/admin/districts",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
]

interface DashboardSidebarProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

export default function Sidebar({
  collapsed,
  setCollapsed,
}: DashboardSidebarProps) {
  const path = usePathname()
  const isActive = (href: string) => {
    return path === href
  }
  const [mobileOpen, setMobileOpen] = useState(false)
  const toggleSidebar = () => setCollapsed(!collapsed)
  const toggleMobile = () => setMobileOpen(!mobileOpen)
  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleMobile}>
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar (Desktop) */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex flex-col fixed top-0 left-0 h-full bg-white dark:bg-zinc-900 border-r shadow-md z-40"
      >
        <div className="flex items-center justify-between px-4 py-4">
          {!collapsed && <h1 className="text-lg font-bold">Dashboard</h1>}
          <Button size="icon" variant="ghost" onClick={toggleSidebar}>
            {collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </Button>
        </div>

        <nav className="flex flex-col space-y-1 px-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all ${
                collapsed ? "justify-center" : "gap-3"
              } ${link.href === path ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
            >
              {link.icon}
              {!collapsed && <span className="text-sm">{link.name}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Sidebar (Mobile) */}
      {mobileOpen && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-zinc-900 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button size="icon" variant="ghost" onClick={toggleMobile}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={toggleMobile}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </motion.aside>
      )}
    </>
  )
}
