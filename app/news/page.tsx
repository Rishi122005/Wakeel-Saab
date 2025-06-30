"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/header"; // ✅ Importing the Header component

type Article = {
  title: string;
  description: string;
  pubDate: string;
  source_id: string;
  link: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_12923769d34e4cc3af18271bc713a98a&language=en&q=law"
        );
        const data = await res.json();

        if (data.results && Array.isArray(data.results)) {
          setArticles(data.results);
        } else {
          console.error("Unexpected API response:", data);
          setError("Unexpected API format");
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          padding: "40px",
          fontFamily: "sans-serif",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          📰 Real-Time Legal News
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {articles.length === 0 && !loading && <p>No articles found.</p>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
          {articles.map((article, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "0.3s ease",
              }}
            >
              <h2 style={{ fontSize: "1.3rem", marginBottom: "10px", color: "#1a202c" }}>
                {article.title}
              </h2>
              <p style={{ color: "#555", marginBottom: "10px" }}>{article.description}</p>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "6px" }}>
                <strong>Date:</strong> {new Date(article.pubDate).toLocaleDateString()}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "16px" }}>
                <strong>Source:</strong> {article.source_id}
              </p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
