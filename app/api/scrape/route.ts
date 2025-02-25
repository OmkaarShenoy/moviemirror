import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  try {
    const response = await fetch(`http://localhost:8000/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data from backend")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching data from backend:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}