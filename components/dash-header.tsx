"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import LogoutButton from "@/app/custom-components/LogoutButton"
import { UserAvatar } from "@/app/custom-components/UserAvatar"

export function DashboardHeader() {
  const userAuthenticated = useSession().status === "authenticated"
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {userAuthenticated ? (
              <div className="flex gap-4">
                <UserAvatar />
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "hidden lg:flex",
                })}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
