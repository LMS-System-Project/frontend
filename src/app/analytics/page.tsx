"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
  Loader2,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  MousePointer2,
  Calendar,
  Filter,
  Download,
  Target,
  Zap,
  ChevronDown,
  Activity
} from "lucide-react";
import Link from "next/link";
import { api } from "@/services/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface EngagementDataPoint {
  label: string;
  active_users: number;
  course_views: number;
}

interface AnalyticsStat {
  label: string;
  value: number;
  sub: string;
  color: string;
}

interface AnalyticsData {
  engagement: EngagementDataPoint[];
  stats: AnalyticsStat[];
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!api.auth.getToken()) { router.push("/login"); return; }
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      setLoading(true);
      const result = await api.instructor.analytics();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-accent rounded-full animate-spin" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Synthesizing Data Vectors...</span>
      </div>
    );
  }

  const engagement = data?.engagement || [];
  const stats = data?.stats || [];

  return (
    <DashboardShell role="instructor">
      <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
        {/* Governance Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link href="/instructor/dashboard" className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4 hover:text-accent transition-colors">
              <ArrowLeft size={12} />
              <span>Return to Faculty Console</span>
            </Link>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
              <BarChart3 size={14} className="text-accent" />
              <span>Institutional Intelligence • Analytics Hub</span>
            </div>
            <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Instructional Insights</h1>
            <p className="text-sm text-slate-500 mt-1">
              Deep-dive analysis of <span className="text-accent font-bold italic">learner engagement</span> and modular performance indices.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm uppercase tracking-widest whitespace-nowrap">
              <Calendar size={14} />
              Last 30 Days
            </button>
            <button className="px-4 py-2.5 bg-accent text-white rounded-xl text-[10px] font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 uppercase tracking-widest whitespace-nowrap">
              <Download size={14} />
              Export Ledger
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-in slide-in-from-top duration-300">
            <ArrowLeft size={14} />
            ANALYTICS SYNC FAILED: {error}
          </div>
        )}

        {/* Primary Intelligence Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Engagement Chart */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col border-b-4 border-b-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-100">Platform Engagement Profile</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Active Users vs Modular Engagement View</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Views</span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagement} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }}
                    dy={10}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="active_users"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorActive)"
                  />
                  <Area
                    type="monotone"
                    dataKey="course_views"
                    stroke="#cbd5e1"
                    strokeWidth={2}
                    fillOpacity={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radial Intelligence Column */}
          <div className="space-y-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-sharp transition-all group flex items-center justify-between border-b-4 border-b-slate-100 hover:border-b-accent">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-primary-text tracking-tight italic group-hover:text-accent transition-colors">{stat.value}%</p>
                  <p className="text-[9px] font-medium text-slate-500 italic max-w-[120px]">{stat.sub}</p>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" strokeWidth="4" className="stroke-slate-50" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray="176"
                      strokeDashoffset={176 - (176 * stat.value) / 100}
                      className="stroke-accent transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity size={14} className="text-accent opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/30 transition-all duration-500" />
              <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <Zap size={12} />
                Elite Prediction
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium italic relative z-10">
                Based on current velocity, <span className="text-white font-bold">cohort performance</span> is expected to increase by <span className="text-accent underline">12.4%</span> in the next assessment cycle.
              </p>
            </div>
          </div>
        </div>

        {/* Tactical Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Active Nodes", val: "124", sub: "+12.5%", icon: Target },
            { label: "Data Throughput", val: "1.2 TB", sub: "Nominal", icon: Activity },
            { label: "Student Sinc", val: "99.8%", sub: "Global Avg", icon: Users },
            { label: "Latency Index", val: "14ms", sub: "Elite", icon: MousePointer2 },
          ].map((m, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4 border-b-4 border-b-slate-100">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                <m.icon size={18} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{m.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-lg font-black text-primary-text leading-none italic">{m.val}</span>
                  <span className="text-[9px] font-bold text-emerald-500 leading-none mb-0.5">{m.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
