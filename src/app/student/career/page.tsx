"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Briefcase,
    TrendingUp,
    Star,
    ArrowRight,
    Upload,
    Building,
    Target,
    Zap,
    ShieldCheck,
    ChevronRight,
    Search,
    Globe,
    Compass
} from "lucide-react";

const skillGapData = [
    { skill: "Python", current: 85, required: 90 },
    { skill: "ML / AI", current: 45, required: 85 },
    { skill: "SQL Core", current: 70, required: 75 },
    { skill: "DevOps", current: 30, required: 70 },
    { skill: "React.js", current: 68, required: 65 },
    { skill: "Design", current: 40, required: 80 },
];

const careerPaths = [
    {
        title: "AI Infrastructure Engineer",
        match: 94,
        companies: ["NVIDIA", "DeepMind", "Azure"],
        salaryRange: "$140k – $220k",
        color: "text-blue-600",
        bg: "bg-blue-50",
        skills: ["CUDA", "Python", "Cloud Architecture"],
    },
    {
        title: "Protocol Architect",
        match: 88,
        companies: ["Stripe", "Chainlink", "Polygon"],
        salaryRange: "$160k – $240k",
        color: "text-slate-900",
        bg: "bg-slate-100",
        skills: ["Distributed Systems", "Rust", "Security"],
    },
    {
        title: "Quantitative Researcher",
        match: 76,
        companies: ["Jane Street", "Citadel", "Goldman"],
        salaryRange: "$200k – $450k",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        skills: ["Stochastic Calculus", "C++", "R"],
    },
];

const trendSectors = [
    { name: "Generative Systems", growth: "+42%", hot: true },
    { name: "Zero-Knowledge Proofs", growth: "+31%", hot: true },
    { name: "Sovereign Cloud", growth: "+24%", hot: false },
    { name: "Precision BioTech", growth: "+19%", hot: false },
    { name: "Edge Computing", growth: "+14%", hot: false },
];

export default function StudentCareerPage() {
    return (
        <div className="space-y-8 max-w-[1200px] mx-auto">
            {/* Strategic Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <Compass size={14} className="text-accent" />
                        <span>Professional Placement • Intelligence Hub</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight">Career Placement & Market Insight</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Algorithmic matching between your academic competency and enterprise requirements.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-md text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
                        Institutional CV
                        <ChevronRight size={14} />
                    </button>
                    <button className="px-4 py-2 bg-accent text-white rounded-md text-xs font-bold shadow-sm border border-slate-700 hover:bg-slate-800 transition-all">
                        Active Applications (12)
                    </button>
                </div>
            </div>

            {/* Career Trajectory Cards */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Target size={14} />
                        Elite Opportunity Matches
                    </h2>
                    <span className="text-[10px] font-bold text-slate-400">UPDATED 1H AGO</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {careerPaths.map((path, i) => (
                        <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-sharp transition-all group flex flex-col h-full border-b-4 border-b-slate-100 hover:border-b-accent">
                            <div className="p-6 flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-10 h-10 ${path.bg} ${path.color} rounded flex items-center justify-center`}>
                                        <Briefcase size={20} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-2xl font-black ${path.color} tracking-tight`}>{path.match}%</span>
                                        <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">Match Pulse</span>
                                    </div>
                                </div>
                                <h3 className="text-base font-bold text-primary-text mb-1 tracking-tight group-hover:text-accent transition-colors">{path.title}</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{path.salaryRange}</p>

                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {path.skills.map((s, j) => (
                                        <span key={j} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-bold border border-slate-100">{s}</span>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Primary Hiring Nodes</div>
                                    <div className="flex flex-wrap gap-2">
                                        {path.companies.map((c, k) => (
                                            <div key={k} className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                {c}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entry Level • Tier 1</span>
                                <button className="text-xs font-bold text-accent flex items-center gap-1 hover:gap-2 transition-all">
                                    Strategic Depth
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Analysis & Engine Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skill Gap Analysis */}
                <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-primary-text tracking-tight text-center lg:text-left">Skill Gap Matrix</h3>
                        <p className="text-xs text-slate-500 italic text-center lg:text-left">Benchmarking against AI Infrastructure Engineer (94% Match)</p>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={skillGapData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis type="category" dataKey="skill" axisLine={false} tickLine={false} tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 700 }} width={80} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '11px'
                                    }}
                                />
                                <Bar dataKey="current" fill="#1E293B" radius={[0, 4, 4, 0]} barSize={12} />
                                <Bar dataKey="required" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <p className="text-[10px] text-slate-500 leading-relaxed text-center font-bold">
                            <span className="text-accent">AI INSIGHT:</span> YOU ARE <span className="text-emerald-600">35% ABOVE COHORT AVG</span> IN PYTHON LOGIC. PRIMARY GROWTH AREA: <span className="text-red-500 underline decoration-slate-200">DEVOPS & CLOUD ARCHITECTURE</span>.
                        </p>
                    </div>
                </div>

                {/* Secondary Hubs */}
                <div className="space-y-8">
                    {/* Resume Engine */}
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm group">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-primary-text uppercase tracking-widest leading-none">CV Intelligence Engine</h3>
                            <Zap size={18} className="text-accent" />
                        </div>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-accent hover:bg-slate-50 transition-all cursor-pointer">
                            <div className="w-12 h-12 bg-slate-900 rounded-full mx-auto flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <Upload size={24} />
                            </div>
                            <p className="text-xs font-bold text-primary-text mb-1">EXECUTE RESUME SCAN</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Synchronized with Institutional Template V2.4</p>
                        </div>
                    </div>

                    {/* Industry Sectors */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-white">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <Globe size={18} />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Global Sector Watch</h3>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">Q3 2025</span>
                        </div>
                        <div className="space-y-4">
                            {trendSectors.map((sector, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${sector.hot ? 'bg-red-500 animate-pulse' : 'bg-slate-700'}`} />
                                        <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{sector.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black text-emerald-400 italic tracking-tighter">{sector.growth}</span>
                                        <ChevronRight size={14} className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center">
                            <button className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors tracking-widest flex items-center gap-2">
                                VIEW ALL INSTITUTIONAL TRENDS
                                <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ArrowUpRight = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
    </svg>
);
