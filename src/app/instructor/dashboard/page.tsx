"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
  Users,
  BookOpen,
  Clock,
  Activity,
  ArrowRight,
  Plus,
  X,
  Loader2,
  Search,
  Filter,
  CheckCircle2,
  MoreVertical
} from "lucide-react";
import { api } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const statHighlights = [
  { label: "Active Courses", val: "4", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Students", val: "128", icon: Users, color: "text-slate-600", bg: "bg-slate-100" },
  { label: "Pending Reviews", val: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Avg Attendance", val: "88%", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
];

export default function InstructorDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [stats, setStats] = useState(statHighlights);

  useEffect(() => {
    async function initDashboard() {
      try {
        const [courseData, dashboardData] = await Promise.all([
          api.instructor.courses.list(),
          api.instructor.dashboard()
        ]);
        setCourses(courseData);
        if (dashboardData) {
          setStats([
            { ...statHighlights[0], val: dashboardData.active_courses },
            { ...statHighlights[1], val: dashboardData.total_students },
            { ...statHighlights[2], val: dashboardData.pending_reviews },
            { ...statHighlights[3], val: dashboardData.avg_attendance },
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

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) {
    return (
      <DashboardShell role="instructor">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synchronizing Faculty Records...</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell role="instructor">
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
              <span>Identity Validated • Faculty Access Layer</span>
            </div>
            <h1 className="text-4xl font-bold text-primary-text tracking-tight mb-2">
              {greeting}, <span className="text-accent italic">Professor Varghese.</span>
            </h1>
            <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
              Institutional oversight dashboard. You have <span className="text-accent font-bold underline decoration-accent/30">{stats[2].val} urgent reviews</span> pending for the current term.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl border border-slate-800"
          >
            <Plus size={16} />
            Initialize Module
          </motion.button>
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
                <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 italic">Institutional Parity</div>
              </div>
              <div className="text-3xl font-bold text-primary-text mb-1 tracking-tighter">{stat.val}</div>
              <div className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{stat.label}</div>
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-accent transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary-text tracking-tight flex items-center gap-3">
              Instructional Registry
              <span className="text-xs font-medium text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-widest">{courses.length} Modules</span>
            </h2>
            <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
              {['Active', 'Drafts', 'Archived'].map((tab) => (
                <button
                  key={tab}
                  className={`p-1.5 px-5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${tab === 'Active' ? 'bg-white shadow-sm border border-slate-200 text-primary-text' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-sharp transition-all group border-b-4 border-b-slate-100 hover:border-b-accent flex flex-col"
              >
                <div className="p-8 flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg uppercase tracking-[0.2em] leading-none shadow-lg border border-slate-800">
                      {course.code}
                    </div>
                    <button className="text-slate-300 hover:text-primary-text transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-primary-text mb-3 tracking-tight group-hover:text-accent transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 italic leading-relaxed line-clamp-2">
                    {course.description || "Core institutional module focusing on advanced computational patterns and theory."}
                  </p>
                  <div className="flex items-center gap-6 mt-8">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Cohort Alpha</span>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-accent" />
                        <span className="text-xs font-bold text-slate-700">{course.student_count || course.students} Students</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Efficiency Index</span>
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600">+14% Growth</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${course.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{course.status}</span>
                  </div>
                  <Link
                    href={`/instructor/courses`}
                    className="text-[10px] font-bold text-accent flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest"
                  >
                    Engagement Hub
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Empty State / Create New Placeholder */}
            <motion.div
              whileHover={{ scale: 1.01, borderColor: 'var(--accent)' }}
              onClick={() => setShowCreate(true)}
              className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:bg-slate-50/50 transition-all cursor-pointer group min-h-[280px]"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Plus size={32} />
              </div>
              <p className="text-base font-bold text-slate-500 uppercase tracking-widest">Initialize New Module</p>
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.2em] font-medium italic">Institutional Approval Req.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreate(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-xl font-bold text-primary-text tracking-tight uppercase">Draft New Module</h3>
                  <p className="text-xs text-slate-500 font-medium italic">Faculty curriculum drafting layer</p>
                </div>
                <button
                  onClick={() => setShowCreate(false)}
                  className="p-2 rounded-full hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Module Code Reference</label>
                  <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-inner" placeholder="e.g. CS 301" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Module Title</label>
                  <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-inner" placeholder="e.g. Distributed Systems" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Instructional Objectives</label>
                  <textarea className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none shadow-inner" rows={3} placeholder="Define high-level goals..." />
                </div>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button onClick={() => setShowCreate(false)} className="flex-1 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200">Abort</button>
                <button className="flex-1 py-4 text-xs font-bold bg-accent text-white rounded-xl shadow-lg border border-slate-700 hover:bg-slate-800 transition-all uppercase tracking-widest">Execute Draft</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
}
