"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function AnalysisPage() {
  const { username } = useParams();
  const usernameStr = Array.isArray(username) ? username[0] : username;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/scrape?username=${encodeURIComponent(usernameStr)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result: AnalysisData = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!data) {
    return <div className="p-8">Error loading data</div>;
  }

  const handleViewReport = () => {
    // Navigate to the report page, passing along the username as a query parameter.
    router.push(`/report/${username}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Analysis for {data.username}</h1>
      <p className="mb-4">Total movies scraped: {data.movies_scraped}</p>
      <h2 className="text-2xl font-semibold mb-2">Sample Movies:</h2>
      <ul className="list-disc pl-5 mb-8">
        {data.sample_movies.map((movie, index) => (
          <li key={index} className="mb-2">
            {movie.title} ({movie.year}) - Rating: {movie.rating ? `${movie.rating}/5` : "N/A"}
          </li>
        ))}
      </ul>
      <div>
        <p className="mb-4">Are you ready to see your full Movie Mirror report?</p>
        <button 
          onClick={handleViewReport} 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          View Report
        </button>
      </div>
    </div>
  );
}
