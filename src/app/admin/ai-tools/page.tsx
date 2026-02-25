"use client";

import DashboardShell from "@/components/dashboard/DashboardShell";
import {
    Brain,
    Shield,
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    ShieldAlert,
    Zap,
    Search,
    ChevronRight,
    Target,
    BarChart3,
    ArrowUpRight,
    Fingerprint,
    Lock
} from "lucide-react";

const gradingQueue = [
    { student: "Alex Kim", course: "CS 301", submission: "BST Implementation", aiGrade: "A (92/100)", confidence: 94, status: "pending" },
    { student: "Priya Sinha", course: "MA 201", submission: "Calculus Problem Set", aiGrade: "B+ (78/100)", confidence: 88, status: "pending" },
    { student: "Sam Okafor", course: "PH 202", submission: "Wave Lab Report", aiGrade: "B (74/100)", confidence: 79, status: "reviewed" },
];

const anomalies = [
    { type: "Grade spike", detail: "CS 301 — Alex Kim scored 40% above average", severity: "Medium", time: "2h ago" },
    { type: "Sudden drop", detail: "ECE 201 — Arjun Mehta: 82→58 in two weeks", severity: "High", time: "1d ago" },
    { type: "Engagement drop", detail: "PH 202 — 12 students missed last 3 lectures", severity: "High", time: "2d ago" },
];

const fraudAlerts = [
    { student: "Submission #4021", course: "CS 301", flag: "Structural similarity >85% with Submission #4018", risk: "Review Required" },
    { student: "Submission #3899", course: "EN 101", flag: "AI-generated content probability >90%", risk: "High Risk" },
];

const SEVERITY_THEMES: Record<string, { color: string; bg: string; border: string }> = {
    High: { color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    Medium: { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    Low: { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
};

export default function AdminAIToolsPage() {
    return (
        <DashboardShell role="admin">
            <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
                {/* Governance Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Brain size={14} className="text-accent" />
                            <span>System Intelligence • AI Verification Tools</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Institutional Cognition</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Governance of <span className="text-accent font-bold italic">AI Ethics</span> and synthetic academic oversight vectors.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shadow-inner">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="text-xl font-black text-primary-text leading-none tracking-tighter italic">99.2%</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sync Accuracy</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Tactical Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: "AI Grading Unit", status: "Operational", icon: Brain, color: "text-accent", bg: "bg-accent/5", sub: "12 Enqueued Assets" },
                        { label: "Fraud Detection", status: "Active Scan", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50", sub: "02 Flags Identified" },
                        { label: "Anomaly Matrix", status: "Nominal", icon: BarChart3, color: "text-amber-500", bg: "bg-amber-50", sub: "03 Vectors Tracked" },
                    ].map((tool, i) => (
                        <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-sharp transition-all group border-b-4 border-b-slate-100 hover:border-b-accent">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center ${tool.color} border border-slate-100 group-hover:scale-110 transition-transform`}>
                                    <tool.icon size={24} />
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-100 italic">
                                    <div className={`w-1.5 h-1.5 rounded-full ${tool.color} animate-pulse`} />
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${tool.color}`}>{tool.status}</span>
                                </div>
                            </div>
                            <h4 className="text-base font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-100">{tool.label}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">{tool.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Synthetic Grading Queue */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm border-b-4 border-b-slate-100">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-black text-primary-text uppercase tracking-widest flex items-center gap-2 italic">
                                        <Zap size={14} className="text-accent" />
                                        Synthetic Evaluation Queue
                                    </h3>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Final Institutional Verification Required</p>
                                </div>
                                <button className="text-[10px] font-black text-slate-400 hover:text-accent uppercase tracking-widest transition-colors">Bulk Audit</button>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {gradingQueue.map((item, i) => (
                                    <div key={i} className="p-6 hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <p className="text-sm font-bold text-primary-text tracking-tight group-hover:text-accent transition-colors italic">{item.student}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.course} • Artifact: {item.submission}</p>
                                            </div>
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${item.status === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                                                {item.status === 'pending' ? <Clock size={12} /> : <CheckCircle size={12} />}
                                                <span className="text-[9px] font-black uppercase tracking-widest">{item.status}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                            <div className="space-y-4 flex-1 max-w-xs">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[9px] font-black text-accent uppercase tracking-widest">Cognitive Score: {item.aiGrade}</span>
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{item.confidence}% Conf.</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${item.confidence > 85 ? 'bg-accent shadow-[0_0_8px_rgba(27,51,84,0.3)]' : 'bg-amber-400'}`}
                                                        style={{ width: `${item.confidence}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-400 hover:text-accent hover:border-accent hover:shadow-sharp transition-all uppercase tracking-widest whitespace-nowrap">Audit Response</button>
                                                <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-[9px] font-black text-white hover:bg-black transition-all shadow-lg uppercase tracking-widest whitespace-nowrap">Commit Grade</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                                <button className="text-[10px] font-black text-slate-400 hover:text-accent uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
                                    Expand Queue Repository
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Safety & Anomaly Column */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Anomaly Protocol */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm border-b-4 border-b-slate-100">
                            <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
                                <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 italic">
                                    <Activity size={14} className="text-amber-500" />
                                    Performance Anomaly Logs
                                </h3>
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            </div>
                            <div className="divide-y divide-slate-50">
                                {anomalies.map((a, i) => {
                                    const theme = SEVERITY_THEMES[a.severity];
                                    return (
                                        <div key={i} className="p-6 transition-colors border-l-4 border-l-transparent hover:border-l-accent hover:bg-slate-50/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${theme.color}`}>{a.type}</span>
                                                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter italic">{a.time}</span>
                                            </div>
                                            <p className="text-[11px] font-medium text-slate-500 italic leading-relaxed">{a.detail}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Plagiarism & Fraud Registry */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm border-b-4 border-b-red-50">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2 italic">
                                    <Fingerprint size={14} />
                                    Academic Integrity Flags
                                </h3>
                                <span className="bg-red-50 text-red-600 text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest border border-red-100">High Risk</span>
                            </div>
                            <div className="p-6 space-y-4">
                                {fraudAlerts.map((alert, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-red-50/50 border border-red-100 group hover:border-red-300 transition-all">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="text-xs font-black text-primary-text tracking-tight uppercase italic underline decoration-red-100">{alert.student}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{alert.course}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg bg-white border border-red-200 flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform">
                                                <Lock size={14} />
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-bold text-red-600 italic leading-relaxed mb-4">{alert.flag}</p>
                                        <div className="flex gap-2">
                                            <button className="flex-1 py-1.5 bg-red-600 text-white rounded text-[9px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-sm">Lock Submission</button>
                                            <button className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-400 rounded text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Dismiss</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
