"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
    Users,
    Sparkles,
    MessageSquare,
    Zap,
    Brain,
    Target,
    Compass,
    Plus,
    Search,
    Filter,
    ChevronRight,
    ArrowUpRight,
    Award,
    Hash,
    MoreVertical,
    CheckCircle2,
    Users2,
    Share2,
    UserPlus
} from "lucide-react";

interface StudyGroup {
    id: string;
    name: string;
    course: string;
    members: number;
    matchScore: number;
    tags: string[];
    description: string;
}

const groups: StudyGroup[] = [
    { id: "1", name: "Quantum Mechanics Deep Dive", course: "PH 202", members: 4, matchScore: 98, tags: ["Conceptual", "Intensive"], description: "Focusing on wave-particle duality and Schrödinger equations. AI-Matched for complementary mathematical skills." },
    { id: "2", name: "BST & Graph Theory Lab", course: "CS 301", members: 3, matchScore: 92, tags: ["Problem Solving", "Drafting"], description: "Peer group for assignment #4. Strong algorithms background preferred." },
    { id: "3", name: "Calculus Optimization Hub", course: "MA 201", members: 5, matchScore: 85, tags: ["Foundational", "Weekly"], description: "Building core intuition for multivariate calculus. Weekly sync on Friday." },
];

export default function CollaborationHubPage() {
    const [activeTab, setActiveTab] = useState<"discovery" | "my-groups">("discovery");

    return (
        <DashboardShell role="student">
            <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
                {/* Institutional Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Users size={14} className="text-accent" />
                            <span>Academic Synthesis • Peer Governance</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Collaboration Hub</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Deploying <span className="text-accent font-bold italic">Neural Pairing</span> to eliminate institutional knowledge gaps.
                        </p>
                    </div>

                    <div className="flex p-1 bg-slate-100 rounded-xl">
                        <button
                            onClick={() => setActiveTab("discovery")}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "discovery" ? "bg-white text-accent shadow-sm" : "text-slate-400"
                                }`}
                        >
                            Mesh Discovery
                        </button>
                        <button
                            onClick={() => setActiveTab("my-groups")}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "my-groups" ? "bg-white text-accent shadow-sm" : "text-slate-400"
                                }`}
                        >
                            Active Clusters
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Discovery Engine Area */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Search & Tactical Filter */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="relative flex-1 group w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Scan for specialized study clusters..."
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm italic"
                                />
                            </div>
                            <button className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2 shadow-sm">
                                <Filter size={16} />
                                Refine Matrix
                            </button>
                        </div>

                        {/* AI Discovery Card */}
                        <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group border border-slate-800 shadow-2xl">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse-soft" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 text-accent mb-6">
                                    <Brain size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Matching Active</span>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight italic mb-6 leading-tight">
                                    We found a <span className="text-white italic underline decoration-accent/30 lowercase">98% match</span> for your Calculus skill-gap.
                                </h2>
                                <p className="text-sm text-slate-400 max-w-xl font-medium italic mb-10 leading-relaxed">
                                    Alex Kim and 2 others are currently synthesizing the next lecture. Their high proficiency in <span className="text-white">Applied Integration</span> complements your strength in <span className="text-white">Theoretic Proofs</span>.
                                </p>
                                <div className="flex items-center gap-4">
                                    <button className="px-8 py-4 bg-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2">
                                        Initiate Sync
                                        <Zap size={16} />
                                    </button>
                                    <button className="px-8 py-4 bg-white/5 text-white/60 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 hover:text-white transition-all">Dismiss Vector</button>
                                </div>
                            </div>
                        </div>

                        {/* Cluster Registry */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Hash size={14} className="text-accent" />
                                    Institutional Cluster Registry
                                </h3>
                                <span className="text-[9px] font-bold text-slate-300 uppercase italic">Updated 12m ago</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {groups.map((group) => (
                                    <div key={group.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm border-b-4 border-b-slate-100 hover:shadow-sharp hover:border-b-accent transition-all group flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 group-hover:bg-accent/5 group-hover:text-accent group-hover:border-accent/10 transition-all">
                                                <Users2 size={24} />
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center justify-end gap-1.5 text-accent mb-1">
                                                    <Sparkles size={12} />
                                                    <span className="text-[10px] font-black italic">{group.matchScore}% Match</span>
                                                </div>
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{group.course}</span>
                                            </div>
                                        </div>

                                        <h4 className="text-lg font-bold text-primary-text tracking-tight mb-2 italic group-hover:text-accent transition-colors">{group.name}</h4>
                                        <p className="text-[11px] text-slate-400 font-medium italic mb-6 flex-grow">{group.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {group.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest italic group-hover:bg-white transition-all">{tag}</span>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex -space-x-3">
                                                {Array.from({ length: 3 }).map((_, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-400 shadow-sm overflow-hidden group-hover:scale-110 transition-transform">
                                                        {String.fromCharCode(65 + i)}
                                                    </div>
                                                ))}
                                                <div className="w-8 h-8 rounded-full border-2 border-white bg-accent text-white flex items-center justify-center text-[8px] font-bold shadow-sm relative z-10">
                                                    +{group.members - 3}
                                                </div>
                                            </div>
                                            <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-accent hover:border-accent hover:shadow-sharp transition-all">
                                                <UserPlus size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-300 hover:border-accent/40 hover:bg-slate-50/50 hover:text-accent transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Plus size={24} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Deploy New Cluster</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Operational Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Achievement Hub */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm border-b-4 border-b-slate-100 text-center flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-6 border-4 border-white shadow-xl relative animate-in zoom-in duration-700">
                                <Award size={40} />
                                <div className="absolute -bottom-2 right-0 w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-accent shadow-lg animate-bounce-slow">
                                    <Zap size={14} />
                                </div>
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Synthesis Master</h4>
                            <p className="text-xl font-black text-primary-text italic tracking-tighter mb-4 underline decoration-amber-200 uppercase">Tier II Collaborator</p>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden shadow-inner mb-2">
                                <div className="h-full bg-amber-400 w-[64%] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">1,450 / 2,000 XP to Tier III</span>
                        </div>

                        {/* Peer Direct Link */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm border-b-4 border-b-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <MessageSquare size={14} className="text-accent" />
                                Direct Synthesis Directives
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { name: "Alexandra Kim", role: "Math Lead", status: "online" },
                                    { name: "Samuel Okafor", role: "Physics Arch", status: "away" },
                                    { name: "Mei Lin Zhang", role: "CS Specialist", status: "online" },
                                ].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs border border-slate-200 group-hover:scale-110 transition-transform">
                                                    {p.name.charAt(0)}
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${p.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-primary-text italic group-hover:text-accent transition-colors">{p.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.role}</p>
                                            </div>
                                        </div>
                                        <button className="p-2.5 rounded-xl text-slate-300 hover:text-accent hover:bg-slate-50 transition-all">
                                            <ArrowUpRight size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Reputation */}
                        <div className="bg-accent rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <Users size={100} strokeWidth={1} />
                            </div>
                            <h4 className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-10 flex items-center gap-2">
                                <Target size={14} />
                                Reputation Quotient
                            </h4>
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <span className="text-5xl font-black italic tracking-tighter">4.9</span>
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest ml-2">/ 5.0</span>
                                </div>
                                <div className="flex items-center gap-1 text-white/40">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Award key={i} size={14} className={i < 4 ? "text-white" : ""} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-[10px] text-white/70 italic leading-relaxed font-medium">
                                Your peer-rated synthesis quality is in the <span className="text-white font-bold">Top 2%</span> of the institutional registry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
