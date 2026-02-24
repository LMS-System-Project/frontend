"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { api } from "@/services/api";

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
      if (err.message?.includes("Authentication")) router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} />
      </div>
    );
  }

  const engagement = data?.engagement || [];
  const maxActive = Math.max(...engagement.map((e) => e.active_users), 1);
  const maxViews = Math.max(...engagement.map((e) => e.course_views), 1);

  function toPath(values: number[], maxVal: number): string {
    if (values.length === 0) return "";
    const w = 600, h = 180, pad = 10;
    const step = (w - pad * 2) / Math.max(values.length - 1, 1);
    return values.map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - ((v / maxVal) * (h - pad * 2));
      return `${i === 0 ? "M" : "L"}${x} ${y}`;
    }).join(" ");
  }

  function toAreaPath(values: number[], maxVal: number): string {
    const line = toPath(values, maxVal);
    if (!line) return "";
    const w = 600, h = 180, pad = 10;
    const step = (w - pad * 2) / Math.max(values.length - 1, 1);
    const lastX = pad + (values.length - 1) * step;
    return `${line} L${lastX} ${h} L${pad} ${h} Z`;
  }

  const activePath = toPath(engagement.map((e) => e.active_users), maxActive);
  const activeArea = toAreaPath(engagement.map((e) => e.active_users), maxActive);
  const viewsPath = toPath(engagement.map((e) => e.course_views), maxViews);
  const viewsArea = toAreaPath(engagement.map((e) => e.course_views), maxViews);
  const stats = data?.stats || [];

  const colorMap: Record<string, { ring: string; text: string }> = {
    cyan: { ring: "stroke-cyan-500", text: "text-cyan-600 dark:text-cyan-400" },
    purple: { ring: "stroke-purple-500", text: "text-purple-600 dark:text-purple-400" },
    pink: { ring: "stroke-pink-500", text: "text-pink-600 dark:text-pink-400" },
    indigo: { ring: "stroke-indigo-500", text: "text-indigo-600 dark:text-indigo-400" },
    emerald: { ring: "stroke-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
    amber: { ring: "stroke-amber-500", text: "text-amber-600 dark:text-amber-400" },
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back link */}
        <Link href="/instructor/dashboard" className="inline-flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Analytics</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Insights into your courses, students, and engagement.</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm mb-6">
            {error}
            <button onClick={() => setError("")} className="ml-2 text-red-400 hover:text-red-300">✕</button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Platform Engagement</h3>
            <div className="relative w-full" style={{ height: "220px" }}>
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="var(--border-color)" strokeWidth="1" />
                ))}
                {activeArea && <path d={activeArea} fill="url(#grad1)" />}
                {activePath && <path d={activePath} fill="none" stroke="#6366f1" strokeWidth="2.5" />}
                {viewsArea && <path d={viewsArea} fill="url(#grad2)" />}
                {viewsPath && <path d={viewsPath} fill="none" stroke="#a855f7" strokeWidth="2.5" />}
              </svg>
            </div>
            <div className="flex justify-between mt-2 px-1">
              {engagement.map((e, i) => (
                <span key={i} className="text-xs" style={{ color: "var(--text-secondary)" }}>{e.label}</span>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Course Views</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {stats.map((stat, i) => {
              const cm = colorMap[stat.color] || colorMap.indigo;
              return (
                <div key={i} className="glass-card p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="24" fill="none" strokeWidth="4" className="stroke-gray-200 dark:stroke-white/10" />
                        <circle cx="28" cy="28" r="24" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="150" strokeDashoffset={150 - (150 * Math.min(stat.value, 100)) / 100} className={cm.ring} />
                      </svg>
                      <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${cm.text}`}>{stat.value}%</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{stat.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{stat.sub}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
