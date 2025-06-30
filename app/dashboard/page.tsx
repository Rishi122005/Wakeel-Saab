"use client";

import { Header } from "@/components/header";
import {
  Calendar,
  Clock,
  FileText,
  MessageCircle,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import React from "react";

// Define types
type Appointment = {
  id: number;
  lawyer: string;
  type: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending";
};

type Document = {
  id: number;
  name: string;
  type: string;
  status: "Completed" | "In Review" | "Draft";
  date: string;
};

type Chat = {
  id: number;
  topic: string;
  date: string;
  messages: number;
};

type Stat = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
};

// Data
const upcoming: Appointment[] = [
  {
    id: 1,
    lawyer: "Sarah Johnson",
    type: "Consultation",
    date: "2024-01-20",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    lawyer: "Michael Chen",
    type: "Document Review",
    date: "2024-01-22",
    time: "2:30 PM",
    status: "Pending",
  },
];

const recent: Document[] = [
  {
    id: 1,
    name: "Employment Contract - John Doe",
    type: "Contract",
    status: "Completed",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "NDA - Tech Partnership",
    type: "Agreement",
    status: "In Review",
    date: "2024-01-14",
  },
  {
    id: 3,
    name: "Lease Agreement Draft",
    type: "Contract",
    status: "Draft",
    date: "2024-01-13",
  },
];

const chats: Chat[] = [
  {
    id: 1,
    topic: "Employment Law Question",
    date: "2024-01-16",
    messages: 8,
  },
  {
    id: 2,
    topic: "Contract Review Inquiry",
    date: "2024-01-15",
    messages: 12,
  },
  {
    id: 3,
    topic: "Real Estate Legal Advice",
    date: "2024-01-14",
    messages: 6,
  },
];

const stats: Stat[] = [
  {
    title: "Total Consultations",
    value: "12",
    change: "+2 this month",
    icon: Users,
    color: "#3b82f6",
  },
  {
    title: "Documents Generated",
    value: "8",
    change: "+3 this week",
    icon: FileText,
    color: "#10b981",
  },
  {
    title: "Chat Sessions",
    value: "24",
    change: "+5 this week",
    icon: MessageCircle,
    color: "#8b5cf6",
  },
  {
    title: "Active Cases",
    value: "3",
    change: "No change",
    icon: TrendingUp,
    color: "#f97316",
  },
];

// Status helpers
const getStatusColor = (status: string): string => {
  switch (status) {
    case "Confirmed":
      return "#dcfce7";
    case "Pending":
      return "#fef9c3";
    case "Completed":
      return "#dbeafe";
    case "In Review":
      return "#ede9fe";
    case "Draft":
      return "#f3f4f6";
    default:
      return "#f3f4f6";
  }
};

const getStatusIcon = (status: string): React.ReactElement => {
  switch (status) {
    case "Confirmed":
    case "Completed":
      return <CheckCircle size={16} />;
    case "Pending":
    case "In Review":
    case "Draft":
      return <AlertCircle size={16} />;
    default:
      return <Clock size={16} />;
  }
};

export default function DashboardPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Header />
      <div className="container" style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Dashboard</h1>
        <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
          Welcome back! Here's an overview of your legal activities.
        </p>

        {/* Stats Grid */}
        <div className="grid stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="card">
              <div className="card-content flex-between">
                <div>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{stat.title}</p>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{stat.value}</h2>
                  <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{stat.change}</p>
                </div>
                <stat.icon size={32} color={stat.color} />
              </div>
            </div>
          ))}
        </div>

        {/* Appointments + Documents */}
        <div className="grid section-grid" style={{ marginTop: "2rem" }}>
          <div className="card">
            <div className="card-content">
              <div className="flex-between" style={{ marginBottom: "1rem" }}>
                <h3><Calendar size={20} /> Upcoming Appointments</h3>
              </div>
              {upcoming.map((a) => (
                <div key={a.id} className="status-box flex-between" style={{ marginBottom: "1rem" }}>
                  <div>
                    <strong>{a.lawyer}</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{a.type}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{a.date} • {a.time}</p>
                  </div>
                  <span
                    style={{
                      background: getStatusColor(a.status),
                      padding: "4px 8px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {getStatusIcon(a.status)} {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="flex-between" style={{ marginBottom: "1rem" }}>
                <h3><FileText size={20} /> Recent Documents</h3>
              </div>
              {recent.map((d) => (
                <div key={d.id} className="status-box flex-between" style={{ marginBottom: "1rem" }}>
                  <div>
                    <strong>{d.name}</strong>
                    <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{d.type}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{d.date}</p>
                  </div>
                  <span
                    style={{
                      background: getStatusColor(d.status),
                      padding: "4px 8px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {getStatusIcon(d.status)} {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Chats */}
        <div className="card" style={{ marginTop: "2rem" }}>
          <div className="card-content">
            <div className="flex-between" style={{ marginBottom: "1rem" }}>
              <h3><MessageCircle size={20} /> Recent Chats</h3>
            </div>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              {chats.map((chat) => (
                <div key={chat.id} className="status-box">
                  <strong>{chat.topic}</strong>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
                    {chat.date} • {chat.messages} messages
                  </p>
                  <button style={{ marginTop: "8px" }}>Continue Chat</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
