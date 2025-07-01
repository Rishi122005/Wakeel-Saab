"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Scale, Menu, X } from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Session, AuthChangeEvent, User } from "@supabase/supabase-js"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Chat Assistant", href: "/chat" },
  { name: "Find Lawyers", href: "/lawyers" },
  { name: "Legal News", href: "/news" },
  { name: "Documents", href: "/documents" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      document.body.classList.add("dark")
      setDarkMode(true)
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const toggleDarkMode = () => {
    const isDark = !darkMode
    setDarkMode(isDark)
    document.body.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="brand">
          <Scale className="icon" />
          <span className="brand-title">Wakeel Saab</span>
        </Link>

        <nav className="nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="right-section">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>

          <div className="auth-links">
            {user ? (
              <button onClick={handleSignOut} className="auth-link">Sign Out</button>
            ) : (
              <>
                <Link href="/auth/signin" className="auth-link">Sign In</Link>
                <span className="divider">/</span>
                <Link href="/auth/signup" className="auth-link">Sign Up</Link>
              </>
            )}
          </div>

          <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`mobile-nav-link ${pathname === item.href ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mobile-auth-links">
            {user ? (
              <button onClick={handleSignOut} className="auth-link">Sign Out</button>
            ) : (
              <>
                <Link href="/auth/signin" className="auth-link">Sign In</Link>
                <span className="divider">/</span>
                <Link href="/auth/signup" className="auth-link">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
