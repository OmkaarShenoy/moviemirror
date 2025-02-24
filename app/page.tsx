"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [username, setUsername] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username) {
      router.push(`/analysis/${username}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Movie Mirror</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Discover deep, AI-powered insights about your movie watching habits based on your Letterboxd profile.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter your Letterboxd username"
            aria-label="Letterboxd username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Analyze
          </button>
        </div>
      </form>
    </main>
  )
}

