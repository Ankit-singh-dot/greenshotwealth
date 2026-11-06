"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";

interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface QuizLead {
  id: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  totalScore: number;
  level: string;
  answersJson: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  source: string;
  active: boolean;
  createdAt: string;
}

interface Stats {
  totalContacts: number;
  newContacts: number;
  totalQuizzes: number;
  totalNewsletters: number;
}

export default function AdminPortalPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; role: string } | null>(null);

  // Login Form States
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard Data States
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    newContacts: 0,
    totalQuizzes: 0,
    totalNewsletters: 0,
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [quizzes, setQuizzes] = useState<QuizLead[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // UI Tabs & Filters
  const [activeTab, setActiveTab] = useState<"contacts" | "quizzes" | "newsletters">("contacts");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modals
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizLead | null>(null);
  const [contactNote, setContactNote] = useState("");
  const [quizNote, setQuizNote] = useState("");

  // Change Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  // Check auth status
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me");
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        loadData();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Load Dashboard Data
  const loadData = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setContacts(data.contacts);
        setQuizzes(data.quizzes);
        setSubscribers(data.newsletters);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setIsAuthenticated(true);
      setCurrentUser(data.user);
      setLoginPassword("");
      loadData();
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Invalid credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
      setCurrentUser(null);
    }
  };

  // Update Contact Status or Note
  const handleUpdateContact = async (id: string, updates: Partial<Contact>) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
        );
        if (selectedContact && selectedContact.id === id) {
          setSelectedContact({ ...selectedContact, ...updates });
        }
      }
    } catch (err) {
      console.error("Failed to update contact:", err);
    }
  };

  // Delete Contact
  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        if (selectedContact?.id === id) setSelectedContact(null);
      }
    } catch (err) {
      console.error("Failed to delete contact:", err);
    }
  };

  // Update Quiz Status or Note
  const handleUpdateQuiz = async (id: string, updates: Partial<QuizLead>) => {
    try {
      const res = await fetch(`/api/admin/quiz/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        setQuizzes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
        );
        if (selectedQuiz && selectedQuiz.id === id) {
          setSelectedQuiz({ ...selectedQuiz, ...updates });
        }
      }
    } catch (err) {
      console.error("Failed to update quiz:", err);
    }
  };

  // Delete Quiz
  const handleDeleteQuiz = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz record?")) return;
    try {
      const res = await fetch(`/api/admin/quiz/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQuizzes((prev) => prev.filter((q) => q.id !== id));
        if (selectedQuiz?.id === id) setSelectedQuiz(null);
      }
    } catch (err) {
      console.error("Failed to delete quiz:", err);
    }
  };

  // Delete Subscriber
  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Remove this email from the subscriber list?")) return;
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");

    if (newPass !== confirmPass) {
      setPassError("New passwords do not match.");
      return;
    }
    if (newPass.length < 8) {
      setPassError("Password must be at least 8 characters long.");
      return;
    }

    setPassLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: currentPass,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to change password.");

      setPassSuccess("Password updated successfully!");
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
      setTimeout(() => setShowPasswordModal(false), 1500);
    } catch (err: unknown) {
      setPassError(err instanceof Error ? err.message : "Error updating password.");
    } finally {
      setPassLoading(false);
    }
  };

  // Filtered Contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.service && c.service.toLowerCase().includes(q)) ||
        (c.message && c.message.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [contacts, statusFilter, searchQuery]);

  // Filtered Quizzes
  const filteredQuizzes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return quizzes.filter((qz) => {
      if (!q) return true;
      return (
        (qz.fullName && qz.fullName.toLowerCase().includes(q)) ||
        (qz.email && qz.email.toLowerCase().includes(q)) ||
        (qz.phone && qz.phone.includes(q)) ||
        qz.level.toLowerCase().includes(q)
      );
    });
  }, [quizzes, searchQuery]);

  // Filtered Subscribers
  const filteredSubscribers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return subscribers.filter((s) => !q || s.email.toLowerCase().includes(q));
  }, [subscribers, searchQuery]);

  // CSV Export helpers
  const exportContactsCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Service", "Status", "Message", "Notes"];
    const rows = filteredContacts.map((c) => [
      new Date(c.createdAt).toLocaleString("en-IN"),
      `"${c.fullName.replace(/"/g, '""')}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      `"${(c.service || "").replace(/"/g, '""')}"`,
      c.status,
      `"${(c.message || "").replace(/"/g, '""')}"`,
      `"${(c.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `green_shoots_contacts_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportQuizzesCSV = () => {
    const headers = ["Date", "Name", "Phone", "Email", "Score", "Level", "Status"];
    const rows = filteredQuizzes.map((q) => [
      new Date(q.createdAt).toLocaleString("en-IN"),
      `"${(q.fullName || "Anonymous").replace(/"/g, '""')}"`,
      `"${q.phone || ""}"`,
      `"${q.email || ""}"`,
      q.totalScore,
      `"${q.level.replace(/"/g, '""')}"`,
      q.status,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `green_shoots_quiz_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportSubscribersCSV = () => {
    const headers = ["Date", "Email", "Source", "Active"];
    const rows = filteredSubscribers.map((s) => [
      new Date(s.createdAt).toLocaleString("en-IN"),
      `"${s.email}"`,
      s.source,
      s.active ? "Yes" : "No",
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `green_shoots_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-[#1F3A2C] text-sm font-medium animate-pulse">
          Connecting to security portal...
        </div>
      </div>
    );
  }

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1F3A2C] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden font-sans">
        {/* Subtle background glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#8fa868]/10 blur-3xl pointer-events-none -top-20 -left-20" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#c5a963]/10 blur-3xl pointer-events-none -bottom-20 -right-20" />

        <div className="max-w-md w-full relative z-10">
          <div className="bg-[#183124] border border-[#2b4c3b] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-white/10 mx-auto flex items-center justify-center border border-white/20">
                <Image
                  src="/footer_logo.png"
                  alt="Green Shoots Wealth"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <h1 className="brand-logo-text text-white text-lg tracking-wide pt-2">
                Green Shoot Wealth
              </h1>
              <p className="text-xs text-[#a9beaf]">
                Secure Administrative Portal · Internal Access Only
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 bg-rose-900/40 border border-rose-700/60 rounded-xl text-rose-200 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#cde0d2] mb-1.5">
                  Administrator Username
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-xl bg-black/20 border border-[#2e523f] text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#8fa868]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#cde0d2] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl bg-black/20 border border-[#2e523f] text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#8fa868]"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 px-4 bg-[#8fa868] hover:bg-[#9db973] disabled:opacity-50 text-[#1F3A2C] font-semibold text-sm rounded-xl transition-all shadow-md cursor-pointer mt-2"
              >
                {loginLoading ? "Authenticating..." : "Sign In to Portal"}
              </button>
            </form>

            <div className="pt-2 text-center border-t border-white/10">
              <p className="text-[11px] text-[#7d9985]">
                Encrypted via HTTP-only salted sessions. All access logged.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1F3A2C] font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1F3A2C] text-white border-b border-[#294c39] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/footer_logo.png"
              alt="Green Shoots"
              width={28}
              height={28}
              className="object-contain"
            />
            <div className="flex items-baseline gap-2">
              <span className="brand-logo-text text-white text-sm">
                Green Shoot Wealth
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#c5a963] font-semibold bg-white/10 px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#a9beaf] hidden sm:inline">
              Signed in as <strong className="text-white">{currentUser?.username}</strong>
            </span>
            <button
              onClick={() => {
                setShowPasswordModal(true);
                setPassError("");
                setPassSuccess("");
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#cfded5] border border-white/10 transition-colors"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="text-xs px-3.5 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-100 border border-rose-700/60 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#e5dfd3] shadow-xs">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#73887a]">
              Total Inquiries
            </span>
            <div className="text-3xl font-bold font-sans text-[#1F3A2C] mt-1">
              {stats.totalContacts}
            </div>
            <div className="text-xs text-[#8fa868] font-medium mt-1">
              {stats.newContacts} pending review
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#e5dfd3] shadow-xs">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#73887a]">
              New / Unread
            </span>
            <div className="text-3xl font-bold font-sans text-amber-600 mt-1">
              {stats.newContacts}
            </div>
            <div className="text-xs text-gray-500 mt-1">Direct inquiries</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#e5dfd3] shadow-xs">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#73887a]">
              Quiz Leads
            </span>
            <div className="text-3xl font-bold font-sans text-[#1F3A2C] mt-1">
              {stats.totalQuizzes}
            </div>
            <div className="text-xs text-gray-500 mt-1">Wealth score assessments</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#e5dfd3] shadow-xs">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#73887a]">
              Newsletter
            </span>
            <div className="text-3xl font-bold font-sans text-[#1F3A2C] mt-1">
              {stats.totalNewsletters}
            </div>
            <div className="text-xs text-gray-500 mt-1">Active subscribers</div>
          </div>
        </div>

        {/* Tab Selection & Search Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#e5dfd3] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F5F1E8] rounded-xl border border-[#e8e2d4]">
            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "contacts"
                  ? "bg-[#1F3A2C] text-white shadow-xs"
                  : "text-[#5d7064] hover:text-[#1F3A2C]"
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "quizzes"
                  ? "bg-[#1F3A2C] text-white shadow-xs"
                  : "text-[#5d7064] hover:text-[#1F3A2C]"
              }`}
            >
              Wealth Score Leads ({quizzes.length})
            </button>
            <button
              onClick={() => setActiveTab("newsletters")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "newsletters"
                  ? "bg-[#1F3A2C] text-white shadow-xs"
                  : "text-[#5d7064] hover:text-[#1F3A2C]"
              }`}
            >
              Newsletter ({subscribers.length})
            </button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="w-full sm:w-64 pl-3.5 pr-8 py-2 rounded-xl bg-[#faf8f5] border border-[#ded8cb] text-xs text-[#1F3A2C] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Status Filter for Contacts */}
            {activeTab === "contacts" && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#ded8cb] text-xs text-[#1F3A2C] focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
              </select>
            )}

            {/* Export CSV Button */}
            <button
              onClick={() => {
                if (activeTab === "contacts") exportContactsCSV();
                else if (activeTab === "quizzes") exportQuizzesCSV();
                else exportSubscribersCSV();
              }}
              className="px-3.5 py-2 rounded-xl bg-[#EEF0D9] hover:bg-[#e2e6c5] text-[#1F3A2C] text-xs font-semibold border border-[#d8deb5] transition-colors whitespace-nowrap cursor-pointer"
            >
              Export CSV ↓
            </button>

            <button
              onClick={loadData}
              disabled={loadingData}
              title="Refresh Data"
              className="p-2 rounded-xl bg-[#faf8f5] border border-[#ded8cb] hover:bg-[#f0ebe0] text-[#1F3A2C] text-xs"
            >
              🔄
            </button>
          </div>
        </div>

        {/* TAB 1: CONTACT SUBMISSIONS */}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-2xl border border-[#e5dfd3] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f5ee] border-b border-[#e5dfd3] text-[#63796c] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Client Name</th>
                    <th className="py-3.5 px-4">Phone &amp; Email</th>
                    <th className="py-3.5 px-4">Service</th>
                    <th className="py-3.5 px-4">Message</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ebe0]">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-400">
                        No contact inquiries found.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((c) => (
                      <tr key={c.id} className="hover:bg-[#faf9f5] transition-colors">
                        <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                          {new Date(c.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                          <span className="block text-[10px] text-gray-400">
                            {new Date(c.createdAt).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#1F3A2C] whitespace-nowrap">
                          {c.fullName}
                        </td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`tel:${c.phone}`}
                            className="font-medium text-[#1F3A2C] hover:underline block"
                          >
                            {c.phone}
                          </a>
                          <a
                            href={`mailto:${c.email}`}
                            className="text-gray-500 hover:text-black block text-[11px]"
                          >
                            {c.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 text-[#495c51]">
                          <span className="px-2 py-0.5 rounded-md bg-[#EEF0D9] text-[#1F3A2C] text-[11px] font-medium inline-block">
                            {c.service || "General Inquiry"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-gray-600">
                          {c.message || "—"}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={c.status}
                            onChange={(e) => handleUpdateContact(c.id, { status: e.target.value })}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border focus:outline-none cursor-pointer ${
                              c.status === "NEW"
                                ? "bg-amber-50 text-amber-800 border-amber-300"
                                : c.status === "CONTACTED"
                                ? "bg-blue-50 text-blue-800 border-blue-300"
                                : c.status === "IN_PROGRESS"
                                ? "bg-purple-50 text-purple-800 border-purple-300"
                                : "bg-emerald-50 text-emerald-800 border-emerald-300"
                            }`}
                          >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="CLOSED">Closed</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedContact(c);
                              setContactNote(c.notes || "");
                            }}
                            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: WEALTH SCORE QUIZ LEADS */}
        {activeTab === "quizzes" && (
          <div className="bg-white rounded-2xl border border-[#e5dfd3] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f5ee] border-b border-[#e5dfd3] text-[#63796c] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Lead Name</th>
                    <th className="py-3.5 px-4">Phone &amp; Email</th>
                    <th className="py-3.5 px-4">Score</th>
                    <th className="py-3.5 px-4">Resilience Tier</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ebe0]">
                  {filteredQuizzes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-400">
                        No wealth score submissions found.
                      </td>
                    </tr>
                  ) : (
                    filteredQuizzes.map((q) => (
                      <tr key={q.id} className="hover:bg-[#faf9f5] transition-colors">
                        <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                          {new Date(q.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#1F3A2C]">
                          {q.fullName || (
                            <span className="text-gray-400 italic">Anonymous Assessment</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          {q.phone ? (
                            <a href={`tel:${q.phone}`} className="font-medium text-[#1F3A2C] block">
                              {q.phone}
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                          {q.email && (
                            <a href={`mailto:${q.email}`} className="text-gray-500 text-[11px] block">
                              {q.email}
                            </a>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-sm text-[#1F3A2C]">
                            {q.totalScore}
                          </span>
                          <span className="text-gray-400 text-[10px]">/100</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EEF0D9] text-[#1F3A2C]">
                            {q.level}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={q.status}
                            onChange={(e) => handleUpdateQuiz(q.id, { status: e.target.value })}
                            className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-gray-300 bg-white focus:outline-none cursor-pointer"
                          >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="ARCHIVED">Archived</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedQuiz(q);
                              setQuizNote(q.notes || "");
                            }}
                            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs transition-colors"
                          >
                            Breakdown
                          </button>
                          <button
                            onClick={() => handleDeleteQuiz(q.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: NEWSLETTER SUBSCRIBERS */}
        {activeTab === "newsletters" && (
          <div className="bg-white rounded-2xl border border-[#e5dfd3] shadow-xs overflow-hidden">
            <div className="p-4 bg-[#f8f5ee] border-b border-[#e5dfd3] flex items-center justify-between">
              <span className="text-xs text-[#5d7064] font-medium">
                {filteredSubscribers.length} total subscribers
              </span>
              <button
                onClick={() => {
                  const emails = filteredSubscribers.map((s) => s.email).join(", ");
                  navigator.clipboard.writeText(emails);
                  alert("Copied all subscriber emails to clipboard!");
                }}
                className="text-xs px-3 py-1 rounded-lg bg-white border border-[#ded8cb] hover:bg-gray-50 text-[#1F3A2C] font-medium"
              >
                Copy All Emails
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f5ee] border-b border-[#e5dfd3] text-[#63796c] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Date Joined</th>
                    <th className="py-3.5 px-4">Subscriber Email</th>
                    <th className="py-3.5 px-4">Source</th>
                    <th className="py-3.5 px-4">Active</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ebe0]">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-12 text-gray-400">
                        No newsletter subscribers found.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((s) => (
                      <tr key={s.id} className="hover:bg-[#faf9f5] transition-colors">
                        <td className="py-3.5 px-4 text-gray-500 whitespace-nowrap">
                          {new Date(s.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#1F3A2C]">
                          <a href={`mailto:${s.email}`} className="hover:underline">
                            {s.email}
                          </a>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 capitalize">{s.source}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Active
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(s.id)}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs transition-colors"
                          >
                            Unsubscribe / Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* DETAIL MODAL: CONTACT SUBMISSION */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#ded8cb] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#bda15f]">
                  Consultation Details
                </span>
                <h3 className="font-serif text-2xl text-[#1F3A2C] mt-1">
                  {selectedContact.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-[#F5F1E8] p-4 rounded-2xl border border-[#e8e2d4]">
              <div>
                <span className="text-gray-500 block">Phone</span>
                <a
                  href={`tel:${selectedContact.phone}`}
                  className="font-semibold text-[#1F3A2C] hover:underline"
                >
                  {selectedContact.phone}
                </a>
              </div>
              <div>
                <span className="text-gray-500 block">Email</span>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="font-semibold text-[#1F3A2C] hover:underline"
                >
                  {selectedContact.email}
                </a>
              </div>
              <div>
                <span className="text-gray-500 block">Service Interested</span>
                <span className="font-semibold text-[#1F3A2C]">
                  {selectedContact.service || "General"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Received At</span>
                <span className="font-semibold text-[#1F3A2C]">
                  {new Date(selectedContact.createdAt).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                Client Message
              </span>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {selectedContact.message || "No message provided."}
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                Internal Adviser Notes
              </span>
              <textarea
                rows={3}
                value={contactNote}
                onChange={(e) => setContactNote(e.target.value)}
                placeholder="Add meeting notes, follow-up timeline, etc..."
                className="w-full p-3 rounded-xl border border-gray-200 text-xs text-[#1F3A2C] focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
              />
              <button
                onClick={() => handleUpdateContact(selectedContact.id, { notes: contactNote })}
                className="mt-2 px-3 py-1.5 bg-[#1F3A2C] hover:bg-[#15291f] text-white text-xs font-medium rounded-lg transition-colors"
              >
                Save Notes
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <select
                  value={selectedContact.status}
                  onChange={(e) => handleUpdateContact(selectedContact.id, { status: e.target.value })}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL: WEALTH SCORE BREAKDOWN */}
      {selectedQuiz && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#ded8cb] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#bda15f]">
                  Wealth Score Assessment
                </span>
                <h3 className="font-serif text-2xl text-[#1F3A2C] mt-1">
                  {selectedQuiz.fullName || "Anonymous Lead"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 bg-[#F5F1E8] p-4 rounded-2xl border border-[#e8e2d4]">
              <div className="text-center px-4 border-r border-[#ded8cb]">
                <div className="text-3xl font-bold font-sans text-[#1F3A2C]">
                  {selectedQuiz.totalScore}
                  <span className="text-xs text-gray-400 font-normal">/100</span>
                </div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Score</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-[#1F3A2C]">{selectedQuiz.level}</h4>
                <p className="text-xs text-gray-600">
                  {selectedQuiz.phone && `Phone: ${selectedQuiz.phone} · `}
                  {selectedQuiz.email && `Email: ${selectedQuiz.email}`}
                </p>
              </div>
            </div>

            {/* Answer breakdown if present */}
            {selectedQuiz.answersJson && (
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Question Breakdown
                </span>
                <div className="space-y-2 text-xs">
                  {JSON.parse(selectedQuiz.answersJson).map(
                    (a: { question: string; score: number }, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between"
                      >
                        <span className="text-gray-700 flex-1 pr-4">{a.question}</span>
                        <span className="font-bold text-[#1F3A2C] shrink-0 bg-white px-2 py-1 rounded border">
                          +{a.score} pts
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Internal Notes */}
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                Adviser Follow-up Notes
              </span>
              <textarea
                rows={3}
                value={quizNote}
                onChange={(e) => setQuizNote(e.target.value)}
                placeholder="Client risk appetite notes..."
                className="w-full p-3 rounded-xl border border-gray-200 text-xs text-[#1F3A2C] focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
              />
              <button
                onClick={() => handleUpdateQuiz(selectedQuiz.id, { notes: quizNote })}
                className="mt-2 px-3 py-1.5 bg-[#1F3A2C] hover:bg-[#15291f] text-white text-xs font-medium rounded-lg transition-colors"
              >
                Save Notes
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <select
                  value={selectedQuiz.status}
                  onChange={(e) => handleUpdateQuiz(selectedQuiz.id, { status: e.target.value })}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-[#ded8cb]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-xl text-[#1F3A2C]">Change Password</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Update administrative credentials. Will be hashed with 12 salt rounds.
                </p>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {passError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs">
                {passError}
              </div>
            )}
            {passSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs">
                {passSuccess}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  New Password (min 8 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1F3A2C]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passLoading}
                  className="px-4 py-2 rounded-xl bg-[#1F3A2C] hover:bg-[#172e23] disabled:opacity-50 text-white text-xs font-semibold cursor-pointer"
                >
                  {passLoading ? "Updating..." : "Save Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

