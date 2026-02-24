"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api } from "@/services/api";
import { GraduationCap, Plus, Loader2, X, CheckCircle, Clock, AlertCircle } from "lucide-react";

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

    const statusConfig: Record<string, { icon: any; label: string; light: string; dark: string }> = {
        pending: { icon: Clock, label: "Pending", light: "bg-amber-100 text-amber-700", dark: "dark:bg-amber-500/15 dark:text-amber-400" },
        reviewed: { icon: AlertCircle, label: "Reviewed", light: "bg-blue-100 text-blue-700", dark: "dark:bg-blue-500/15 dark:text-blue-400" },
        graded: { icon: CheckCircle, label: "Graded", light: "bg-emerald-100 text-emerald-700", dark: "dark:bg-emerald-500/15 dark:text-emerald-400" },
    };

    return (
        <DashboardShell role="instructor">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Grading</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>Manage assignments and grade submissions</p>
                </div>
                <button onClick={() => setShowCreate(true)} className="btn-primary px-4 py-2.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 self-start">
                    <Plus className="w-4 h-4" /> New Assignment
                </button>
            </div>

            {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm flex justify-between">
                    {error}
                    <button onClick={() => setError("")} className="text-red-400 hover:text-red-300">✕</button>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-lg w-fit" style={{ background: "var(--hover-bg)" }}>
                {(["submissions", "assignments"] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === t
                                ? "bg-indigo-600 text-white shadow-sm"
                                : ""
                            }`}
                        style={tab !== t ? { color: "var(--text-secondary)" } : undefined}
                    >
                        {t === "submissions" ? `Submissions (${submissions.length})` : `Assignments (${assignments.length})`}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} /></div>
            ) : tab === "submissions" ? (
                submissions.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <GraduationCap className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
                        <p className="font-medium" style={{ color: "var(--text-secondary)" }}>No submissions yet</p>
                    </div>
                ) : (
                    <div className="glass-card overflow-hidden">
                        <table className="w-full text-sm data-table">
                            <thead>
                                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Student</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Assignment</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Course</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Status</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Grade</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.map((sub) => {
                                    const sc = statusConfig[sub.status] || statusConfig.pending;
                                    const Icon = sc.icon;
                                    return (
                                        <tr key={sub.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                                            <td className="px-5 py-3.5 font-medium" style={{ color: "var(--text-primary)" }}>{sub.student_name || "—"}</td>
                                            <td className="px-5 py-3.5" style={{ color: "var(--text-secondary)" }}>{sub.assignment_title || "—"}</td>
                                            <td className="px-5 py-3.5">
                                                <span className="text-xs font-mono font-medium" style={{ color: "var(--accent)" }}>{sub.course_code || "—"}</span>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sc.light} ${sc.dark}`}>
                                                    <Icon className="w-3 h-3" />{sc.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 font-semibold" style={{ color: "var(--text-primary)" }}>{sub.grade || "—"}</td>
                                            <td className="px-5 py-3.5">
                                                <button
                                                    onClick={() => { setGrading(sub); setGradeValue(sub.grade || ""); }}
                                                    className="text-xs font-medium transition-colors"
                                                    style={{ color: "var(--accent)" }}
                                                >
                                                    {sub.status === "graded" ? "Re-grade" : "Grade"}
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
                    <div className="glass-card p-12 text-center">
                        <GraduationCap className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
                        <p className="font-medium" style={{ color: "var(--text-secondary)" }}>No assignments yet</p>
                        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)", opacity: 0.7 }}>Create your first assignment to start grading.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {assignments.map((a) => (
                            <div key={a.id} className="glass-card p-5 card-hover">
                                <span className="text-xs font-mono font-medium" style={{ color: "var(--accent)" }}>{a.course_code}</span>
                                <h3 className="font-semibold mt-1" style={{ color: "var(--text-primary)" }}>{a.title}</h3>
                                {a.due_date && (
                                    <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
                                        Due: {new Date(a.due_date).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )
            )}

            {/* Grade Modal */}
            {grading && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setGrading(null)}>
                    <div className="glass-card p-6 w-full max-w-sm" style={{ background: "var(--bg-card)" }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Grade Submission</h3>
                            <button onClick={() => setGrading(null)} className="p-1 rounded-lg hover:bg-[var(--hover-bg)]"><X className="w-5 h-5" style={{ color: "var(--text-secondary)" }} /></button>
                        </div>
                        <p className="text-sm mb-1"><span className="font-medium" style={{ color: "var(--text-primary)" }}>{grading.student_name}</span></p>
                        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{grading.assignment_title} · {grading.course_code}</p>
                        <input value={gradeValue} onChange={(e) => setGradeValue(e.target.value)} placeholder="Grade (e.g. A, B+, 92)" className="input-field mb-3" />
                        <button onClick={handleGrade} disabled={submittingGrade} className="w-full btn-primary py-2.5 rounded-xl text-white font-medium disabled:opacity-50">
                            {submittingGrade ? "Saving..." : "Submit Grade"}
                        </button>
                    </div>
                </div>
            )}

            {/* Create Assignment Modal */}
            {showCreate && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowCreate(false)}>
                    <div className="glass-card p-6 w-full max-w-md" style={{ background: "var(--bg-card)" }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>New Assignment</h3>
                            <button onClick={() => setShowCreate(false)} className="p-1 rounded-lg hover:bg-[var(--hover-bg)]"><X className="w-5 h-5" style={{ color: "var(--text-secondary)" }} /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Course</label>
                                <select value={newCourseId} onChange={(e) => setNewCourseId(e.target.value)} className="input-field">
                                    <option value="">Select Course</option>
                                    {courses.map((c) => <option key={c.id} value={c.id}>{c.code} — {c.title}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Assignment Title</label>
                                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Assignment Title" className="input-field" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Due Date</label>
                                <input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} className="input-field" />
                            </div>
                            <button onClick={handleCreateAssignment} disabled={creating} className="w-full btn-primary py-2.5 rounded-xl text-white font-medium disabled:opacity-50">
                                {creating ? "Creating..." : "Create Assignment"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardShell>
    );
}
