// app/components/Footer.tsx
"use client"

import Link from "next/link"
import { Scale } from "lucide-react"
import { useEffect, useState } from "react"

export function Footer() {
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
    <footer style={isDark ? styles.footerDark : styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <Link href="/" style={styles.logoLink}>
              <Scale style={styles.icon} />
              <span style={styles.logoText}>Wakeel Saab</span>
            </Link>
            <p style={styles.desc}>
              Your trusted legal support platform providing comprehensive legal services and resources.
            </p>
          </div>

          <div>
            <h3 style={styles.heading}>Services</h3>
            <ul style={styles.list}>
              <li><Link href="/chat" style={styles.link}>Legal Chat</Link></li>
              <li><Link href="/lawyers" style={styles.link}>Find Lawyers</Link></li>
              <li><Link href="/documents" style={styles.link}>Document Tools</Link></li>
              <li><Link href="/news" style={styles.link}>Legal News</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={styles.heading}>Support</h3>
            <ul style={styles.list}>
              <li><Link href="/help" style={styles.link}>Help Center</Link></li>
              <li><Link href="/contact" style={styles.link}>Contact Us</Link></li>
              <li><Link href="/faq" style={styles.link}>FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 style={styles.heading}>Legal</h3>
            <ul style={styles.list}>
              <li><Link href="/privacy" style={styles.link}>Privacy Policy</Link></li>
              <li><Link href="/terms" style={styles.link}>Terms of Service</Link></li>
              <li><Link href="/disclaimer" style={styles.link}>Legal Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottomBar}>
          <p style={styles.copy}>&copy; 2024 LegalAssist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: "#f5f5f5",
    color: "#333",
    padding: "3rem 1rem 1rem",
    borderTop: "1px solid #ccc",
  },
  footerDark: {
    backgroundColor: "#1e1e1e",
    color: "#ddd",
    padding: "3rem 1rem 1rem",
    borderTop: "1px solid #444",
  },
  container: {
    maxWidth: "1140px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "inherit",
    fontWeight: "bold",
  },
  icon: {
    width: "24px",
    height: "24px",
    color: "#1a73e8",
  },
  logoText: {
    fontSize: "1.25rem",
  },
  desc: {
    marginTop: "1rem",
    fontSize: "0.9rem",
    color: "inherit",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    display: "block",
    marginBottom: "0.5rem",
    textDecoration: "none",
    color: "inherit",
  },
  bottomBar: {
    textAlign: "center",
    marginTop: "2rem",
    borderTop: "1px solid currentColor",
    paddingTop: "1rem",
  },
  copy: {
    fontSize: "0.85rem",
  },
}
