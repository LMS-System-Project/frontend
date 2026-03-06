"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Sparkles,
    MessageSquare,
    Brain,
    Target,
    Plus,
    Search,
    ChevronRight,
    Award,
    Hash,
    Users2,
    UserPlus,
    Star,
    BookOpen,
    Zap,
    ArrowUpRight,
    Globe,
    Lock,
    TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";

interface StudyGroup {
    id: string;
    course_id: string;
    course_title: string;
    course_code: string;
    member_count: number;
    members: { id: string; name: string; initials: string }[];
}

interface StudyPartner {
    id: string;
    full_name: string;
    shared_courses: string[];
    match_score: number;
}

const AVATAR_GRADIENTS = [
    "from-blue-500 to-indigo-600",
    "from-violet-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-600",
];

export default function CollaborationHubPage() {
    const [activeTab, setActiveTab] = useState<"discovery" | "partners">("discovery");
    const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
    const [studyPartners, setStudyPartners] = useState<StudyPartner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [groups, partners] = await Promise.all([
                api.student.collab.studyGroups(),
                api.student.collab.studyPartners(),
            ]);
            setStudyGroups(groups || []);
            setStudyPartners(partners || []);
        } catch (error) {
            console.error("Failed to fetch collab data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getMatchBadge = (score: number) => {
        if (score >= 3) return { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100", label: "Strong Match" };
        if (score >= 2) return { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-100", label: "Good Match" };
        return { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100", label: "Match" };
    };

    const filteredGroups = studyGroups.filter(g =>
        g.course_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.course_code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredPartners = studyPartners.filter(p =>
        p.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto pb-20">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <Users size={14} className="text-accent" />
                        <span>Collaboration • Study Groups</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">
                        Collaboration Hub
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Find and join <span className="text-accent font-bold italic">study groups</span> matched to your courses and learning goals.
                    </p>
                </div>

                <div className="flex p-1 bg-slate-100 rounded-xl self-start md:self-auto">
                    <button
                        onClick={() => setActiveTab("discovery")}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "discovery" ? "bg-white text-accent shadow-sm" : "text-slate-400"}`}
                    >
                        Study Groups
                    </button>
                    <button
                        onClick={() => setActiveTab("partners")}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "partners" ? "bg-white text-accent shadow-sm" : "text-slate-400"}`}
                    >
                        Find Partners
                    </button>
                </div>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Users2, label: "Study Groups", value: studyGroups.length.toString(), color: "text-accent", bg: "bg-accent/5" },
                    { icon: UserPlus, label: "Study Partners", value: studyPartners.length.toString(), color: "text-blue-500", bg: "bg-blue-50" },
                    { icon: TrendingUp, label: "Peer Rating", value: "4.9 / 5", color: "text-amber-500", bg: "bg-amber-50" },
                    { icon: Award, label: "Collab Tier", value: "Tier II", color: "text-violet-500", bg: "bg-violet-50" },
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm border-b-4 border-b-slate-100 flex items-center gap-4"
                    >
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                            <s.icon size={18} className={s.color} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                            <p className={`text-lg font-black italic ${s.color}`}>{s.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent" />
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Loading...</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* ── Main Content ── */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Search Bar */}
                        <div className="relative">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                            <input
                                type="text"
                                placeholder={activeTab === "discovery" ? "Search study groups..." : "Search partners..."}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-primary-text placeholder:text-slate-300 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all shadow-sm"
                            />
                        </div>

                        <AnimatePresence mode="wait">

                            {/* ── STUDY GROUPS TAB ── */}
                            {activeTab === "discovery" && (
                                <motion.div
                                    key="groups"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    className="space-y-5"
                                >
                                    {/* AI Banner */}
                                    {studyGroups.length > 0 && (
                                        <div className="bg-slate-900 rounded-3xl p-7 text-white relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/25 rounded-full blur-[60px] -mr-16 -mt-16" />
                                            <div className="relative z-10 flex items-center justify-between gap-6">
                                                <div>
                                                    <div className="flex items-center gap-2 text-accent mb-3">
                                                        <Brain size={16} />
                                                        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Smart Matching Active</span>
                                                    </div>
                                                    <h2 className="text-xl font-bold tracking-tight italic mb-2">
                                                        You&apos;re in <span className="underline decoration-accent/30">{studyGroups.length} study group{studyGroups.length !== 1 ? "s" : ""}</span>
                                                    </h2>
                                                    <p className="text-xs text-slate-400 font-medium italic">Groups are automatically matched to your enrolled courses.</p>
                                                </div>
                                                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                                                    <Sparkles size={22} className="text-accent" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between px-1">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Hash size={12} className="text-accent" />
                                            Your Study Groups
                                        </h3>
                                        <span className="text-[9px] font-bold text-slate-300 uppercase italic">{filteredGroups.length} group{filteredGroups.length !== 1 ? "s" : ""}</span>
                                    </div>

                                    {filteredGroups.length === 0 ? (
                                        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
                                            <BookOpen size={48} className="mx-auto text-slate-200 mb-5" />
                                            <h3 className="text-lg font-bold text-slate-700 mb-2">
                                                {searchQuery ? "No groups match your search" : "No Study Groups Yet"}
                                            </h3>
                                            <p className="text-sm text-slate-400 max-w-sm mx-auto">
                                                {searchQuery ? "Try a different search term." : "Enroll in courses to automatically join study groups with your classmates."}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {filteredGroups.map((group, idx) => (
                                                <motion.div
                                                    key={group.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm border-b-4 border-b-slate-100 hover:shadow-md hover:border-b-accent transition-all group flex flex-col"
                                                >
                                                    <div className="flex items-start justify-between mb-5">
                                                        <div className="w-11 h-11 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Users2 size={20} className="text-accent" />
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex items-center justify-end gap-1.5 text-accent mb-1">
                                                                <Users size={11} />
                                                                <span className="text-[10px] font-black italic">{group.member_count} members</span>
                                                            </div>
                                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{group.course_code}</span>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-base font-bold text-primary-text tracking-tight italic group-hover:text-accent transition-colors mb-1.5">{group.course_title}</h4>
                                                    <p className="text-[11px] text-slate-400 font-medium mb-5 flex-grow">{group.member_count} classmate{group.member_count !== 1 ? "s" : ""} enrolled in this course</p>

                                                    {/* Members avatars */}
                                                    <div className="mb-5">
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Classmates</p>
                                                        <div className="flex -space-x-2 items-center">
                                                            {group.members.slice(0, 5).map((member, mi) => (
                                                                <div
                                                                    key={member.id}
                                                                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[mi % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-[10px] font-black border-2 border-white shadow-sm`}
                                                                    title={member.name}
                                                                >
                                                                    {member.initials}
                                                                </div>
                                                            ))}
                                                            {group.members.length > 5 && (
                                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-black border-2 border-white">
                                                                    +{group.members.length - 5}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                                                            <Globe size={10} />
                                                            Course Group
                                                        </span>
                                                        <button className="flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/10 text-accent rounded-xl hover:bg-accent hover:text-white transition-all text-[9px] font-black uppercase tracking-widest">
                                                            <MessageSquare size={12} />
                                                            Open Chat
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}

                                            {/* Add more CTA */}
                                            <button className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-300 hover:border-accent/40 hover:bg-accent/[0.02] hover:text-accent transition-all group min-h-[220px]">
                                                <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-accent/10 transition-all">
                                                    <Plus size={20} />
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-center">Enroll in More<br />Courses</p>
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* ── FIND PARTNERS TAB ── */}
                            {activeTab === "partners" && (
                                <motion.div
                                    key="partners"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    className="space-y-5"
                                >
                                    <div className="flex items-center justify-between px-1">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <UserPlus size={12} className="text-accent" />
                                            Suggested Study Partners
                                        </h3>
                                        <span className="text-[9px] font-bold text-slate-300 uppercase italic">Matched by shared courses</span>
                                    </div>

                                    {filteredPartners.length === 0 ? (
                                        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
                                            <UserPlus size={48} className="mx-auto text-slate-200 mb-5" />
                                            <h3 className="text-lg font-bold text-slate-700 mb-2">
                                                {searchQuery ? "No partners match your search" : "No Study Partners Found"}
                                            </h3>
                                            <p className="text-sm text-slate-400 max-w-sm mx-auto">
                                                {searchQuery ? "Try a different name." : "Enroll in more courses to find study partners who share your classes."}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {filteredPartners.map((partner, idx) => {
                                                const badge = getMatchBadge(partner.match_score);
                                                return (
                                                    <motion.div
                                                        key={partner.id}
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md border-b-4 border-b-slate-100 hover:border-b-accent transition-all group"
                                                    >
                                                        <div className="flex items-center justify-between gap-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform`}>
                                                                    {partner.full_name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <h3 className="text-base font-bold text-primary-text italic group-hover:text-accent transition-colors">{partner.full_name}</h3>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.text} ${badge.bg} ${badge.border}`}>
                                                                            <Star size={9} />
                                                                            {badge.label} · {partner.match_score} {partner.match_score === 1 ? "course" : "courses"}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <button className="px-4 py-2.5 bg-accent text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md flex-shrink-0">
                                                                <UserPlus size={12} />
                                                                Connect
                                                            </button>
                                                        </div>

                                                        <div className="mt-5 pt-4 border-t border-slate-100">
                                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Shared Courses</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {partner.shared_courses.map((course) => (
                                                                    <span
                                                                        key={course}
                                                                        className="text-[10px] px-3 py-1 bg-slate-50 text-slate-600 rounded-full border border-slate-100 font-semibold"
                                                                    >
                                                                        {course}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Sidebar ── */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Collaborator Badge */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm border-b-4 border-b-slate-100 text-center flex flex-col items-center">
                            <div className="relative mb-5">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl border-4 border-white">
                                    <Award size={36} className="text-white" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-accent shadow-lg">
                                    <Zap size={15} />
                                </div>
                            </div>
                            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Active Collaborator</h4>
                            <p className="text-xl font-black text-primary-text italic tracking-tighter mb-4 underline decoration-amber-200 uppercase">Tier II</p>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "64%" }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                                />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">1,450 / 2,000 XP to Tier III</span>
                        </div>

                        {/* Direct Messages */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm border-b-4 border-b-slate-100">
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare size={13} className="text-accent" />
                                    Direct Messages
                                </h4>
                                <button className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-300 hover:text-accent transition-all">
                                    <Plus size={14} />
                                </button>
                            </div>
                            <div className="space-y-1">
                                {(studyPartners.length > 0
                                    ? studyPartners.slice(0, 3).map((p, i) => ({ name: p.full_name, sub: `${p.match_score} shared course${p.match_score !== 1 ? "s" : ""}`, online: i === 0 }))
                                    : [
                                        { name: "Alexandra Kim", sub: "Math Lead", online: true },
                                        { name: "Samuel Okafor", sub: "Physics Arch", online: false },
                                        { name: "Mei Lin Zhang", sub: "CS Specialist", online: true },
                                    ]
                                ).map((p, i) => (
                                    <button key={i} className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-slate-50 transition-colors group text-left">
                                        <div className="relative flex-shrink-0">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-black text-xs shadow-sm group-hover:scale-105 transition-transform`}>
                                                {p.name.charAt(0)}
                                            </div>
                                            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${p.online ? "bg-emerald-500" : "bg-slate-300"}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-primary-text group-hover:text-accent transition-colors truncate italic">{p.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider truncate">{p.sub}</p>
                                        </div>
                                        <ArrowUpRight size={14} className="text-slate-200 group-hover:text-accent transition-all flex-shrink-0" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Peer Rating */}
                        <div className="bg-accent rounded-3xl p-7 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Users size={90} strokeWidth={1} />
                            </div>
                            <h4 className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Target size={13} />
                                Peer Rating
                            </h4>
                            <div className="flex items-end justify-between mb-5">
                                <div>
                                    <span className="text-5xl font-black italic tracking-tighter">4.9</span>
                                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">/ 5.0</span>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={14} className={i < 5 ? "text-white fill-white" : "text-white/30"} />
                                    ))}
                                </div>
                            </div>
                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-white/70 rounded-full" style={{ width: "98%" }} />
                            </div>
                            <p className="text-[10px] text-white/60 italic leading-relaxed font-medium">
                                Your collaboration quality is in the <span className="text-white font-bold">Top 2%</span> of the platform.
                            </p>
                        </div>

                        {/* Privacy Note */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Lock size={13} className="text-slate-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Privacy First</p>
                                <p className="text-[10px] text-slate-400 leading-relaxed">Your profile is only visible to students in shared courses. You control your connections.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
