"use client"

import React, { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Phone, Mail, Calendar } from "lucide-react"

type Lawyer = {
  id: number
  name: string
  specialization: string
  location: string
  rating: number
  reviews: number
  experience: string
  phone: string
  email: string
  image: string
  bio: string
  hourlyRate: string
}

const initialLawyers: Omit<Lawyer, "image">[] = [
  { id: 1, name: "Sarah Johnson", specialization: "Criminal Law", location: "New York, NY", rating: 4.9, reviews: 127, experience: "15 years", phone: "+1 (555) 123-4567", email: "sarah@lawfirm.com", bio: "Experienced criminal defense attorney with a track record of successful cases.", hourlyRate: "$350" },
  { id: 2, name: "Michael Chen", specialization: "Corporate Law", location: "San Francisco, CA", rating: 4.8, reviews: 89, experience: "12 years", phone: "+1 (555) 234-5678", email: "michael@corplaw.com", bio: "Corporate law specialist helping businesses navigate complex legal matters.", hourlyRate: "$425" },
  { id: 3, name: "Emily Rodriguez", specialization: "Family Law", location: "Los Angeles, CA", rating: 4.9, reviews: 156, experience: "18 years", phone: "+1 (555) 345-6789", email: "emily@familylaw.com", bio: "Compassionate family law attorney specializing in divorce and custody cases.", hourlyRate: "$300" },
  { id: 4, name: "David Thompson", specialization: "Personal Injury", location: "Chicago, IL", rating: 4.7, reviews: 203, experience: "20 years", phone: "+1 (555) 456-7890", email: "david@injury.com", bio: "Dedicated personal injury lawyer fighting for maximum compensation.", hourlyRate: "$275" },
  { id: 5, name: "Priya Singh", specialization: "Immigration Law", location: "Houston, TX", rating: 4.8, reviews: 98, experience: "10 years", phone: "+1 (555) 567-8901", email: "priya@immigration.com", bio: "Immigration expert helping clients navigate visa and citizenship processes.", hourlyRate: "$320" },
  { id: 6, name: "Carlos Martinez", specialization: "Real Estate Law", location: "Phoenix, AZ", rating: 4.6, reviews: 76, experience: "8 years", phone: "+1 (555) 678-9012", email: "carlos@realestate.com", bio: "Advisor in property transactions, leases and landlord–tenant issues.", hourlyRate: "$290" },
  { id: 7, name: "Aisha Ahmed", specialization: "Employment Law", location: "Philadelphia, PA", rating: 4.9, reviews: 143, experience: "14 years", phone: "+1 (555) 789-0123", email: "aisha@employment.com", bio: "Employment rights advocate for both employees and employers.", hourlyRate: "$330" },
  { id: 8, name: "Liu Wei", specialization: "Corporate Law", location: "San Antonio, TX", rating: 4.7, reviews: 110, experience: "11 years", phone: "+1 (555) 890-1234", email: "liu@corplaw.com", bio: "Corporate contracts and compliance specialist.", hourlyRate: "$410" },
  { id: 9, name: "Olivia Brown", specialization: "Family Law", location: "San Diego, CA", rating: 4.8, reviews: 132, experience: "16 years", phone: "+1 (555) 901-2345", email: "olivia@familylaw.com", bio: "Focused on mediation and collaborative family legal services.", hourlyRate: "$315" },
  { id: 10, name: "Raj Patel", specialization: "Personal Injury", location: "Dallas, TX", rating: 4.9, reviews: 157, experience: "19 years", phone: "+1 (555) 012-3456", email: "raj@injury.com", bio: "Personal injury trial lawyer with extensive courtroom experience.", hourlyRate: "$360" },
]

export default function LawyersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [isDark, setIsDark] = useState(false)

  const dropdownClass = "z-[9999] border border-gray-300 bg-white text-black dark:bg-gray-900 dark:border-gray-700 dark:text-white shadow-lg rounded-md"

  useEffect(() => {
    const enriched = initialLawyers.map((l) => ({
      ...l,
      image: `https://randomuser.me/api/portraits/${Math.random() < 0.5 ? "men" : "women"}/${l.id + 10}.jpg`,
    }))
    setLawyers(enriched)
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.body.classList.contains("dark"))
    )
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
    setIsDark(document.body.classList.contains("dark"))
    return () => observer.disconnect()
  }, [])

  const filtered = lawyers.filter((l) => {
    const q = searchTerm.toLowerCase()
    return (
      (l.name.toLowerCase().includes(q) || l.specialization.toLowerCase().includes(q)) &&
      (selectedSpecialization === "All Specializations" || l.specialization === selectedSpecialization) &&
      (selectedLocation === "All Locations" || l.location === selectedLocation)
    )
  })

  return (
    <>
      <Header />
      <div style={isDark ? styles.wrapperDark : styles.wrapper}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Find Qualified Lawyers</h1>
          <p style={styles.subheading}>
            Connect with experienced attorneys based on your legal needs and location.
          </p>

          <div style={styles.filters}>
            <Input
              placeholder="Search lawyers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder="Select Specialization" />
              </SelectTrigger>
              <SelectContent className={dropdownClass}>
                <SelectItem value="All Specializations">All Specializations</SelectItem>
                {[...new Set(initialLawyers.map((l) => l.specialization))].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent className={dropdownClass}>
                <SelectItem value="All Locations">All Locations</SelectItem>
                {[...new Set(initialLawyers.map((l) => l.location))].map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div style={styles.grid}>
            {filtered.map((l) => (
              <div key={l.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <img src={l.image} alt={l.name} width={80} height={80} style={styles.avatar} />
                  <div>
                    <div style={styles.cardTitle}>{l.name}</div>
                    <Badge variant="secondary">{l.specialization}</Badge>
                    <div style={styles.rating}>
                      <Star style={{ color: "#fbbf24" }} />
                      {l.rating}
                    </div>
                  </div>
                </div>
                <div style={styles.cardContent}>
                  <p style={styles.bio}>{l.bio}</p>
                  <div style={styles.infoRow}><MapPin /> {l.location}</div>
                  <div style={styles.infoRow}>Experience: <strong>{l.experience}</strong></div>
                  <div style={styles.infoRow}>Rate: <strong>{l.hourlyRate}/hr</strong></div>
                </div>
                <div style={styles.actions}>
                  <Button><Calendar /></Button>
                  <Button variant="outline"><Phone /></Button>
                  <Button variant="outline"><Mail /></Button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={styles.noResults}>No lawyers found matching your criteria.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: { minHeight: "100vh", padding: "2rem 1rem", background: "#f9fafb" },
  wrapperDark: { minHeight: "100vh", padding: "2rem 1rem", background: "#111827" },
  container: { maxWidth: 1200, margin: "0 auto" },
  heading: { fontSize: "2rem", fontWeight: "bold" },
  subheading: { color: "#555", marginBottom: "1.5rem" },
  filters: {
    display: "grid",
    gridTemplateColumns: "1fr repeat(2, auto)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    padding: "1rem",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  cardHeader: { display: "flex", alignItems: "center", gap: "1rem" },
  avatar: { borderRadius: "50%" },
  cardTitle: { fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.25rem" },
  rating: { display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.5rem" },
  cardContent: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  bio: { fontSize: "0.9rem", color: "#666" },
  infoRow: {
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    color: "#444",
  },
  actions: { display: "flex", gap: "0.5rem", marginTop: "0.5rem" },
  noResults: {
    textAlign: "center",
    color: "#777",
    gridColumn: "1/-1",
    fontStyle: "italic",
  },
}
