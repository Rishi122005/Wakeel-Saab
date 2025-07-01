import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(`https://newsdata.io/api/1/news?apikey=pub_12923769d34e4cc3af18271bc713a98a&q=law OR legal&country=in&language=en&category=top`)
    const data = await res.json()
    return NextResponse.json({ articles: data.results || [] })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ articles: [] }, { status: 500 })
  }
}
