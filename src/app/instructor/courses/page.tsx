"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api } from "@/services/api";
import {
    BookOpen,
    Plus,
    X,
    Loader2,
    Edit2,
    Trash2,
    Search,
    Users,
    MoreHorizontal,
    Filter,
    ChevronDown,
    Layers,
    Target,
    Zap,
    ShieldCheck,
    CheckCircle2
} from "lucide-react";

interface Course {
    id: string;
    code: string;
    title: string;
    description: string | null;
    status: string;
    student_count: number;
}

export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // Create / Edit
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formCode, setFormCode] = useState("");
    const [formTitle, setFormTitle] = useState("");
    const [formDesc, setFormDesc] = useState("");
    const [formStatus, setFormStatus] = useState("active");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!api.auth.getToken()) { router.push("/login"); return; }
        fetchCourses();
    }, []);

    async function fetchCourses() {
        try {
            setLoading(true);
            const data = await api.instructor.courses.list();
            setCourses(data);
        } catch (err: any) {
            setError(err.message || "Failed to load courses");
        } finally {
            setLoading(false);
        }
    }

    function openCreate() {
        setEditingCourse(null);
        setFormCode(""); setFormTitle(""); setFormDesc(""); setFormStatus("active");
        setShowModal(true);
    }

    function openEdit(c: Course) {
        setEditingCourse(c);
        setFormCode(c.code); setFormTitle(c.title); setFormDesc(c.description || ""); setFormStatus(c.status);
        setShowModal(true);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingCourse) {
                await api.instructor.courses.update(editingCourse.id, {
                    code: formCode, title: formTitle, description: formDesc || undefined, status: formStatus,
                });
            } else {
                await api.instructor.courses.create({
                    code: formCode, title: formTitle, description: formDesc || undefined,
                });
            }
            setShowModal(false);
            fetchCourses();
        } catch (err: any) {
            setError(err.message || "Failed to save");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this course? This cannot be undone.")) return;
        try {
            await api.instructor.courses.delete(id);
            fetchCourses();
        } catch (err: any) {
            setError(err.message || "Failed to delete");
        }
    }

    const filtered = courses.filter((c) =>
        `${c.code} ${c.title}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardShell role="instructor">
            <div className="space-y-8 max-w-[1200px] mx-auto">
                {/* Governance Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Layers size={14} className="text-accent" />
                            <span>Faculty Registry • Course Portfolio</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Institutional Curriculum</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Managing <span className="text-accent font-bold">{courses.length} Active Instructional Modules</span> within the registry.
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="px-6 py-3 bg-accent text-white rounded-xl text-sm font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 self-start"
                    >
                        <Plus size={18} />
                        Register New Module
                    </button>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex justify-between animate-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} />
                            {error.toUpperCase()}
                        </div>
                        <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                    </div>
                )}

                {/* Tactical Search Row */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 group w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Scan course registry by code or title..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm"
                        />
                    </div>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
                        <Filter size={16} />
                        Matrix Filter
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-accent rounded-full animate-spin" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Synchronizing Registry...</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center hover:bg-slate-50/50 transition-all flex flex-col items-center group cursor-pointer" onClick={openCreate}>
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                            <BookOpen size={32} />
                        </div>
                        <h4 className="text-base font-bold text-primary-text uppercase tracking-widest">{search ? "No Matches Identified" : "Institutional Void"}</h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 italic font-medium">
                            {search ? `Your query "${search}" did not return any results from the registry.` : "No active instructional modules found. Initialize your first engagement."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((course) => (
                            <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-sharp transition-all group flex flex-col border-b-4 border-b-slate-100 hover:border-b-accent">
                                <div className="p-6 flex-1">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-10 h-10 bg-accent text-white rounded flex items-center justify-center text-xs font-black shadow-lg border border-slate-700">
                                            {course.code.substring(0, 4).toUpperCase()}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-100">
                                            <div className={`w-1.5 h-1.5 rounded-full ${course.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">{course.status}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-primary-text mb-1 tracking-tight group-hover:text-accent transition-colors">{course.code}: {course.title}</h3>
                                    <p className="text-xs text-slate-500 line-clamp-2 italic font-medium leading-relaxed mb-6">
                                        {course.description || "Instructional parameters not yet defined in the registry description vector."}
                                    </p>

                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Enrolled Cohort</span>
                                            <div className="flex items-center gap-1.5">
                                                <Users size={14} className="text-accent" />
                                                <span className="text-sm font-bold text-primary-text tracking-tighter">{course.student_count} Students</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Analytics Index</span>
                                            <div className="flex items-center gap-1.5">
                                                <Zap size={14} className="text-amber-500" />
                                                <span className="text-sm font-bold text-primary-text tracking-tighter">Elite</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Modified: 12H AGO</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => openEdit(course)}
                                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent transition-all shadow-sm"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course.id)}
                                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                        <button className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:bg-black transition-all shadow-sm">
                                            <MoreHorizontal size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal Governance */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)}>
                        <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-slate-200 relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl border border-slate-700">
                                    {editingCourse ? <Edit2 size={24} /> : <Plus size={24} />}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl font-bold text-primary-text tracking-tight mb-1">{editingCourse ? "Modify Course Parameters" : "Registry New Instructional Module"}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold truncate">Synchronizing with Global Educational Schema V4.0</p>
                                </div>
                            </div>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Module Code</label>
                                        <input
                                            type="text"
                                            value={formCode}
                                            onChange={(e) => setFormCode(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                            placeholder="CS901"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Module Status</label>
                                        <select
                                            value={formStatus}
                                            onChange={(e) => setFormStatus(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all appearance-none"
                                        >
                                            <option value="active">Active Execution</option>
                                            <option value="draft">Internal Draft</option>
                                            <option value="archived">Archived State</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Instructional Title</label>
                                    <input
                                        type="text"
                                        value={formTitle}
                                        onChange={(e) => setFormTitle(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                        placeholder="Advanced Quantum Computation Models"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Institutional Description Vector</label>
                                    <textarea
                                        value={formDesc}
                                        onChange={(e) => setFormDesc(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none italic"
                                        placeholder="Define the scope and instructional objectives of this module..."
                                        rows={3}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all uppercase tracking-[0.2em]"
                                    >
                                        Abort
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 py-3.5 bg-accent text-white rounded-xl text-xs font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-[0.2em]"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingCourse ? "Commit Changes" : "Execute Creation"}
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
