"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    Eye,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Users,
    Activity,
    ShieldCheck,
    Target,
    ArrowUpRight,
    ArrowDownRight,
    Search as SearchIcon,
    Calendar,
    MoreHorizontal,
    Mail,
    ExternalLink
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const students = [
    {
        id: 1, name: "Alexandra Kim", enroll: "CS2022001", dept: "Computer Science", year: 3, gpa: 8.7, risk: "Low", status: "Active", attendance: "93%",
        history: [{ sem: "S1", gpa: 7.2 }, { sem: "S2", gpa: 7.8 }, { sem: "S3", gpa: 8.1 }, { sem: "S4", gpa: 7.9 }, { sem: "S5", gpa: 8.4 }, { sem: "S6", gpa: 8.7 }],
        activity: ["Submitted CS 301 Assignment · 2h ago", "Accessed Physics lecture · 1d ago", "Logged in · 2d ago"],
    },
    {
        id: 2, name: "Arjun Mehta", enroll: "EC2023042", dept: "Electronics", year: 2, gpa: 5.8, risk: "High", status: "At Risk", attendance: "62%",
        history: [{ sem: "S1", gpa: 6.5 }, { sem: "S2", gpa: 6.1 }, { sem: "S3", gpa: 5.8 }],
        activity: ["Missed 3 consecutive lectures · Yesterday", "Last login · 4d ago"],
    },
    {
        id: 3, name: "Priya Sinha", enroll: "ME2022078", dept: "Mechanical", year: 3, gpa: 6.1, risk: "High", status: "At Risk", attendance: "68%",
        history: [{ sem: "S1", gpa: 7.1 }, { sem: "S2", gpa: 6.8 }, { sem: "S3", gpa: 6.4 }, { sem: "S4", gpa: 6.1 }],
        activity: ["Overdue: 2 assignments · Today", "Accessed Math lecture · 3d ago"],
    },
    {
        id: 4, name: "Samuel Okafor", enroll: "CE2023015", dept: "Civil", year: 2, gpa: 7.2, risk: "Medium", status: "Active", attendance: "78%",
        history: [{ sem: "S1", gpa: 6.9 }, { sem: "S2", gpa: 7.0 }, { sem: "S3", gpa: 7.2 }],
        activity: ["Submitted Civil project · Yesterday", "Attended seminar · 2d ago"],
    },
    {
        id: 5, name: "Mei Lin Zhang", enroll: "CS2021033", dept: "Computer Science", year: 4, gpa: 9.1, risk: "Low", status: "Active", attendance: "97%",
        history: [{ sem: "S1", gpa: 8.5 }, { sem: "S2", gpa: 8.8 }, { sem: "S3", gpa: 9.0 }, { sem: "S4", gpa: 8.9 }, { sem: "S5", gpa: 9.1 }],
        activity: ["Top scorer in CS 401 · Today", "Internship application submitted · 1d ago"],
    },
];

const RISK_THEMES: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    High: { label: "CRITICAL RISK", color: "text-red-600", bg: "bg-red-50 border-red-100", icon: AlertTriangle },
    Medium: { label: "MODERATE", color: "text-amber-600", bg: "bg-amber-50 border-amber-100", icon: Activity },
    Low: { label: "NOMINAL", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100", icon: CheckCircle },
};

