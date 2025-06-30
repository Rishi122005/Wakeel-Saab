"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { FileText, Download, Eye, Plus, Search, Sun, Moon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Template = {
  id: number;
  name: string;
  category: string;
  description: string;
  fields: string[];
};

type UserDoc = {
  id: number;
  name: string;
  template: string;
  status: string;
  lastModified: string;
  size: string;
};

const documentTemplates: Template[] = [
  {
    id: 1,
    name: "Non-Disclosure Agreement",
    category: "Business",
    description: "Protect confidential information in business relationships",
    fields: ["Party Names", "Confidential Information", "Duration", "Jurisdiction"],
  },
  {
    id: 2,
    name: "Employment Contract",
    category: "Employment",
    description: "Standard employment agreement template",
    fields: ["Employee Name", "Position", "Salary", "Start Date", "Benefits"],
  },
  {
    id: 3,
    name: "Rental Agreement",
    category: "Real Estate",
    description: "Residential property rental contract",
    fields: ["Landlord", "Tenant", "Property Address", "Rent Amount", "Lease Term"],
  },
  {
    id: 4,
    name: "Power of Attorney",
    category: "Personal",
    description: "Grant legal authority to another person",
    fields: ["Principal", "Agent", "Powers Granted", "Duration", "Witnesses"],
  },
  {
    id: 5,
    name: "Business Partnership Agreement",
    category: "Business",
    description: "Define partnership terms and responsibilities",
    fields: ["Partners", "Business Purpose", "Capital Contributions", "Profit Sharing"],
  },
  {
    id: 6,
    name: "Will and Testament",
    category: "Estate Planning",
    description: "Basic will template for estate planning",
    fields: ["Testator", "Beneficiaries", "Assets", "Executor", "Witnesses"],
  },
];

const userDocuments: UserDoc[] = [
  {
    id: 1,
    name: "My NDA - Tech Startup",
    template: "Non-Disclosure Agreement",
    status: "Draft",
    lastModified: "2024-01-15",
    size: "2.3 KB",
  },
  {
    id: 2,
    name: "Employment Contract - John Doe",
    template: "Employment Contract",
    status: "Completed",
    lastModified: "2024-01-14",
    size: "4.1 KB",
  },
  {
    id: 3,
    name: "Apartment Lease Agreement",
    template: "Rental Agreement",
    status: "In Review",
    lastModified: "2024-01-13",
    size: "3.7 KB",
  },
];

