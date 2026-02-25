"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  BarChart2,
  MessageSquare,
  Compass,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  Sun,
  Moon,
  Brain,
  Layout,
  FileText,
  Briefcase,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

interface SidebarProps {
  role: "student" | "instructor" | "admin";
  collapsed: boolean;
  onToggle: () => void;
}

const NAV_BY_ROLE = {
  student: [
    { name: "Overview", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "My Courses", href: "/student/courses", icon: BookOpen },
    { name: "Assignments", href: "/student/assignments", icon: FileText },
    { name: "Academic Bot", href: "/student/ai-assistant", icon: MessageSquare },
    { name: "Smart Planner", href: "/student/planner", icon: Calendar },
    { name: "Collab Mesh", href: "/student/collab", icon: Users },
    { name: "Career Hub", href: "/student/career", icon: Compass },
    { name: "Doubt Solver", href: "/student/ai-assistant", icon: Brain },
  ],
  instructor: [
    { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
    { name: "Curriculum", href: "/instructor/courses", icon: BookOpen },
    { name: "Attendance", href: "/instructor/students", icon: Users },
    { name: "Evaluations", href: "/instructor/grading", icon: GraduationCap },
    { name: "AI Gen Lab", href: "/instructor/assessments/generate", icon: Brain },
    { name: "Insights", href: "/analytics", icon: BarChart2 },
  ],
  admin: [
    { name: "System Control", href: "/admin/dashboard", icon: ShieldCheck },
    { name: "User Management", href: "/admin/students", icon: Users },
    { name: "Content", href: "/admin/content", icon: Layout },
    { name: "Trust Ledger", href: "/admin/verification", icon: ShieldCheck },
    { name: "AI Verification", href: "/admin/ai-tools", icon: Brain },
  ],
};

const ROLE_LABELS: Record<string, string> = {
  student: "Student",
  instructor: "Lead Faculty",
  admin: "System Admin",
};

export default function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  const navLinks = NAV_BY_ROLE[role] || NAV_BY_ROLE.student;

  const handleLogout = () => {
    // Logic to clear session
    router.push("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 bg-accent transition-all duration-300 border-r border-slate-800 flex flex-col ${collapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Institutional Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="bg-white p-1.5 rounded flex-shrink-0">
            <BookOpen size={18} className="text-accent" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-sm">GradeFlow</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Institutional</span>
            </div>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-all hidden md:block"
        >
          <ChevronLeft size={16} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="px-6 py-4">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Access Level</div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-tight">{ROLE_LABELS[role]}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group ${isActive
                ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
            >
              <link.icon size={20} className={isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"} />
              {!collapsed && (
                <span className="text-sm font-semibold tracking-tight">{link.name}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <button
          onClick={() => router.push(`/${role}/settings`)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group"
        >
          <Settings size={20} className="text-slate-500 group-hover:text-slate-300" />
          {!collapsed && <span className="text-sm font-semibold tracking-tight">Settings</span>}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all group"
        >
          <LogOut size={20} className="text-red-400/50 group-hover:text-red-400" />
          {!collapsed && <span className="text-sm font-semibold tracking-tight">Logout</span>}
        </button>
      </div>

      {/* Profile Mini Header */}
      {!collapsed && (
        <div className="p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-white border border-slate-700">
              SV
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate px-1">Sneha Varghese</p>
              <p className="text-[10px] text-slate-500 truncate px-1 uppercase tracking-wider font-bold">Standard Tier</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
