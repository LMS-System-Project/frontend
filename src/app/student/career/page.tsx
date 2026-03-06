"use client";

import { useState, useEffect } from "react";
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
    Building,
    Target,
    Zap,
    ChevronRight,
    Globe,
    Compass,
    MapPin,
    ExternalLink,
    Sparkles,
    Download,
    FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/services/api";

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

interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    skills: string[];
    description: string;
    apply_url: string;
}

interface ResumeData {
    resume_markdown: string;
    skills: string[];
    courses: string[];
}

type Tab = "overview" | "jobs" | "resume";

const getTypeColor = (type: string) => {
    switch (type) {
        case "internship": return "bg-blue-50 text-blue-600";
        case "full-time": return "bg-emerald-50 text-emerald-600";
        case "part-time": return "bg-amber-50 text-amber-600";
        default: return "bg-slate-50 text-slate-600";
    }
};

export default function StudentCareerPage() {
    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [jobsLoading, setJobsLoading] = useState(false);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [generatingResume, setGeneratingResume] = useState(false);
    const [targetRole, setTargetRole] = useState("");
    const [searchQuery, setSearchQuery] = useState("software developer intern");
    const [location, setLocation] = useState("india");

    const fetchJobs = async (query?: string, loc?: string) => {
        setJobsLoading(true);
        try {
            const data = await api.student.career.jobs(query || searchQuery, loc || location);
            setJobs(data);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
        } finally {
            setJobsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "jobs" && jobs.length === 0) {
            fetchJobs();
        }
    }, [activeTab]);

    const generateResume = async () => {
        setGeneratingResume(true);
        try {
            const data = await api.student.career.generateResume({
                target_role: targetRole || "Software Developer Intern",
            });
            setResumeData(data);
        } catch (err) {
            console.error("Failed to generate resume:", err);
        } finally {
            setGeneratingResume(false);
        }
    };

    const tabs: { key: Tab; label: string }[] = [
        { key: "overview", label: "Overview" },
        { key: "jobs", label: "Job Listings" },
        { key: "resume", label: "Resume Builder" },
    ];

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <Compass size={14} className="text-accent" />
                        <span>Career Services • Job Matching</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight">Career Placement &amp; Market Insight</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        AI-powered matching between your academic profile and industry requirements.
                    </p>
                </div>
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === t.key
                                    ? "bg-white shadow-sm text-slate-900"
                                    : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
                <>
                    {/* Career Trajectory Cards */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Target size={14} />
                                Top Career Matches
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
                                                <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase">Match Score</span>
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
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Top Hiring Companies</div>
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
                                        <button
                                            onClick={() => setActiveTab("jobs")}
                                            className="text-xs font-bold text-accent flex items-center gap-1 hover:gap-2 transition-all"
                                        >
                                            View Jobs
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
                                <h3 className="text-lg font-bold text-primary-text tracking-tight text-center lg:text-left">Skills Analysis</h3>
                                <p className="text-xs text-slate-500 italic text-center lg:text-left">Benchmarking against AI Infrastructure Engineer (94% Match)</p>
                            </div>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={skillGapData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                        <XAxis type="number" domain={[0, 100]} hide />
                                        <YAxis type="category" dataKey="skill" axisLine={false} tickLine={false} tick={{ fill: '#1e293b', fontSize: 11, fontWeight: 700 }} width={80} />
                                        <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                                        <Bar dataKey="current" fill="#1E293B" radius={[0, 4, 4, 0]} barSize={12} />
                                        <Bar dataKey="required" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={4} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-[10px] text-slate-500 leading-relaxed text-center font-bold">
                                    <span className="text-accent">AI INSIGHT:</span> YOU ARE <span className="text-emerald-600">35% ABOVE CLASS AVG</span> IN PYTHON LOGIC. PRIMARY GROWTH AREA: <span className="text-red-500 underline decoration-slate-200">DEVOPS &amp; CLOUD ARCHITECTURE</span>.
                                </p>
                            </div>
                        </div>

                        {/* Secondary Hubs */}
                        <div className="space-y-8">
                            {/* Resume Engine */}
                            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm group cursor-pointer" onClick={() => setActiveTab("resume")}>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-bold text-primary-text uppercase tracking-widest leading-none">Resume Builder</h3>
                                    <Zap size={18} className="text-accent" />
                                </div>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-accent hover:bg-slate-50 transition-all">
                                    <div className="w-12 h-12 bg-slate-900 rounded-full mx-auto flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                        <Sparkles size={24} />
                                    </div>
                                    <p className="text-xs font-bold text-primary-text mb-1">AI-Powered Resume Generator</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Click to build your resume from your courses</p>
                                </div>
                            </div>

                            {/* Industry Sectors */}
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-white">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <Globe size={18} />
                                        <h3 className="text-xs font-bold uppercase tracking-widest">Global Sector Watch</h3>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500">Q1 2026</span>
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
                                    <button
                                        onClick={() => setActiveTab("jobs")}
                                        className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors tracking-widest flex items-center gap-2"
                                    >
                                        BROWSE LIVE JOB LISTINGS
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ── JOBS TAB ── */}
            {activeTab === "jobs" && (
                <div className="space-y-6">
                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
                    >
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1">
                                <label className="text-xs font-bold text-slate-500 mb-1 block">Job Title / Keywords</label>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="e.g., Software Developer Intern"
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onKeyDown={(e) => e.key === "Enter" && fetchJobs()}
                                />
                            </div>
                            <div className="md:w-48">
                                <label className="text-xs font-bold text-slate-500 mb-1 block">Location</label>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    <option value="india">India</option>
                                    <option value="bangalore">Bangalore</option>
                                    <option value="hyderabad">Hyderabad</option>
                                    <option value="mumbai">Mumbai</option>
                                    <option value="delhi">Delhi NCR</option>
                                    <option value="pune">Pune</option>
                                    <option value="chennai">Chennai</option>
                                    <option value="remote">Remote</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => fetchJobs()}
                                    disabled={jobsLoading}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50"
                                >
                                    {jobsLoading ? "Searching..." : "Search Jobs"}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {jobsLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center">
                            <Briefcase size={64} className="mx-auto text-slate-200 mb-6" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No Jobs Loaded</h3>
                            <p className="text-slate-500">Click "Search Jobs" to load live listings.</p>
                        </div>
                    ) : (
                        jobs.map((job, i) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${getTypeColor(job.type)}`}>
                                                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <MapPin size={12} />
                                                {job.location}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                                        <p className="text-sm text-blue-600 font-semibold mb-2">{job.company}</p>
                                        <p className="text-sm text-slate-500 mb-3">{job.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill) => (
                                                <span key={skill} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <a
                                        href={job.apply_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shrink-0"
                                    >
                                        Apply
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}

            {/* ── RESUME BUILDER TAB ── */}
            {activeTab === "resume" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Generate Section */}
                    <div className="lg:col-span-1 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles size={18} className="text-blue-600" />
                                <h3 className="font-bold text-slate-900">AI Resume Builder</h3>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">
                                Generate a professional resume based on your courses and skills.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Target Role</label>
                                    <input
                                        type="text"
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        placeholder="e.g., Software Developer Intern"
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={generateResume}
                                    disabled={generatingResume}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {generatingResume ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={16} />
                                            Generate Resume
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {resumeData && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                            >
                                <h4 className="font-bold text-slate-900 mb-3">Your Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData.skills.map((skill) => (
                                        <span key={skill} className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Resume Preview */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm min-h-[500px]"
                        >
                            {resumeData ? (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-slate-900">Resume Preview</h3>
                                        <button
                                            onClick={() => {
                                                const blob = new Blob([resumeData.resume_markdown], { type: "text/markdown" });
                                                const url = URL.createObjectURL(blob);
                                                const a = document.createElement("a");
                                                a.href = url;
                                                a.download = "resume.md";
                                                a.click();
                                            }}
                                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
                                        >
                                            <Download size={14} />
                                            Download .md
                                        </button>
                                    </div>
                                    <div className="prose prose-sm max-w-none">
                                        <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans bg-slate-50 p-6 rounded-xl">
                                            {resumeData.resume_markdown}
                                        </pre>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full py-16">
                                    <FileText size={64} className="text-slate-200 mb-6" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Resume Yet</h3>
                                    <p className="text-slate-500 text-center max-w-md">
                                        Enter a target role and click &ldquo;Generate Resume&rdquo; to create an AI-powered resume from your courses.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
}
