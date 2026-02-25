"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from "recharts";
import {
  Users,
  BookOpen,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  ShieldCheck,
  Globe,
  MoreHorizontal,
  ArrowUpRight,
  ShieldAlert,
  Zap,
  Command,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const userGrowthData = [
  { month: "Sep", students: 4200, instructors: 610 },
  { month: "Oct", students: 4580, instructors: 642 },
  { month: "Nov", students: 4820, instructors: 660 },
  { month: "Dec", students: 4900, instructors: 671 },
  { month: "Jan", students: 5100, instructors: 680 },
  { month: "Feb", students: 5284, instructors: 689 },
];

const deptData = [
  { dept: "CS", avgGpa: 8.4, pulse: 92 },
  { dept: "ECE", avgGpa: 7.9, pulse: 85 },
  { dept: "Mech", avgGpa: 7.6, pulse: 78 },
  { dept: "Civil", avgGpa: 7.4, pulse: 72 },
  { dept: "Chem", avgGpa: 7.8, pulse: 81 },
  { dept: "Math", avgGpa: 8.1, pulse: 88 },
];

const riskFeed = [
  { name: "Arjun Mehta", dept: "ECE", gpa: 5.8, risk: "High", trend: "down" },
  { name: "Priya Sinha", dept: "Mech", gpa: 6.1, risk: "High", trend: "down" },
  { name: "Samuel Okafor", dept: "Civil", gpa: 6.4, risk: "Medium", trend: "stable" },
  { name: "Chen Wei", dept: "CS", gpa: 6.5, risk: "Medium", trend: "stable" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* Institutional Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
            <ShieldCheck size={14} className="text-accent" />
            <span>Root Administrator • Session Encrypted</span>
          </div>
          <h1 className="text-4xl font-bold text-primary-text tracking-tight mb-2">
            Institutional Control Center
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">
            Global academic oversight and infrastructure monitoring for <span className="text-accent font-bold underline decoration-accent/20 underline-offset-4 font-serif italic">Autumn Semester 2025</span>.
          </p>
        </div>

        {/* System Health Status */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-6 bg-white border border-slate-200 rounded-2xl p-4 px-8 shadow-xl"
        >
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Infrastructure Pulse</span>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
              <span className="text-xs font-bold text-slate-700 tracking-tight">99.9% Latency Opt.</span>
            </div>
          </div>
          <div className="w-px h-10 bg-slate-100" />
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Network Nodes</span>
            <div className="flex items-center gap-2 text-accent">
              <Globe size={16} />
              <span className="text-xs font-bold uppercase tracking-tight">12 Global Hubs</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Enrollments", val: "5,284", icon: Users, color: "text-blue-600", bg: "bg-blue-50/50", trend: "+2.4%" },
          { label: "Active Modules", val: "127", icon: BookOpen, color: "text-slate-600", bg: "bg-slate-100/50", trend: "+5%" },
          { label: "Live Sessions", val: "892", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50/50", trend: "+12%" },
          { label: "At-Risk Alerts", val: "47", icon: ShieldAlert, color: "text-red-600", bg: "bg-red-50/50", trend: "-2%" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-sharp transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white`}>
                <stat.icon size={22} />
              </div>
              <div className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-slate-400 bg-slate-50 border-slate-100'} px-2.5 py-1 rounded-full border italic`}>
                {stat.trend}
              </div>
            </div>
            <div className="text-3xl font-bold text-primary-text mb-1 tracking-tighter">{stat.val}</div>
            <div className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">{stat.label}</div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-accent transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-primary-text tracking-tight uppercase">Institutional Growth</h3>
              <p className="text-xs text-slate-500 font-medium italic">Enrolment dynamics: Students vs Faculty (6M)</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Faculty</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudentsAdmin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                />
                <Area type="monotone" dataKey="students" stroke="var(--accent)" strokeWidth={4} fillOpacity={1} fill="url(#colorStudentsAdmin)" dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: 'var(--accent)' }} />
                <Area type="monotone" dataKey="instructors" stroke="#cbd5e1" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Department Efficiency */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="mb-10">
            <h3 className="text-xl font-bold text-primary-text tracking-tight uppercase">Academic Pulse</h3>
            <p className="text-xs text-slate-500 font-medium italic">Efficiency by Department</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="dept" type="category" axisLine={false} tickLine={false} tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 800 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                />
                <Bar dataKey="pulse" radius={[0, 8, 8, 0]} fill="var(--accent)" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Risk Management / Intervention Center */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 text-red-600">
              <ShieldAlert size={22} className="animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Intervention Matrix</h3>
            </div>
            <span className="text-[10px] font-black text-slate-400 border border-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">47 Active Vectors</span>
          </div>
          <div className="space-y-4 flex-1">
            {riskFeed.map((student, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4, backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-white shadow-xl">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-primary-text mb-1">{student.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{student.dept} • GPA {student.gpa}</div>
                  </div>
                </div>
                <div className={`text-[10px] font-black px-3 py-1.5 rounded-lg leading-none border uppercase tracking-widest ${student.risk === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                  {student.risk}
                </div>
              </motion.div>
            ))}
          </div>
          <Link
            href="/admin/students"
            className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl"
          >
            Access Risk Heatmap
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Global Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-primary-text tracking-tight uppercase">Institutional Event Log</h3>
              <p className="text-xs text-slate-500 font-medium italic">Real-time infrastructure activity monitor</p>
            </div>
            <button className="p-3 rounded-xl hover:bg-slate-50 text-slate-400 transition-all border border-transparent hover:border-slate-200">
              <MoreHorizontal size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Log Column 1 */}
            <div className="space-y-8">
              {[
                { user: "Dr. Rahul Verma", action: "Faculty Credential Verified", time: "2m ago", status: "success" },
                { user: "Sys Engine v4.2", action: "Adaptive Roadmap Sync", time: "15m ago", status: "success" },
                { user: "Prof. Michael Park", action: "Curriculum Draft Submitted", time: "1h ago", status: "pending" },
              ].map((log, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${log.status === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} />
                    <div className="w-px h-full bg-slate-100 my-2" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-primary-text uppercase tracking-tight mb-1">{log.action}</div>
                    <div className="text-[11px] text-slate-400 font-medium italic">Authored by {log.user} • {log.time}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Log Column 2 / Prediction */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-accent mb-6">
                  <Command size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sys Prediction</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic font-medium mb-6">
                  &ldquo;Overall institutional velocity has increased by 1.2% this month. The CS department remains the primary driver of academic proficiency markers. Infrastructure overhead remains optimal at 14%.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-accent border border-slate-800 flex items-center justify-center text-[10px] font-black text-white italic shadow-lg">GF</div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engine Core v4.28</span>
              </div>
              {/* Decorative design */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
