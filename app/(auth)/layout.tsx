"use client"

import { ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import SignInForm from "../custom-components/auth/SignInForm"
import SignUpForm from "../custom-components/auth/SignUpForm"

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const url = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <>
      <motion.div
        className="min-h-screen p-3 flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat bg-fixed bg-black bg-opacity-20 dark:bg-opacity-60 bg-blend-overlay transition-all duration-300"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.main
          className="w-full max-w-md p-8 h-full bg-black-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100"
          variants={formVariants}
        >
          <div className="flex items-center justify-center p-4 m-3">
            <Image
              src={"/pukhtunkhwa-logo.png"}
              width={350}
              height={350}
              alt="Pukhtunkhwa Logo"
            />
          </div>
          <AnimatePresence mode="wait">
            {url === "/login" ? (
              <motion.div
                className="flex flex-col items-center justify-center"
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl text-center mb-6 text-white ">Login</h1>
                <SignInForm />
                <Link
                  href="/signup"
                  className="text-center dark:text-white hover:text-red-500 text-lg dark:hover:text-red-500"
                >
                  Don't have an account? Sign Up here
                </Link>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center"
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-4xl text-center mb-6 text-white">
                  Sign Up
                </h1>
                <SignUpForm />
                <Link
                  href="/login"
                  className="text-center dark:text-white hover:text-red-500 text-lg dark:hover:text-red-500"
                >
                  Already have an account? Sign in
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </motion.div>
    </>
  )
}
