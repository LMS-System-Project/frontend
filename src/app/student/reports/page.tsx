"use client";

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import {
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    ArrowRight,
    Target,
    Zap,
    ShieldCheck,
    BrainCircuit,
    ChevronRight,
    Search
} from "lucide-react";

const strengthData = [
    { subject: "Logic", score: 90 },
    { subject: "Quant", score: 84 },
    { subject: "DS/Algo", score: 92 },
    { subject: "Eng", score: 78 },
    { subject: "Theory", score: 85 },
    { subject: "Hardware", score: 76 },
];

const semesterGrades = [
    { sem: "S1", average: 72 },
    { sem: "S2", average: 78 },
    { sem: "S3", average: 81 },
    { sem: "S4", average: 79 },
    { sem: "S5", average: 84 },
    { sem: "S6", average: 87 },
];

const roadmapSteps = [
    { step: "Strengthen Advanced Calculus fundamentals", done: true, priority: "high", time: "Completed" },
    { step: "Initialize Research Project in AI Ethics", done: true, priority: "medium", time: "Completed" },
    { step: "Attend CS Advanced Workshop (Neural Networks)", done: false, priority: "high", time: "Week 12" },
    { step: "Submit Semester 6 Capstone Proposal", done: false, priority: "high", time: "Week 14" },
    { step: "Prepare for GRE/GEMS Institutional Exam", done: false, priority: "medium", time: "Week 16" },
];

export default function StudentReportsPage() {
    return (
        <div className="space-y-8 max-w-[1200px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <Target size={14} className="text-accent" />
                        <span>Adaptive Learning Engine • Analytics</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight">Academic Roadmap & Insight</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Detailed trajectory analysis based on institutional performance metrics.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                        Download Report
                        <ChevronRight size={14} />
                    </button>
                    <button className="px-4 py-2 bg-accent text-white rounded-md text-xs font-bold shadow-sm border border-slate-700 hover:bg-slate-800 transition-all">
                        Consult AI Academic Advisor
                    </button>
                </div>
            </div>

            {/* Performance Indicators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm border-t-4 border-t-emerald-500">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded flex items-center justify-center">
                            <ShieldCheck size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">OPTIMAL</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Academic Health</h3>
                    <div className="text-2xl font-bold text-primary-text mb-1 italic">Low Risk</div>
                    <p className="text-[10px] text-slate-500">Predicted graduation probability: <span className="text-emerald-600 font-bold">94.2%</span></p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm border-t-4 border-t-accent">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-slate-100 text-accent rounded flex items-center justify-center">
                            <Zap size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-accent bg-slate-100 px-2 py-0.5 rounded-full">TOP 5%</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Global Percentile</h3>
                    <div className="text-2xl font-bold text-primary-text mb-1 italic">Elite Standing</div>
                    <p className="text-[10px] text-slate-500">Ranking strictly within university cohort across all depts.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm border-t-4 border-t-accent">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-slate-100 text-accent rounded flex items-center justify-center">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-accent bg-slate-100 px-2 py-0.5 rounded-full">ACTIVE</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Credit Progress</h3>
                    <div className="text-2xl font-bold text-primary-text mb-1 italic">87 / 160</div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                        <div className="bg-accent h-full w-[54%] rounded-full" />
                    </div>
                </div>
            </div>

            {/* Analysis Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-primary-text tracking-tight">Competency Analysis</h3>
                        <p className="text-xs text-slate-500 italic">Multivariate skill evaluation across core dimensions</p>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={strengthData}>
                                <PolarGrid stroke="#f1f5f9" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                                <Radar
                                    name="Score"
                                    dataKey="score"
                                    stroke="#1E293B"
                                    fill="#1E293B"
                                    fillOpacity={0.1}
                                    strokeWidth={2}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        fontSize: '12px'
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-primary-text tracking-tight">Cohort Benchmarking</h3>
                        <p className="text-xs text-slate-500 italic">Average semester-wise grade progression trend</p>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={semesterGrades} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="sem" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        fontSize: '12px'
                                    }}
                                />
                                <Bar dataKey="average" fill="#1E293B" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* AI Generated Roadmap Section */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-8 text-accent">
                    <BrainCircuit size={24} />
                    <div>
                        <h3 className="text-lg font-bold tracking-tight leading-none mb-1">AI Adaptive Roadmap</h3>
                        <p className="text-xs text-slate-500">Autonomous intelligence predicting optimal study paths.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-4">
                        {roadmapSteps.map((item, i) => (
                            <div key={i} className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${item.done ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 shadow-sm hover:border-accent'}`}>
                                <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500 text-white' : 'border-2 border-slate-200 text-slate-300'}`}>
                                    {item.done ? <CheckCircle size={12} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className={`text-sm font-bold ${item.done ? 'text-slate-400 line-through' : 'text-primary-text'}`}>{item.step}</p>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${item.priority === 'high' ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50'
                                            }`}>{item.priority}</span>
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Deadline: {item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 bg-slate-900 rounded-xl text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-sm font-bold mb-2">Roadmap Simulation</h4>
                                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                    Based on current performance trends, your probability of achieving <span className="text-white font-bold italic">CGPA 9.0</span> by Semester 8 is <span className="text-emerald-400 font-bold underline italic">82%</span>.
                                </p>
                                <button className="w-full py-2 bg-white text-accent rounded font-bold text-xs hover:bg-slate-100 transition-all">
                                    Run New Simulation
                                </button>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                                <Activity size={100} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Recommendations</h4>
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded text-xs text-slate-600 leading-relaxed italic">
                                &ldquo;Improvement in quantitative logic markers identified. Focus on Semester 7 Algorithms pre-requisites for specialized track placement.&rdquo;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