const categories = [
  "All Categories",
  "Business",
  "Employment",
  "Real Estate",
  "Personal",
  "Estate Planning",
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<"templates" | "my-documents">("templates");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDark = theme === "dark";
    setDarkMode(isDark);
    document.body.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
    localStorage.setItem("theme", newTheme);
  };

  const filteredTemplates = documentTemplates.filter(
    (t) =>

      (selectedCategory === "All Categories" || t.category === selectedCategory)
  );

  const getStatusColor = (status: string) => {
    if (status === "Draft") return "#FBBF24";
    if (status === "Completed") return "#10B981";
    if (status === "In Review") return "#3B82F6";
    return "#9CA3AF";
  };

  return (
    <div className="min-h-screen px-6 md:px-16 py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header />

      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={toggleTheme}>
          {darkMode ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>




      <h1 className="text-3xl font-semibold mb-2">Legal Documents</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Generate, review, and manage your legal documents with ease.
      </p>


        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {["templates", "my-documents"].map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              style={{
                flex: 1,
                padding: "12px",
                fontWeight: 500,
                borderRadius: "6px",
                border: activeTab === key ? "2px solid #4F46E5" : "2px solid transparent",
                background: activeTab === key ? "#EEF2FF" : "#fff",
                cursor: "pointer",
              }}
            >
              {key === "templates" ? "Document Templates" : "My Documents"}
            </button>
          ))}
        </div>

        {activeTab === "templates" && (
          <>
            {/* Search & Filter */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "16px",
                      height: "16px",
                      color: "var(--muted-foreground)"
                    }}
                  />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: "36px" }}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Templates Grid */}
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
            >
              {filteredTemplates.map((t) => (
                <Card key={t.id} style={{ border: "1px solid #E5E7EB", borderRadius: "8px", padding: 0 }}>
                  <CardHeader>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <Badge style={{ marginBottom: "6px", background: "#E0E7FF", color: "#4F46E5" }}>
                          {t.category}
                        </Badge>
                        <CardTitle style={{ fontSize: "1.125rem", margin: "6px 0" }}>
                          {t.name}
                        </CardTitle>
                        <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
                          {t.description}
                        </p>
                      </div>
                      <FileText style={{ fontSize: "24px", color: "#4F46E5" }} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p style={{ fontWeight: 500, marginBottom: "8px" }}>Required Fields:</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {t.fields.slice(0, 3).map((f, i) => (
                        <Badge
                          key={i}
                          style={{ background: "#F3F4F6", color: "#374151", fontSize: "12px", padding: "4px 8px" }}
                        >
                          {f}
                        </Badge>
                      ))}
                      {t.fields.length > 3 && (
                        <Badge style={{ fontSize: "12px", background: "#F3F4F6", color: "#374151", padding: "4px 8px" }}>
                          +{t.fields.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedTemplate(t)}
                            style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1 }}
                          >
                            <Plus /> Generate
                          </Button>
                        </DialogTrigger>
                        <DialogContent style={{ maxWidth: "480px" }}>
                          <DialogHeader>
                            <DialogTitle>
                              Generate "{selectedTemplate?.name}"
                            </DialogTitle>
                          </DialogHeader>
                          {selectedTemplate && (
                            <form style={{ display: "grid", gap: "12px", marginTop: "12px" }}>
                              {selectedTemplate.fields.map((f, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                  <Label htmlFor={f}>{f}</Label>
                                  {f.toLowerCase().includes("description") ? (
                                    <Textarea id={f} placeholder={`Enter ${f}`} />
                                  ) : (
                                    <Input id={f} placeholder={`Enter ${f}`} />
                                  )}
                                </div>
                              ))}
                              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                                <Button style={{ flex: 1 }}>Generate Document</Button>
                                <Button variant="outline">
                                  <Eye /> Preview
                                </Button>
                              </div>
                            </form>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline"><Eye /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === "my-documents" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
                <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                <Input style={{ paddingLeft: "36px" }} placeholder="Search your documents..." />
              </div>
              <Button style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Plus /> New Document
              </Button>
            </div>

            <div style={{ display: "grid", gap: "20px" }}>
              {userDocuments.map((d) => (
                <Card key={d.id}>
                  <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <FileText style={{ fontSize: "24px", color: "#4F46E5" }} />
                      <div>
                        <h3 style={{ fontWeight: 500 }}>{d.name}</h3>
                        <p style={{ fontSize: "14px", color: "#6B7280" }}>Based on "{d.template}"</p>
                        <p style={{ fontSize: "12px", color: "#9CA3AF" }}>
                          Modified: {d.lastModified} • {d.size}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Badge style={{ background: getStatusColor(d.status) + "20", color: getStatusColor(d.status), padding: "6px 12px", borderRadius: "6px", fontSize: "12px" }}>
                        {d.status}
                      </Badge>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Button variant="outline"><Eye /></Button>
                        <Button variant="outline"><Download /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
  )
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        {["templates", "my-documents"].map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex-1 px-4 py-2 font-medium rounded-md ${
              activeTab === key
                ? "border-2 border-indigo-600 bg-indigo-100"
                : "border-2 border-transparent"
            }`}
          >
            {key === "templates" ? "Document Templates" : "My Documents"}
          </button>
        ))}
      </div>

      {activeTab === "templates" && (
        <>
          {/* Search & Filter */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((t) => (
              <Card key={t.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <Badge className="mb-2 bg-indigo-100 text-indigo-700">
                        {t.category}
                      </Badge>
                      <CardTitle className="text-lg">{t.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                    </div>
                    <FileText className="text-indigo-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium mb-2">Required Fields:</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {t.fields.slice(0, 3).map((f, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {f}
                      </Badge>
                    ))}
                    {t.fields.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{t.fields.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedTemplate(t)} className="flex-1">
                          <Plus className="mr-1 w-4 h-4" />
                          Generate
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>
                            Generate "{selectedTemplate?.name}"
                          </DialogTitle>
                        </DialogHeader>
                        {selectedTemplate && (
                          <form className="grid gap-4 mt-4">
                            {selectedTemplate.fields.map((f, i) => (
                              <div key={i} className="flex flex-col gap-1">
                                <Label htmlFor={f}>{f}</Label>
                                {f.toLowerCase().includes("description") ? (
                                  <Textarea id={f} placeholder={`Enter ${f}`} />
                                ) : (
                                  <Input id={f} placeholder={`Enter ${f}`} />
                                )}
                              </div>
                            ))}
                            <div className="flex gap-2 mt-4">
                              <Button className="flex-1">Generate Document</Button>
                              <Button variant="outline">
                                <Eye className="w-4 h-4 mr-1" /> Preview
                              </Button>
                            </div>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === "my-documents" && (
        <>
          <div className="flex justify-between mb-6 flex-wrap gap-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input className="pl-9" placeholder="Search your documents..." />
            </div>
            <Button className="flex gap-2 items-center">
              <Plus className="w-4 h-4" /> New Document
            </Button>
          </div>

          <div className="grid gap-4">
            {userDocuments.map((d) => (
              <Card key={d.id}>
                <CardContent className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <FileText className="text-indigo-500" />
                    <div>
                      <h3 className="font-medium">{d.name}</h3>
                      <p className="text-sm text-muted-foreground">Based on "{d.template}"</p>
                      <p className="text-xs text-gray-500">
                        Modified: {d.lastModified} • {d.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className="text-xs px-3 py-1 rounded-md"
                      style={{
                        background: `${getStatusColor(d.status)}20`,
                        color: getStatusColor(d.status),
                      }}
                    >
                      {d.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="outline"><Eye /></Button>
                      <Button variant="outline"><Download /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      );
    }
  }
