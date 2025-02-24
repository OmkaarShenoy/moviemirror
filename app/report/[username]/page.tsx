"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Movie {
  title: string;
  year: number;
  rating: number;
}

interface Report {
  username: string;
  total_movies: number;
  movies: Movie[];
}

export default function AnalysisPage() {
  const { username } = useParams();
  const usernameStr = Array.isArray(username) ? username[0] : username;
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/report?username=${encodeURIComponent(usernameStr)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch report");
        }
        const data: Report = await response.json();
        setReport(data);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };
    if (usernameStr) fetchReport();
  }, [usernameStr]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!report) {
    return <div className="p-8">Error loading report</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Movie Report for {report.username}</h1>
      <p>Total Movies Watched: {report.total_movies}</p>
      <ul className="mt-4 list-disc pl-5">
        {report.movies.map((movie, index) => (
          <li key={index}>
            {movie.title} ({movie.year}) - Rating: {movie.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
