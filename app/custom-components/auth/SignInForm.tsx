"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { data: session, status } = useSession()
  const isAuthenticated = !!session?.user

  useEffect(() => {
    if (status === "authenticated" && session?.user && !loading) {
      toast.success("You are logged in. Redirecting to the dashboard...")
      if (session.user.role === "admin") {
        router.push("/admin")
      } else if (session.user.role === "subscriber") {
        router.push("/user")
      }
      router.push("/admin")
    }
  }, [status, session, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError(result.error)
        return
      }
      if (result?.ok) {
        toast.success("Sign in successful")
        if (isAuthenticated && session?.user.role === "admin") {
          router.push("/admin")
        } else if (isAuthenticated && session?.user.role === "user") {
          router.push("/user")
        }
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred during sign in")
      console.error("Sign in error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <button
          id="g_id_onload"
          onClick={() => signIn("google")}
          className="bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
        >
          Continue with Google
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-xl font-medium text-white"
          >
            Email
          </label>
          <input
            autoFocus
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isAuthenticated}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xl font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isAuthenticated}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || isAuthenticated}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}
