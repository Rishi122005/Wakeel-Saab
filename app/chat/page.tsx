"use client"

import React, { useState, useEffect } from "react"
import { MessageSquare, Send, Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Header } from "@/components/header" // ✅ Make sure the path is correct

export default function LegalChatBot() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your legal assistant. How can I help you today?",
      timestamp: new Date(),
      isBot: true,
    },
  ])
  const [input, setInput] = useState("")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark"))
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })
    setIsDark(document.body.classList.contains("dark"))
    return () => observer.disconnect()
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      text: input,
      timestamp: new Date(),
      isBot: false,
    }
    setMessages((prev) => [...prev, userMessage])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: input }],
        }),
      })

      const data = await res.json()

      const botMessage = {
        text: data.reply || "Sorry, I couldn't understand that.",
        timestamp: new Date(),
        isBot: true,
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const botMessage = {
        text: "Something went wrong. Please try again.",
        timestamp: new Date(),
        isBot: true,
      }
      setMessages((prev) => [...prev, botMessage])
    }

    setInput("")
  }

  return (
    <>
      <Header />
      <div style={isDark ? styles.wrapperDark : styles.wrapper}>
        <div style={isDark ? styles.chatContainerDark : styles.chatContainer}>
          <div style={styles.chatHeader}>
            <MessageSquare style={{ color: "#fff", marginRight: "0.5rem" }} />
            <h1 style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>LegalBot</h1>
          </div>

          <div style={isDark ? styles.chatMessagesDark : styles.chatMessages}>
            {messages.map((msg, index) => (
              <div key={index} style={{ display: "flex", justifyContent: msg.isBot ? "flex-start" : "flex-end" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: msg.isBot ? "row" : "row-reverse",
                    gap: "0.5rem",
                    maxWidth: "80%",
                  }}
                >
                  <div
                    style={{
                      padding: "0.25rem",
                      borderRadius: "9999px",
                      backgroundColor: msg.isBot ? "#bfdbfe" : "#e5e7eb",
                    }}
                  >
                    {msg.isBot ? (
                      <Bot size={20} color="#3b82f6" />
                    ) : (
                      <User size={20} color="#6b7280" />
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: msg.isBot ? "flex-start" : "flex-end" }}>
                    <div
                      style={{
                        padding: "0.75rem",
                        borderRadius: "1rem",
                        backgroundColor: msg.isBot ? "#bfdbfe" : "#3b82f6",
                        color: msg.isBot ? "#1f2937" : "#ffffff",
                      }}
                    >
                      {msg.isBot ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={isDark ? styles.inputBarDark : styles.inputBar}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a legal question..."
              style={isDark ? styles.inputDark : styles.input}
            />
            <button onClick={handleSend} style={isDark ? styles.sendBtnDark : styles.sendBtn}>
              <Send size={20} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    padding: "1rem",
    paddingTop: "5rem",
  },
  wrapperDark: {
    minHeight: "100vh",
    backgroundColor: "#111827",
    padding: "1rem",
    paddingTop: "5rem",
  },
  chatContainer: {
    maxWidth: "640px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
  },
  chatContainerDark: {
    maxWidth: "640px",
    margin: "0 auto",
    background: "#1e1e1e",
    borderRadius: "0.5rem",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(255, 255, 255, 0.05)",
  },
  chatHeader: {
    backgroundColor: "#3b82f6",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
  },
  chatMessages: {
    height: "400px",
    overflowY: "auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#fff",
  },
  chatMessagesDark: {
    height: "400px",
    overflowY: "auto",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#1a1a1a",
  },
  inputBar: {
    borderTop: "1px solid #e5e7eb",
    padding: "1rem",
    display: "flex",
    gap: "0.5rem",
    backgroundColor: "#f9fafb",
  },
  inputBarDark: {
    borderTop: "1px solid #333",
    padding: "1rem",
    display: "flex",
    gap: "0.5rem",
    backgroundColor: "#1e1e1e",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    outline: "none",
    fontSize: "1rem",
  },
  inputDark: {
    flex: 1,
    padding: "0.5rem",
    border: "1px solid #444",
    borderRadius: "0.5rem",
    outline: "none",
    fontSize: "1rem",
    backgroundColor: "#2a2a2a",
    color: "#eee",
  },
  sendBtn: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
  sendBtnDark: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    cursor: "pointer",
  },
}
