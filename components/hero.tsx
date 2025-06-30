// app/components/Hero.tsx
"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import Image from "next/image"

export function Hero() {
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
    <section style={isDark ? styles.heroDark : styles.hero}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          Your Legal Support <span style={styles.highlight}>Platform</span>
        </h1>
        <p style={styles.subtitle}>
          Get instant legal guidance, connect with qualified lawyers, stay updated with legal news, and manage your
          legal documents all in one secure platform.
        </p>

        <div style={styles.buttons}>
          <Link href="/chat" style={{ ...styles.button, ...styles.primaryBtn }}>
            <Image src="/icons/chat.png" alt="Chat Icon" width={20} height={20} style={styles.icon} />
            Start Legal Chat
          </Link>
          <Link href="/lawyers" style={{ ...styles.button, ...styles.secondaryBtn }}>
            <Image src="/icons/lawyer.png" alt="Lawyer Icon" width={20} height={20} style={styles.icon} />
            Find Lawyers
          </Link>
        </div>

        <div style={styles.features}>
          <Feature
            iconSrc="/icons/chat.png"
            title="AI Legal Chat"
            text="24/7 legal guidance"
          />
          <Feature
            iconSrc="/icons/lawyer.png"
            title="Expert Lawyers"
            text="Qualified professionals"
          />
          <Feature
            iconSrc="/icons/news.png"
            title="Legal News"
            text="Stay informed"
          />
          <Feature
            iconSrc="/icons/docs.png"
            title="Documents"
            text="Generate & review"
          />
        </div>
      </div>
    </section>
  )
}

function Feature({
  iconSrc,
  title,
  text,
}: {
  iconSrc: string
  title: string
  text: string
}) {
  return (
    <div style={styles.feature}>
      <div style={styles.featureIcon}>
        <Image src={iconSrc} alt={title} width={32} height={32} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    padding: "5rem 1rem",
    background: "linear-gradient(to bottom right, #eef2ff, #f5f7fa)",
    textAlign: "center",
    color: "#333",
  },
  heroDark: {
    padding: "5rem 1rem",
    background: "linear-gradient(to bottom right, #121212, #1e1e1e)",
    textAlign: "center",
    color: "#e0e0e0",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  highlight: {
    color: "#1a73e8",
    display: "block",
  },
  subtitle: {
    fontSize: "1.125rem",
    marginBottom: "2rem",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "3rem",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "1rem",
    textDecoration: "none",
    cursor: "pointer",
  },
  primaryBtn: {
    backgroundColor: "#1a73e8",
    color: "#fff",
  },
  secondaryBtn: {
    backgroundColor: "transparent",
    color: "#1a73e8",
    border: "2px solid #1a73e8",
  },
  icon: {
    marginRight: "0.5rem",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  },
  feature: {
    textAlign: "center",
  },
  featureIcon: {
    backgroundColor: "#e8f0fe",
    borderRadius: "50%",
    padding: "1rem",
    display: "inline-block",
    marginBottom: "1rem",
  },
}
