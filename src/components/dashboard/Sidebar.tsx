"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/services/api";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  Sun,
  Moon,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const navLinks = [
  { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/instructor/courses", icon: BookOpen },
  { name: "Students", href: "/instructor/students", icon: Users },
  { name: "Grading", href: "/instructor/grading", icon: GraduationCap },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Settings", href: "/instructor/settings", icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = api.auth.getUser();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const displayName = user?.full_name || "Instructor";
  const displaySub = user?.department || "GradeFlow";
  const initials = user?.full_name ? getInitials(user.full_name) : "IN";

  function handleLogout() {
    api.auth.logout();
    router.push("/login");
  }

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? "w-[72px]" : "w-[260px]"}
        bg-[var(--bg-sidebar)] border-r`}
      style={{ borderColor: "var(--border-color)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 flex-shrink-0" style={{ borderBottom: "1px solid var(--border-color)" }}>
        <Link href="/instructor/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          {!collapsed && <span className="text-lg font-bold truncate" style={{ color: "var(--text-primary)" }}>GradeFlow</span>}
        </Link>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg transition-colors hover:bg-[var(--hover-bg)]"
          style={{ color: "var(--text-secondary)" }}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/instructor/dashboard" && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              title={collapsed ? link.name : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "hover:bg-[var(--hover-bg)]"
                }`}
              style={!isActive ? { color: "var(--text-secondary)" } : undefined}
            >
              <link.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-white" : ""}`} />
              {!collapsed && <span className="truncate">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 px-3 pb-4 space-y-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--hover-bg)]`}
          style={{ color: "var(--text-secondary)" }}
        >
          {isDark ? <Sun className="w-[18px] h-[18px] flex-shrink-0" /> : <Moon className="w-[18px] h-[18px] flex-shrink-0" />}
          {!collapsed && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border-color)" }} className="mx-1" />

        {/* Profile */}
        <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{displayName}</p>
              <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>{displaySub}</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-red-500 hover:bg-red-500/10"
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
