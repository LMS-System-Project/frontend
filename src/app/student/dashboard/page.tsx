"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  BookOpen,
  Clock,
  AlertCircle,
  CheckCircle,
  BrainCircuit,
  ArrowRight,
  Loader2,
  FileText,
  Award,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { api } from "@/services/api";

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    async function load() {
      try {
        const user = api.auth.getUser();
        if (user?.full_name) setUserName(user.full_name);

        const [dashboardData, coursesData, assignmentsData] = await Promise.all([
          api.student.dashboard(),
          api.student.courses.list(),
          api.student.assignments.list(),
        ]);

        setStats(dashboardData);
        setCourses(coursesData || []);
        setAssignments(assignmentsData || []);
      } catch (err) {
        console.error("Student dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const pending = assignments
    .filter((a) => a.submission_status === "not_submitted")
    .sort((a: any, b: any) => (a.due_date ?? "").localeCompare(b.due_date ?? ""))
    .slice(0, 4);

  const progressData = courses.slice(0, 6).map((c) => ({
    name: c.code,
    progress: c.progress,
  }));

  const statCards = [
    {
      label: "Enrolled Courses",
      value: stats?.enrolled_courses ?? courses.length,
      sub: `${courses.filter((c: any) => c.status === "active").length} active`,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending",
      value: stats?.pending_assignments ?? pending.length,
      sub: "assignments due",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Submitted",
      value: stats?.submitted_assignments ?? 0,
      sub: `${stats?.graded_assignments ?? 0} graded`,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Avg Grade",
      value: stats?.average_grade ?? "N/A",
      sub: "across all courses",
      icon: TrendingUp,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Top Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ y: -4 }}
          className="lg:col-span-2 bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800"
        >
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">
              <CheckCircle size={14} className="text-emerald-400" />
              <span>Welcome back</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              {greeting},{" "}
              <span className="text-accent italic font-serif">{userName}.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md italic">
              You have{" "}
              <span className="text-white font-bold">
                {stats?.pending_assignments ?? pending.length} pending assignments
              </span>{" "}
              and{" "}
              <span className="text-white font-bold">{courses.length} enrolled courses</span>{" "}
              this semester.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/student/courses"
                className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all flex items-center gap-3 shadow-lg group"
              >
                My Courses
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/student/assignments"
                className="px-5 py-3 border border-slate-700 rounded-xl text-[10px] font-bold bg-slate-800/50 uppercase tracking-widest flex items-center gap-2 hover:border-accent hover:text-accent transition-all"
              >
                <FileText size={14} className="text-accent" />
                Assignments
              </Link>
            </div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 flex items-center justify-center -rotate-12 translate-x-16 pointer-events-none">
            <BrainCircuit size={400} />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-sharp transition-all group flex flex-col justify-between"
            >
              <div
                className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 transition-all group-hover:bg-slate-900 group-hover:text-white`}
              >
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-text mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">{stat.label}</div>
                <div className={`text-[10px] font-bold ${stat.color} italic`}>{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-primary-text tracking-tight uppercase">Course Progress</h3>
              <p className="text-xs text-slate-500 font-medium italic">Completion rate by course</p>
            </div>
            <Link href="/student/courses" className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {progressData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }} dy={10} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: any) => [`${v}%`, "Progress"]} contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "11px", fontWeight: 800 }} />
                  <Area type="monotone" dataKey="progress" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorProgress)" dot={{ r: 5, fill: "#fff", strokeWidth: 3, stroke: "var(--accent)" }} activeDot={{ r: 7, strokeWidth: 0, fill: "var(--accent)" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400">
              <BookOpen size={40} className="mb-4 text-slate-200" />
              <p className="text-sm font-medium">No courses enrolled yet.</p>
            </div>
          )}
        </motion.div>

        {/* Pending Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8 text-accent">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest">Priority Queue</h3>
          </div>
          {pending.length > 0 ? (
            <div className="space-y-4">
              {pending.map((item, i) => {
                const dueDate = item.due_date ? new Date(item.due_date) : null;
                const isOverdue = dueDate && dueDate < new Date();
                const isSoon = dueDate && !isOverdue && dueDate.getTime() - Date.now() < 48 * 60 * 60 * 1000;
                return (
                  <motion.div key={i} whileHover={{ x: 4 }} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all">
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-primary-text mb-0.5 truncate">{item.title}</div>
                      <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{item.course_code}</div>
                    </div>
                    <div className={`text-[10px] font-black tracking-widest ml-4 flex-shrink-0 ${isOverdue ? "text-red-500" : isSoon ? "text-amber-500" : "text-emerald-500"}`}>
                      {dueDate ? (isOverdue ? "OVERDUE" : dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })) : "—"}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <CheckCircle size={32} className="mb-3 text-emerald-400" />
              <p className="text-xs font-bold text-center">All up to date!</p>
            </div>
          )}
          <Link href="/student/assignments" className="block w-full text-center mt-6 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-100 hover:text-accent transition-all uppercase tracking-[0.25em]">
            All Assignments
          </Link>
        </motion.div>

        {/* Active Courses List */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-accent">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">Active Courses</h3>
            </div>
            <Link href="/student/courses" className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.slice(0, 4).map((course) => (
                <div key={course.id} className="flex items-center gap-5 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all">
                  <div className="w-10 h-10 bg-accent text-white rounded-lg flex items-center justify-center text-[10px] font-black shadow border border-slate-700 flex-shrink-0">
                    {course.code.substring(0, 3).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-primary-text truncate">{course.title}</span>
                      <span className="text-[10px] font-black text-slate-400 ml-2 flex-shrink-0">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-accent h-full rounded-full"
                      />
                    </div>
                    {course.instructor_name && (
                      <p className="text-[10px] text-slate-400 mt-1.5 font-medium truncate">{course.instructor_name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <BookOpen size={40} className="mb-4 text-slate-200" />
              <p className="text-sm font-medium">Not enrolled in any courses yet.</p>
            </div>
          )}
        </motion.div>

        {/* Grade Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col"
        >
          <div className="flex items-center gap-3 mb-8 text-accent">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Award size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest">Grade Summary</h3>
          </div>
          <div className="flex-1 space-y-5">
            <div className="text-center p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Overall Average</p>
              <p className="text-5xl font-bold text-primary-text tracking-tighter">{stats?.average_grade ?? "N/A"}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                <div className="text-lg font-bold text-primary-text">{stats?.submitted_assignments ?? 0}</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Submitted</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                <div className="text-lg font-bold text-emerald-600">{stats?.graded_assignments ?? 0}</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Graded</div>
              </div>
            </div>
            {(stats?.graded_assignments ?? 0) === 0 && (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-600 font-medium leading-relaxed">
                  No graded submissions yet. Submit assignments to start tracking grades.
                </p>
              </div>
            )}
          </div>
          <Link href="/student/assignments" className="mt-6 w-full py-3.5 border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all uppercase tracking-[0.25em] text-center block">
            All Assessments
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
