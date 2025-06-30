// app/components/Features.tsx
"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"

const features = [
  {
    icon: "/icons/chat.png",
    title: "AI Legal Assistant",
    description: "Get instant answers to legal questions with our advanced AI chatbot trained on legal knowledge.",
  },
  {
    icon: "/icons/lawyer.png",
    title: "Lawyer Network",
    description: "Connect with qualified lawyers based on your location, legal category, and specific needs.",
  },
  {
    icon: "/icons/news.png",
    title: "Real-time Updates",
    description: "Stay informed with the latest court verdicts, legal news, and regulatory changes.",
  },
  {
    icon: "/icons/docs.png",
    title: "Document Tools",
    description: "Generate, review, and manage legal documents with our comprehensive document suite.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    title: "Case Management",
    description: "Track appointments, deadlines, and case history in your personalized dashboard.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/456/456212.png",
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and strict privacy controls.",
  },
]

export function Features() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
    setIsDark(document.body.classList.contains("dark"))
    return () => observer.disconnect()
  }, [])

  return (
    <section style={isDark ? styles.sectionDark : styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Everything You Need for Legal Support</h2>
          <p style={styles.subtitle}>
            Our comprehensive platform provides all the tools and resources you need to handle your legal matters
            efficiently and securely.
          </p>
        </div>

        <div style={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} style={isDark ? styles.cardDark : styles.card}>
              <div style={styles.iconWrapper}>
                <Image src={feature.icon} alt={feature.title} width={32} height={32} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "5rem 1rem",
    backgroundColor: "#f4f4f4",
    color: "#333",
  },
  sectionDark: {
    padding: "5rem 1rem",
    backgroundColor: "#1e1e1e",
    color: "#ddd",
  },
  container: {
    maxWidth: "1140px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.125rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  card: {
    border: "1px solid #ccc",
    padding: "1.5rem",
    borderRadius: "8px",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
  },
  cardDark: {
    border: "1px solid #444",
    padding: "1.5rem",
    borderRadius: "8px",
    backgroundColor: "#2a2a2a",
    transition: "all 0.3s ease",
  },
  iconWrapper: {
    backgroundColor: "#e8f0fe",
    padding: "0.75rem",
    borderRadius: "8px",
    display: "inline-block",
    marginBottom: "1rem",
  },
}
