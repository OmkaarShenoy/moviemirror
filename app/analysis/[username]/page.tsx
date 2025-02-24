"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function AnalysisPage() {
  const { username } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/scrape?username=${username}`)
        const result = await response.json()
        setData(result)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Error loading data</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Analysis for {username}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

