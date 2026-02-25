"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  Clock,
  AlertCircle,
  CheckCircle,
  BrainCircuit,
  Target,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const cgpaData = [
  { sem: "S1", cgpa: 7.2 },
  { sem: "S2", cgpa: 7.8 },
  { sem: "S3", cgpa: 8.1 },
  { sem: "S4", cgpa: 7.9 },
  { sem: "S5", cgpa: 8.4 },
  { sem: "S6", cgpa: 8.7 },
];

const subjectData = [
  { subject: "AI/ML", A: 94 },
  { subject: "Blockchain", A: 88 },
  { subject: "Databases", A: 82 },
  { subject: "OS", A: 76 },
  { subject: "Algorithms", A: 91 },
  { subject: "Design", A: 85 },
];

const stats = [
  { label: "Current GPA", value: "8.7", sub: "↑ 0.3 vs last sem", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Courses", value: "6", sub: "2 Labs in progress", icon: BookOpen, color: "text-slate-600", bg: "bg-slate-100" },
  { label: "Attendance", value: "92%", sub: "Threshold: 75%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Assigned", value: "3", sub: "Next due: 4h", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
];

const deadlines = [
  { title: "Neural Networks Quiz", detail: "Chapter 4: Backpropagation", timer: "2h 40m", priority: "high" },
  { title: "Database Lab Report", detail: "Query Optimization", timer: "1d", priority: "medium" },
  { title: "Blockhain Project", detail: "Smart Contract Review", timer: "3d", priority: "low" },
];

export default function StudentDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Top Banner & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Welcome Section */}
        <motion.div
          whileHover={{ y: -4 }}
          className="lg:col-span-2 bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800"
        >
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">
              <CheckCircle size={14} className="text-emerald-400" />
              <span>Identity Verified • Institutional Sync Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              Welcome back, <span className="text-accent italic font-serif">Alexandra.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md italic">
              Academic Standing: <span className="text-white font-bold">Cohert Alpha Prime</span>.
              The AI Insights engine recommends prioritizing your Neural Networks quiz within 15 minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/student/courses" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all flex items-center gap-3 shadow-lg group">
                Continue Learning
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="px-5 py-3 border border-slate-700 rounded-xl text-[10px] font-bold bg-slate-800/50 uppercase tracking-widest flex items-center gap-2">
                <BrainCircuit size={14} className="text-accent animate-pulse" />
                14-Day Study Streak
              </div>
            </div>
          </div>
          {/* Background pattern */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 flex items-center justify-center -rotate-12 translate-x-16 pointer-events-none">
            <BrainCircuit size={400} />
          </div>
        </motion.div>

        {/* Quick Stats Bento */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-sharp transition-all group flex flex-col justify-between"
            >
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 transition-all group-hover:bg-slate-900 group-hover:text-white`}>
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-text mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">{stat.label}</div>
                <div className={`text-[10px] font-bold ${stat.color} filter brightness-90 italic`}>{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Analysis Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-primary-text tracking-tight uppercase">Academic Velocity</h3>
              <p className="text-xs text-slate-500 font-medium italic">Cumulative institutional growth metric</p>
            </div>
            <div className="flex gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100">
              <span className="px-4 py-1.5 rounded-lg text-[10px] font-bold text-slate-400 hover:bg-white hover:text-slate-600 transition-all cursor-pointer">YEARLY</span>
              <span className="px-4 py-1.5 rounded-lg bg-white shadow-sm border border-slate-200 text-[10px] font-bold text-accent">SEMESTER</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cgpaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCgpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="sem"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                  dy={15}
                />
                <YAxis
                  domain={[6, 10]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '11px',
                    fontWeight: 800
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cgpa"
                  stroke="var(--accent)"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorCgpa)"
                  dot={{ r: 5, fill: '#fff', strokeWidth: 3, stroke: 'var(--accent)' }}
                  activeDot={{ r: 8, strokeWidth: 0, fill: 'var(--accent)' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skill Matrix Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="mb-10">
            <h3 className="text-xl font-bold text-primary-text tracking-tight uppercase">Cognitive Profile</h3>
            <p className="text-xs text-slate-500 font-medium italic">Module proficiency distribution</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
                <PolarGrid stroke="#f1f5f9" strokeWidth={2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="var(--accent)"
                  fill="var(--accent)"
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '11px',
                    fontWeight: 700
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI & Roadmap Insights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-8 text-accent">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <BrainCircuit size={20} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">Governance Insights</h3>
            </div>
            <div className="space-y-5">
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                  &ldquo;Alexandra, your algorithmic logic index is in the top 2% of the university. We recommend the <span className="text-accent font-bold">Quantum Logic module</span> for electives.&rdquo;
                </p>
              </div>
              <div className="p-5 bg-red-50 border border-red-100 rounded-2xl">
                <div className="flex items-center gap-2 text-red-600 mb-3">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Risk Vector</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Operating System attendance is trending towards the 75% threshold. Secure next session to maintain compliance.
                </p>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-3.5 border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all uppercase tracking-[0.25em]">
            Institutional Roadmap
          </button>
        </motion.div>

        {/* Active Deadlines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8 text-accent">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest">Priority Queue</h3>
          </div>
          <div className="space-y-4">
            {deadlines.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4, backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl cursor-pointer group transition-all"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-primary-text mb-1 truncate">{item.title}</div>
                  <div className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-tighter">{item.detail}</div>
                </div>
                <div className="text-right ml-4">
                  <div className={`text-[10px] font-black tracking-widest ${item.priority === 'high' ? 'text-red-500' :
                    item.priority === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                    }`}>{item.timer}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <Link href="/student/assignments" className="block w-full text-center mt-8 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-100 hover:text-accent transition-all uppercase tracking-[0.25em]">
            MISSION CONTROL: ASSIGNMENTS
          </Link>
        </motion.div>

        {/* Academic Standings Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8 text-accent">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Target size={20} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest">Milestones</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Degree Progression</span>
                <span className="text-xs font-black text-primary-text">64%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '64%' }}
                  transition={{ duration: 1, delay: 1 }}
                  className="bg-accent h-full rounded-full shadow-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center group hover:bg-white hover:border-accent transition-all">
                <div className="text-xs font-black text-primary-text mb-1 uppercase">Honours</div>
                <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">ELIGIBLE</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center group hover:bg-white hover:border-emerald-500 transition-all">
                <div className="text-xs font-black text-primary-text mb-1 uppercase italic">Scholarship</div>
                <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">ACTIVE</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
