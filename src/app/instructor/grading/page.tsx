"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api } from "@/services/api";
import {
    GraduationCap,
    Plus,
    Loader2,
    X,
    CheckCircle,
    Clock,
    AlertCircle,
    Search,
    Filter,
    MoreHorizontal,
    FileText,
    Target,
    Zap,
    Users,
    ChevronDown,
    Calendar,
    Brain
} from "lucide-react";

interface Assignment {
    id: string;
    course_id: string;
    course_code?: string;
    course_title?: string;
    title: string;
    due_date?: string;
    created_at?: string;
}

interface Submission {
    id: string;
    assignment_id: string;
    assignment_title?: string;
    course_code?: string;
    student_id: string;
    student_name?: string;
    status: string;
    grade?: string;
    submitted_at?: string;
}

interface Course {
    id: string;
    code: string;
    title: string;
}

export default function GradingPage() {
    const router = useRouter();
    const [tab, setTab] = useState<"submissions" | "assignments">("submissions");
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Grade modal
    const [grading, setGrading] = useState<Submission | null>(null);
    const [gradeValue, setGradeValue] = useState("");
    const [submittingGrade, setSubmittingGrade] = useState(false);

    // Create assignment modal
    const [showCreate, setShowCreate] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newCourseId, setNewCourseId] = useState("");
    const [newDueDate, setNewDueDate] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        if (!api.auth.getToken()) { router.push("/login"); return; }
        fetchAll();
    }, []);

    async function fetchAll() {
        try {
            setLoading(true);
            const [subs, assigns, crses] = await Promise.all([
                api.instructor.submissions.list(),
                api.instructor.assignments.list(),
                api.instructor.courses.list(),
            ]);
            setSubmissions(subs);
            setAssignments(assigns);
            setCourses(crses);
        } catch (err: any) {
            setError(err.message || "Failed to load data");
        } finally {
            setLoading(false);
        }
    }

    async function handleGrade() {
        if (!grading || !gradeValue.trim()) return;
        try {
            setSubmittingGrade(true);
            await api.instructor.submissions.grade(grading.id, { grade: gradeValue });
            setGrading(null);
            setGradeValue("");
            fetchAll();
        } catch (err: any) {
            setError(err.message || "Failed to grade");
        } finally {
            setSubmittingGrade(false);
        }
    }

    async function handleCreateAssignment() {
        if (!newTitle.trim() || !newCourseId) return;
        try {
            setCreating(true);
            await api.instructor.assignments.create({
                course_id: newCourseId,
                title: newTitle,
                due_date: newDueDate || undefined,
            });
            setShowCreate(false);
            setNewTitle(""); setNewCourseId(""); setNewDueDate("");
            fetchAll();
        } catch (err: any) {
            setError(err.message || "Failed to create assignment");
        } finally {
            setCreating(false);
        }
    }

    const STATUS_THEMES: Record<string, { label: string; color: string; bg: string; icon: any }> = {
        pending: { label: "Awaiting Action", color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
        reviewed: { label: "Reviewed/Feedback", color: "text-blue-600", bg: "bg-blue-100/50", icon: AlertCircle },
        graded: { label: "Evaluation Finalized", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle },
    };

    return (
        <DashboardShell role="instructor">
            <div className="space-y-8 max-w-[1200px] mx-auto">
                {/* Governance Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Target size={14} className="text-accent" />
                            <span>Evaluation Hub • Academic Performance</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Assessment & Grading</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Governance of student submissions and instructional assessments for the <span className="text-accent font-bold">Autumn 2025</span> cycle.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="px-6 py-3 bg-accent text-white rounded-xl text-sm font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 self-start"
                    >
                        <Plus size={18} />
                        Define New Assessment
                    </button>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex justify-between animate-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-2">
                            <AlertCircle size={14} />
                            {error.toUpperCase()}
                        </div>
                        <button onClick={() => setError("")} className="text-red-400 hover:text-red-600">✕</button>
                    </div>
                )}

                {/* Sub-Header Tabs & Search */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-2">
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit">
                        {[
                            { id: "submissions", label: `Submissions (${submissions.length})` },
                            { id: "assignments", label: `Registry (${assignments.length})` },
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id as any)}
                                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${tab === t.id ? 'bg-white shadow-sm text-accent border border-slate-200' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 lg:max-w-xl">
                        <div className="relative flex-1 group w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Scan by student name or module ID..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm"
                            />
                        </div>
                        <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm uppercase tracking-widest whitespace-nowrap">
                            <Filter size={14} />
                            Matrix Filter
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-10 h-10 border-4 border-slate-100 border-t-accent rounded-full animate-spin" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aggregating Evaluation Stream...</span>
                    </div>
                ) : tab === "submissions" ? (
                    submissions.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center flex flex-col items-center group">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                <FileText size={32} />
                            </div>
                            <h4 className="text-base font-bold text-primary-text uppercase tracking-widest">Digital Void Identifed</h4>
                            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 italic font-medium">No student engagements currently recorded in the submission registry.</p>
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student / Cohort</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assessment Module</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registry ID</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Evaluation Status</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</th>
                                        <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Engagement</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {submissions.map((sub) => {
                                        const theme = STATUS_THEMES[sub.status] || STATUS_THEMES.pending;
                                        const Icon = theme.icon;
                                        return (
                                            <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-white text-[10px] font-black uppercase shadow-sm">
                                                            {sub.student_name?.charAt(0) || 'S'}
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-bold text-primary-text tracking-tight">{sub.student_name}</div>
                                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Cohort 2025</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-bold text-primary-text">{sub.assignment_title}</div>
                                                    <div className="text-[10px] text-slate-400 font-medium italic">Autumn Cycle</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[10px] font-black text-accent py-0.5 px-2 bg-slate-100 rounded border border-slate-200 uppercase">{sub.course_code}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`flex items-center gap-2 px-2.5 py-1 rounded w-fit italic ${theme.bg} ${theme.color}`}>
                                                        <Icon size={12} />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{theme.label}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {sub.grade ? (
                                                        <span className="text-sm font-black text-accent italic tracking-tighter decoration-emerald-500 underline decoration-2">{sub.grade}</span>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">— Pending</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => { setGrading(sub); setGradeValue(sub.grade || ""); }}
                                                        className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-accent hover:border-accent hover:shadow-sm transition-all uppercase tracking-widest"
                                                    >
                                                        {sub.status === "graded" ? "Modify Index" : "Execute Grade"}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                ) : (
                    assignments.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center flex flex-col items-center group cursor-pointer" onClick={() => setShowCreate(true)}>
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                <Plus size={32} />
                            </div>
                            <h4 className="text-base font-bold text-primary-text uppercase tracking-widest">Institutional Assessment Gap</h4>
                            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 italic font-medium">Define your first instructional assignment to initialize the grading pipeline.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {assignments.map((a) => (
                                <div key={a.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-sharp hover:border-accent/30 transition-all group border-b-4 border-b-slate-100 hover:border-b-accent">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="text-[10px] font-black text-accent px-2 py-0.5 bg-slate-100 rounded border border-slate-200 uppercase tracking-widest">{a.course_code}</div>
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center group-hover:text-accent transition-colors">
                                            <FileText size={18} />
                                        </div>
                                    </div>
                                    <h3 className="text-base font-bold text-primary-text tracking-tight mb-4 group-hover:text-accent transition-colors">{a.title}</h3>
                                    <div className="space-y-4">
                                        {a.due_date && (
                                            <div className="flex items-center gap-3">
                                                <Calendar size={14} className="text-slate-400" />
                                                <div>
                                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Due Trajectory</div>
                                                    <div className="text-xs font-bold text-primary-text">{new Date(a.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3">
                                            <Users size={14} className="text-slate-400" />
                                            <div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Expected Cohort</div>
                                                <div className="text-xs font-bold text-primary-text">Full Dept Enrollment</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Registered: {new Date(a.created_at || Date.now()).toLocaleDateString()}</span>
                                        <button className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all group-hover:underline">
                                            Matrix View
                                            <ChevronDown size={14} className="-rotate-90" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}

                {/* Grade Execution Modal */}
                {grading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setGrading(null)}>
                        <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-200 relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setGrading(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-all">
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl border border-slate-700">
                                    <CheckCircle size={28} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl font-bold text-primary-text tracking-tight mb-1 italic underline decoration-slate-200">Execution of Performance Index</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold truncate">Protocol: Institutional Grading V2.9</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-black shadow-sm">
                                        {grading.student_name?.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-primary-text">{grading.student_name}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{grading.assignment_title} • {grading.course_code}</div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Performance Marker (Grade / Point Index)</label>
                                    <input
                                        value={gradeValue}
                                        onChange={(e) => setGradeValue(e.target.value)}
                                        placeholder="e.g. A, B+, 92, Elite"
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all placeholder:font-medium placeholder:text-slate-300 italic"
                                    />
                                </div>

                                <div className="bg-slate-900 rounded-2xl p-6 text-white group border border-slate-800">
                                    <div className="flex items-center gap-2 mb-4 text-emerald-400">
                                        <Brain size={18} />
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest">AI Assisted Feedback Cycle</h4>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium mb-6 italic group-hover:text-slate-200 transition-colors">
                                        &ldquo;GradeFlow AI suggests a <span className="text-emerald-400 font-bold">score weighted at 92-94%</span> based on historical data markers of this cohort in similar modules.&rdquo;
                                    </p>
                                    <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">Enable Automated Correction</button>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={() => setGrading(null)}
                                        className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all uppercase tracking-[0.2em]"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        onClick={handleGrade}
                                        disabled={submittingGrade}
                                        className="flex-1 py-4 bg-accent text-white rounded-xl text-xs font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-[0.2em]"
                                    >
                                        {submittingGrade ? <Loader2 className="w-4 h-4 animate-spin" /> : "Commit Index"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Create Assessment Governance Modal */}
                {showCreate && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCreate(false)}>
                        <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-200 relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setShowCreate(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-all">
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl border border-slate-700">
                                    <Plus size={28} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl font-bold text-primary-text tracking-tight mb-1">New Assessment Governance</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Institutional Registry Protocol V1.2</p>
                                </div>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); handleCreateAssignment(); }} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Institutional Module Selection</label>
                                    <select
                                        value={newCourseId}
                                        onChange={(e) => setNewCourseId(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all appearance-none italic font-medium"
                                        required
                                    >
                                        <option value="">Select Modular Unit</option>
                                        {courses.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Assessment Designation</label>
                                    <input
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        placeholder="e.g. Advanced Calculus Proficiency Exam"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all italic font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Due Trajectory Date</label>
                                    <input
                                        type="date"
                                        value={newDueDate}
                                        onChange={(e) => setNewDueDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all italic font-medium"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreate(false)}
                                        className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all uppercase tracking-[0.2em]"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={creating}
                                        className="flex-1 py-4 bg-accent text-white rounded-xl text-xs font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-[0.2em]"
                                    >
                                        {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Deploy Registry"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
