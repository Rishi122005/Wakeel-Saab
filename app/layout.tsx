import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
    title: "Wakeel Saab - India's Legal Support Platform",
    description: "Get instant AI legal guidance, connect with verified lawyers, and manage your legal documents - all in one secure platform.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
          <html lang="en">
                <head>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                </head>head>
                <body>{children}</body>body>
          </html>html>
        )
}</html>

        
