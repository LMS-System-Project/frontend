"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api } from "@/services/api";
import {
    Users,
    Loader2,
    Search,
    BookOpen,
    Filter,
    MoreHorizontal,
    Mail,
    ExternalLink,
    Calendar,
    ChevronDown,
    Activity,
    ShieldCheck,
    Target
} from "lucide-react";

interface Student {
    id: string;
    full_name: string;
    department?: string;
    course_id: string;
    course_code: string;
    course_title: string;
    enrolled_at?: string;
}

function hashColor(name: string): string {
    const colors = ["indigo", "emerald", "purple", "rose", "cyan", "amber", "teal", "blue", "orange", "pink"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}

export default function StudentsPage() {
    const router = useRouter();
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!api.auth.getToken()) { router.push("/login"); return; }
        fetchStudents();
    }, []);

    async function fetchStudents() {
        try {
            setLoading(true);
            const data = await api.instructor.students.list();
            setStudents(data);
        } catch (err: any) {
            setError(err.message || "Failed to load students");
        } finally {
            setLoading(false);
        }
    }

    const filtered = students.filter((s) =>
        `${s.full_name} ${s.course_code} ${s.department || ""}`.toLowerCase().includes(search.toLowerCase())
    );

    // Group students by course
    const grouped = filtered.reduce<Record<string, { code: string; title: string; students: Student[] }>>((acc, s) => {
        if (!acc[s.course_id]) {
            acc[s.course_id] = { code: s.course_code, title: s.course_title, students: [] };
        }
        acc[s.course_id].students.push(s);
        return acc;
    }, {});

    const uniqueStudentCount = new Set(students.map((s) => s.id)).size;
    const courseCount = new Set(students.map((s) => s.course_id)).size;

    return (
        <DashboardShell role="instructor">
            <div className="space-y-8 max-w-[1200px] mx-auto">
                {/* Institutional Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Users size={14} className="text-accent" />
                            <span>Academic Registry • Cohort Management</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Instructional Cohorts</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Governance of <span className="text-accent font-bold">{uniqueStudentCount} Individual Learners</span> across your modular portfolio.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shadow-inner">
                                <Target size={20} />
                            </div>
                            <div>
                                <p className="text-xl font-black text-primary-text leading-none tracking-tighter italic">{uniqueStudentCount}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Enrolled</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-amber-500 shadow-inner">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <p className="text-xl font-black text-primary-text leading-none tracking-tighter italic">{courseCount}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Modules</p>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex justify-between animate-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} />
                            SYSTEM ERROR: {error.toUpperCase()}
                        </div>
                        <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                    </div>
                )}

                {/* Tactical Search & Filter */}
                <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
                    <div className="relative flex-1 group w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Scan cohort registry by name, department, or module code..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm"
                        />
                    </div>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm uppercase tracking-widest whitespace-nowrap">
                        <Filter size={16} />
                        Active Filters
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-slate-100 border-t-accent rounded-full animate-spin" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Synchronizing Registry Schema...</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center flex flex-col items-center group">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                            <Users size={32} />
                        </div>
                        <h4 className="text-base font-bold text-primary-text uppercase tracking-widest">{search ? "No Matches Identified" : "Institutional Void"}</h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 italic font-medium leading-relaxed">
                            {search ? `Your query "${search}" did not return any results from the instructional registry.` : "No active learners identified in your modular portfolio. Enrollments are synchronized automatically."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {Object.entries(grouped).map(([courseId, group]) => (
                            <div key={courseId} className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-slate-900 text-white rounded flex items-center justify-center text-[10px] font-black shadow-lg border border-slate-800 uppercase tracking-tighter">
                                            {group.code.substring(0, 4)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-primary-text tracking-tight italic underline decoration-slate-200">{group.title}</h3>
                                            <div className="flex items-center gap-3 mt-0.5">
                                                <span className="text-[9px] font-black text-accent uppercase tracking-widest">{group.code}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{group.students.length} REGISTERED LEARNER{group.students.length !== 1 ? 'S' : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-slate-400 hover:text-accent transition-colors flex items-center gap-2 uppercase tracking-widest">
                                        Modular Analytics
                                        <ChevronDown size={14} className="-rotate-90" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {group.students.map((student) => {
                                        const col = hashColor(student.full_name);
                                        const initials = student.full_name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                                        return (
                                            <div key={`${courseId}-${student.id}`} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-sharp hover:border-accent/30 transition-all group border-b-4 border-b-slate-100 hover:border-b-accent">
                                                <div className="p-6">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className={`w-12 h-12 rounded-xl bg-${col}-500/10 text-${col}-600 flex items-center justify-center text-sm font-bold shadow-sm border border-${col}-500/20 group-hover:scale-110 transition-transform duration-300`}>
                                                            {initials}
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">Status</span>
                                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100 italic">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                                <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">ACTIVE</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h4 className="text-base font-bold text-primary-text tracking-tight mb-1 group-hover:text-accent transition-colors">{student.full_name}</h4>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 italic">{student.department || "General Sciences Deck"}</p>

                                                    <div className="space-y-3 pt-3 border-t border-slate-50">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                                                                <Calendar size={10} />
                                                                Enrollment
                                                            </span>
                                                            <span className="text-[10px] font-bold text-primary-text">{student.enrolled_at ? new Date(student.enrolled_at).toLocaleDateString() : "SYD-2025"}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                                                                <Activity size={10} />
                                                                Engagement
                                                            </span>
                                                            <div className="flex gap-1">
                                                                {[1, 2, 3, 4, 5].map(i => (
                                                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 4 ? 'bg-accent shadow-[0_0_5px_rgba(27,51,84,0.3)]' : 'bg-slate-100'}`} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-accent hover:border-accent transition-all shadow-sm">
                                                            <Mail size={14} />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-accent hover:border-accent transition-all shadow-sm">
                                                            <ExternalLink size={14} />
                                                        </button>
                                                    </div>
                                                    <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-white hover:bg-black transition-all shadow-sm">
                                                        <MoreHorizontal size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