export default function AdminStudentsPage() {
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState<number | null>(null);

    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.enroll.toLowerCase().includes(search.toLowerCase()) ||
            s.dept.toLowerCase().includes(search.toLowerCase())
    );

    function hashColor(name: string): string {
        const colors = ["indigo", "emerald", "purple", "rose", "cyan", "amber", "teal", "blue", "orange", "pink"];
        let hash = 0;
        for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
        return colors[Math.abs(hash) % colors.length];
    }

    return (
        <DashboardShell role="admin">
            <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
                {/* Institutional Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                            <Users size={14} className="text-accent" />
                            <span>System Governance • Global Student Registry</span>
                        </div>
                        <h1 className="text-4xl font-bold text-primary-text tracking-tight font-serif">
                            Institutional Registry
                        </h1>
                        <p className="text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
                            Complete governance of academic vectors across <span className="text-accent font-bold">{students.length} Synchronized Profiles</span> within the GradeFlow infrastructure.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-4 transition-all hover:border-accent group">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shadow-inner group-hover:bg-accent group-hover:text-white transition-all">
                                <Activity size={22} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary-text leading-none tracking-tight">94.2%</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Active Index</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center gap-4 transition-all hover:border-red-200 group">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-red-500 shadow-inner group-hover:bg-red-500 group-hover:text-white transition-all">
                                <AlertTriangle size={22} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary-text leading-none tracking-tight">08</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Risk Flags</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tactical Search & Filter */}
                <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
                    <div className="relative flex-1 group w-full">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Scan institutional registry by name, enrolment, or department..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm"
                        />
                    </div>
                    <select className="w-full sm:w-auto px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 bg-white shadow-sm uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-accent appearance-none text-center">
                        <option>All Departments</option>
                        <option>Computer Science</option>
                        <option>Electronics</option>
                        <option>Mechanical</option>
                    </select>
                </div>

                {/* Registry Table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm border-b-4 border-b-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-200">
                                    {["Profile", "Registry ID", "Academic Unit", "Year", "GPA Index", "Risk Vector", "Stability", ""].map((h, i) => (
                                        <th key={i} className="text-left px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((student) => (
                                    <>
                                        <tr key={student.id} className={`group hover:bg-slate-50/50 transition-colors ${expanded === student.id ? 'bg-slate-50/50' : ''}`}>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-bold border border-slate-200 transition-all group-hover:border-accent group-hover:bg-accent/5`}>
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-800 tracking-tight group-hover:text-accent transition-colors">{student.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Validated Profile</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-[11px] font-bold text-slate-500 font-mono">{student.enroll}</td>
                                            <td className="px-6 py-6">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1.5 bg-slate-100/50 border border-slate-200 rounded-full whitespace-nowrap">
                                                    {student.dept}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className="text-xs font-bold text-slate-700">L-{student.year}</span>
                                            </td>
                                            <td className="px-6 py-6 text-left">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-sm font-bold text-accent tracking-tighter">{student.gpa}</span>
                                                    <div className="w-16 h-1 w-full max-w-[80px] bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-accent" style={{ width: `${(student.gpa / 10) * 100}%` }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                {(() => {
                                                    const theme = RISK_THEMES[student.risk];
                                                    return (
                                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.bg} whitespace-nowrap`}>
                                                            <theme.icon size={12} className={theme.color} />
                                                            <span className={`text-[9px] font-black uppercase tracking-widest ${theme.color}`}>{theme.label}</span>
                                                        </div>
                                                    );
                                                })()}
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`w-2 h-2 rounded-full ${student.status === "Active" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" : "bg-red-500"}`} />
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${student.status === "Active" ? "text-emerald-700" : "text-red-700"}`}>{student.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setExpanded(expanded === student.id ? null : student.id)}
                                                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-accent hover:border-accent hover:shadow-sharp transition-all"
                                                >
                                                    {expanded === student.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </button>
                                            </td>
                                        </tr>
                                        {expanded === student.id && (
                                            <tr>
                                                <td colSpan={8} className="px-10 py-12 bg-slate-50/50 border-y border-slate-200 animate-in slide-in-from-top duration-300">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                                        {/* GPA Trajectory */}
                                                        <div className="space-y-6">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                                    <TrendingUp size={12} className="text-accent" />
                                                                    Academic Velocity
                                                                </h4>
                                                                <span className="text-[10px] font-bold text-accent italic">Trending Positive</span>
                                                            </div>
                                                            <div className="h-[140px] w-full">
                                                                <ResponsiveContainer width="100%" height="100%">
                                                                    <AreaChart data={student.history}>
                                                                        <defs>
                                                                            <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                                                                                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                                                                                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                                                                            </linearGradient>
                                                                        </defs>
                                                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                                                                        <XAxis dataKey="sem" hide />
                                                                        <YAxis hide domain={[0, 10]} />
                                                                        <Tooltip
                                                                            contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                                        />
                                                                        <Area type="monotone" dataKey="gpa" stroke="var(--accent)" fill="url(#gpaGradient)" strokeWidth={3} />
                                                                    </AreaChart>
                                                                </ResponsiveContainer>
                                                            </div>
                                                            <div className="flex justify-between px-2">
                                                                {student.history.map(h => (
                                                                    <span key={h.sem} className="text-[10px] font-bold text-slate-400">{h.sem}</span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Operational Logs */}
                                                        <div className="space-y-6">
                                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                                <Activity size={12} className="text-slate-500" />
                                                                Institutional Logs
                                                            </h4>
                                                            <div className="space-y-4">
                                                                {student.activity.map((act, idx) => (
                                                                    <div key={idx} className="flex gap-4">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1.5 flex-shrink-0" />
                                                                        <p className="text-[12px] font-medium text-slate-600 leading-relaxed italic">{act}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Governance Directives */}
                                                        <div className="space-y-6">
                                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                                <ShieldCheck size={12} className="text-emerald-500" />
                                                                Governance Directives
                                                            </h4>
                                                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                                                {student.risk === "High" ? (
                                                                    <div className="space-y-4">
                                                                        <div className="flex items-center gap-2 text-red-600">
                                                                            <AlertTriangle size={15} />
                                                                            <span className="text-[10px] font-black uppercase tracking-widest">Protocol Required</span>
                                                                        </div>
                                                                        <ul className="space-y-3">
                                                                            <li className="text-[11px] font-bold text-slate-500 flex items-center gap-3">
                                                                                <div className="w-1 h-1 rounded-full bg-red-400" />
                                                                                DELEGATE TO ACADEMIC COUNSEL
                                                                            </li>
                                                                            <li className="text-[11px] font-bold text-slate-500 flex items-center gap-3">
                                                                                <div className="w-1 h-1 rounded-full bg-red-400" />
                                                                                INITIATE MODULE SYNC
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex flex-col items-center justify-center py-4 text-center">
                                                                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-3 border border-emerald-100">
                                                                            <CheckCircle size={24} />
                                                                        </div>
                                                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.1em]">Trajectory Validated</p>
                                                                        <p className="text-[10px] text-slate-400 font-medium italic mt-1.5 leading-snug">Governance status: Minimal intervention</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-end gap-5">
                                                        <button className="px-6 py-2.5 bg-white border border-slate-300 rounded-xl text-[10px] font-bold text-slate-500 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all uppercase tracking-[0.15em] shadow-sm">
                                                            Institutional Dossier
                                                        </button>
                                                        <button className="px-6 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-bold text-white hover:bg-black transition-all uppercase tracking-[0.15em] shadow-lg">
                                                            Modify Credentials
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Registry Pagination */}
                    <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Synchronized Registry Entry <span className="text-primary-text">{filtered.length}</span> of <span className="text-primary-text">189</span> Global Clusters
                        </p>
                        <div className="flex gap-2">
                            {["01", "02", "03", "...", "99"].map((p, i) => (
                                <button
                                    key={i}
                                    className={`w-9 h-9 rounded-xl text-[10px] font-black transition-all border ${p === "01" ? "bg-accent text-white border-slate-700 shadow-lg" : "bg-white text-slate-400 border-slate-200 hover:border-accent/40"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
