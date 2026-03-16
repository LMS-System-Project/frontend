"use client";

import { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  ShieldCheck,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/services/api";

interface DashboardStats {
  total_students: number;
  total_instructors: number;
  total_admins: number;
  active_courses: number;
  draft_courses: number;
  total_assignments: number;
  total_submissions: number;
  graded_submissions: number;
  pending_submissions: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await api.admin.dashboard();
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <AlertTriangle className="text-red-500" size={40} />
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  const s = stats!;

  const cards = [
    { label: "Students", value: s.total_students, icon: Users, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/students?role=student" },
    { label: "Instructors", value: s.total_instructors, icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-50", href: "/admin/students?role=instructor" },
    { label: "Admins", value: s.total_admins, icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50", href: "/admin/students?role=admin" },
    { label: "Active Courses", value: s.active_courses, icon: BookOpen, color: "text-slate-600", bg: "bg-slate-100", href: "/admin/courses" },
    { label: "Assignments", value: s.total_assignments, icon: FileText, color: "text-amber-600", bg: "bg-amber-50", href: "#" },
    { label: "Submissions", value: s.total_submissions, icon: TrendingUp, color: "text-cyan-600", bg: "bg-cyan-50", href: "#" },
    { label: "Graded", value: s.graded_submissions, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", href: "#" },
    { label: "Pending Review", value: s.pending_submissions, icon: Clock, color: "text-red-600", bg: "bg-red-50", href: "#" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
          <ShieldCheck size={14} className="text-accent" />
          <span>Administrator</span>
        </div>
        <h1 className="text-4xl font-bold text-primary-text tracking-tight mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Platform-wide overview of users, courses, and submissions.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link href={card.href}>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 ${card.bg} ${card.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <card.icon size={20} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-text tracking-tighter mb-1">
                  {card.value}
                </div>
                <div className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">
                  {card.label}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-accent transition-colors" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/students">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
              <h3 className="text-sm font-bold text-primary-text uppercase tracking-wide">Manage Users</h3>
            </div>
            <p className="text-xs text-slate-500">Add, edit, or remove student and instructor accounts.</p>
          </div>
        </Link>
        <Link href="/admin/courses">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen size={20} />
              </div>
              <h3 className="text-sm font-bold text-primary-text uppercase tracking-wide">View Courses</h3>
            </div>
            <p className="text-xs text-slate-500">Browse all courses, see enrollment counts and instructor details.</p>
          </div>
        </Link>
        <Link href="/admin/content">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <h3 className="text-sm font-bold text-primary-text uppercase tracking-wide">Content</h3>
            </div>
            <p className="text-xs text-slate-500">Review uploaded materials, documents, and course content.</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
