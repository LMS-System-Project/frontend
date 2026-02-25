"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Bell, Search, ChevronRight, Settings, Command } from "lucide-react";

interface DashboardShellProps {
  role: "student" | "instructor" | "admin";
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
}

const BREADCRUMB_LABELS: Record<string, string> = {
  student: "Student Portal",
  instructor: "Faculty Portal",
  admin: "System Administration",
};

export default function DashboardShell({
  role,
  children,
  pageTitle,
  pageSubtitle,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) setCollapsed(saved === "true");
  }, []);

  const handleToggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar role={role} collapsed={collapsed} onToggle={handleToggle} />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-h-screen ${collapsed ? "ml-20" : "ml-64"
          }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{BREADCRUMB_LABELS[role]}</span>
            {pageTitle && (
              <>
                <ChevronRight size={14} className="text-slate-300" />
                <span className="text-sm font-bold text-primary-text tracking-tight">{pageTitle}</span>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-md group focus-within:bg-white focus-within:border-accent transition-all cursor-pointer">
              <Search size={16} className="text-slate-400 group-focus-within:text-accent" />
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400 group-focus-within:text-slate-600">Search platform...</span>
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400">⌘</span>
                  <span className="text-[10px] font-bold text-slate-400">K</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 h-6">
              {/* Notifications */}
              <button className="relative p-1 text-slate-400 hover:text-accent transition-colors group">
                <Bell size={20} />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
              </button>

              <div className="w-px h-full bg-slate-200 mx-1" />

              {/* Quick Settings */}
              <button className="p-1 text-slate-400 hover:text-accent transition-colors">
                <Settings size={20} />
              </button>
            </div>

            {/* Role Badge */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${role === 'student' ? "bg-blue-50 border-blue-100 text-blue-600" :
              role === 'instructor' ? "bg-green-50 border-green-100 text-green-600" :
                "bg-slate-900 border-slate-800 text-white"
              }`}>
              {role === 'instructor' ? 'teacher' : role} portal
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-8">
          <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
