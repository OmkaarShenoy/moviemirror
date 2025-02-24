// app/api/report/route.ts

import { NextResponse } from "next/server";

// Reuse the same types for consistency
interface Movie {
  title: string;
  year: number | null;
  rating: number | null;
}

interface AnalysisData {
  username: string;
  movies_scraped: number;
  sample_movies: Movie[];
}

// --- Stubbed database retrieval ---
// Replace this with your real DB query.
async function getAnalysisData(username: string): Promise<AnalysisData | null> {
  // For demonstration, we return the same static data.
  // In production, query your database for stored analysis data.
  console.log(`Fetching analysis data for ${username}`);
  return {
    username,
    movies_scraped: 3,
    sample_movies: [
      { title: "Inception", year: 2010, rating: 4.5 },
      { title: "The Matrix", year: 1999, rating: 5 },
      { title: "Interstellar", year: 2014, rating: 4.8 },
    ],
  };
}

// --- API Handler ---
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const analysisData = await getAnalysisData(username);
    if (!analysisData) {
      return NextResponse.json({ error: "No data found for this user" }, { status: 404 });
    }
    return NextResponse.json(analysisData);
  } catch (error) {
    console.error("Error fetching report data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
