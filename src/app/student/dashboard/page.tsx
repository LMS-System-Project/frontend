"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  FileText,
  TrendingUp,
  Clock,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { api } from "@/services/api";
import { motion } from "framer-motion";
import Link from "next/link";

const statDefaults = [
  { label: "Enrolled Courses", val: "0", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Pending Assignments", val: "0", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Overall Grade", val: "N/A", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Upcoming Deadlines", val: "0", icon: Clock, color: "text-slate-600", bg: "bg-slate-100" },
];

const quickLinks = [
  { label: "Assignments", href: "/student/assignments", icon: FileText, desc: "View and submit your assignments" },
  { label: "Reports", href: "/student/reports", icon: TrendingUp, desc: "Check your grades and progress" },
  { label: "Career", href: "/student/career", icon: ArrowRight, desc: "Explore career opportunities" },
  { label: "AI Assistant", href: "/student/ai-assistant", icon: CheckCircle2, desc: "Get help from your AI tutor" },
];

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(statDefaults);
  const [courses, setCourses] = useState<any[]>([]);
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    async function initDashboard() {
      try {
        const user = api.auth.getUser();
        if (user?.full_name) setUserName(user.full_name);

        const [dashboardData, courseData] = await Promise.all([
          api.student.dashboard(),
          api.student.courses.list(),
        ]);

        setCourses(courseData || []);

        if (dashboardData) {
          setStats([
            { ...statDefaults[0], val: String(dashboardData.enrolled_courses ?? courseData?.length ?? 0) },
            { ...statDefaults[1], val: String(dashboardData.pending_assignments ?? 0) },
            { ...statDefaults[2], val: dashboardData.overall_grade ?? dashboardData.average_grade ?? "N/A" },
            { ...statDefaults[3], val: String(dashboardData.upcoming_deadlines ?? 0) },
          ]);
        }
      } catch (err) {
        console.error("Dashboard init error:", err);
      } finally {
        setLoading(false);
      }
    }
    initDashboard();
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-10">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span>Welcome back</span>
          </div>
          <h1 className="text-4xl font-bold text-primary-text tracking-tight mb-2">
            {greeting}, <span className="text-accent italic">{userName}.</span>
          </h1>
          <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
            Your student dashboard. You have{" "}
            <span className="text-accent font-bold underline decoration-accent/30">
              {stats[1].val} pending assignments
            </span>{" "}
            to complete.
          </p>
        </div>
        <Link
          href="/student/assignments"
          className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl border border-slate-800"
        >
          <FileText size={16} />
          View Assignments
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-sharp transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6`}>
                <stat.icon size={24} />
              </div>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 italic">Active</div>
            </div>
            <div className="text-3xl font-bold text-primary-text mb-1 tracking-tighter">{stat.val}</div>
            <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{stat.label}</div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-accent transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Enrolled Courses */}
      {courses.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-primary-text tracking-tight flex items-center gap-3">
            Your Courses
            <span className="text-xs font-medium text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-widest">
              {courses.length} Enrolled
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-sharp transition-all group border-b-4 border-b-slate-100 hover:border-b-accent flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg uppercase tracking-[0.2em] leading-none shadow-lg border border-slate-800 inline-block mb-4">
                    {course.code}
                  </div>
                  <h3 className="text-base font-bold text-primary-text mb-2 tracking-tight group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2">
                    {course.description || "No description available."}
                  </p>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
                  <Link
                    href={`/student/courses/${course.id}`}
                    className="text-[10px] font-bold text-accent flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest"
                  >
                    View Course
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-primary-text tracking-tight">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <Link
                href={link.href}
                className="flex flex-col gap-3 p-5 bg-white border border-slate-200 rounded-2xl hover:border-accent hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-accent group-hover:text-white transition-all">
                  <link.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-text uppercase tracking-wide">{link.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{link.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
