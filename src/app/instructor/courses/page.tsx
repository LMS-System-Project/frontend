"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api, resolveFileUrl } from "@/services/api";
import {
    BookOpen,
    Plus,
    X,
    Loader2,
    Edit2,
    Trash2,
    Search,
    Users,
    Filter,
    Layers,
    Zap,
    ShieldCheck,
    Upload,
    FileText,
    Download,
    ChevronDown,
    ChevronUp,
    File as FileIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Course {
    id: string;
    code: string;
    title: string;
    description: string | null;
    status: string;
    student_count: number;
}

interface Material {
    id: string;
    title: string;
    description?: string;
    file_name: string;
    file_url: string;
    file_size: number;
    created_at?: string;
}

function formatSize(bytes: number): string {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

    // Materials panel
    const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
    const [materials, setMaterials] = useState<Record<string, Material[]>>({});
    const [materialsLoading, setMaterialsLoading] = useState<string | null>(null);
    const [uploadingFor, setUploadingFor] = useState<string | null>(null);
    const [matTitle, setMatTitle] = useState("");
    const [matDesc, setMatDesc] = useState("");
    const [matFile, setMatFile] = useState<File | null>(null);
    const [showUploadFor, setShowUploadFor] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    async function toggleMaterials(courseId: string) {
        if (expandedCourseId === courseId) {
            setExpandedCourseId(null);
            return;
        }
        setExpandedCourseId(courseId);
        if (!materials[courseId]) {
            setMaterialsLoading(courseId);
            try {
                const data = await api.instructor.materials.list(courseId);
                setMaterials(prev => ({ ...prev, [courseId]: data || [] }));
            } catch (err: any) {
                setError(err.message || "Failed to load materials");
            } finally {
                setMaterialsLoading(null);
            }
        }
    }

    async function handleUploadMaterial(courseId: string) {
        if (!matFile || !matTitle.trim()) return;
        setUploadingFor(courseId);
        try {
            await api.instructor.materials.upload(courseId, matFile, matTitle, matDesc || undefined);
            // Refresh materials
            const data = await api.instructor.materials.list(courseId);
            setMaterials(prev => ({ ...prev, [courseId]: data || [] }));
            setShowUploadFor(null);
            setMatTitle(""); setMatDesc(""); setMatFile(null);
        } catch (err: any) {
            setError(err.message || "Failed to upload material");
        } finally {
            setUploadingFor(null);
        }
    }

    async function handleDeleteMaterial(courseId: string, materialId: string) {
        if (!confirm("Delete this material? This cannot be undone.")) return;
        try {
            await api.instructor.materials.delete(materialId);
            setMaterials(prev => ({
                ...prev,
                [courseId]: (prev[courseId] || []).filter(m => m.id !== materialId),
            }));
        } catch (err: any) {
            setError(err.message || "Failed to delete material");
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
        <div className="space-y-8 max-w-[1200px] mx-auto">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Layers size={14} className="text-accent" />
                            <span>Course Management</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">My Courses</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Managing <span className="text-accent font-bold">{courses.length} courses</span> in your portfolio.
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="px-6 py-3 bg-accent text-white rounded-xl text-sm font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 self-start"
                    >
                        <Plus size={18} />
                        Create Course
                    </button>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex justify-between animate-in slide-in-from-top duration-300">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} />
                            {error}
                        </div>
                        <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                    </div>
                )}

                {/* Search Row */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 group w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search courses by code or title..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm"
                        />
                    </div>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-accent rounded-full animate-spin" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Loading courses...</span>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center hover:bg-slate-50/50 transition-all flex flex-col items-center group cursor-pointer" onClick={openCreate}>
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                            <BookOpen size={32} />
                        </div>
                        <h4 className="text-base font-bold text-primary-text uppercase tracking-widest">{search ? "No Results Found" : "No Courses Yet"}</h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 italic font-medium">
                            {search ? `Your search "${search}" did not return any results.` : "Create your first course to get started."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((course) => (
                            <div key={course.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                {/* Course Row */}
                                <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="w-10 h-10 bg-accent text-white rounded-lg flex items-center justify-center text-xs font-black shadow border border-slate-700 flex-shrink-0">
                                        {course.code.substring(0, 4).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-sm font-bold text-primary-text tracking-tight">{course.code}: {course.title}</h3>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 border border-slate-100">
                                                <div className={`w-1.5 h-1.5 rounded-full ${course.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">{course.status}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1 italic truncate">{course.description || "No description provided."}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <Users size={12} className="text-accent" />
                                                <span className="text-xs font-bold text-slate-500">{course.student_count} students</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <FileText size={12} className="text-slate-400" />
                                                <span className="text-xs text-slate-400">{(materials[course.id] || []).length} materials</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => toggleMaterials(course.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                                                expandedCourseId === course.id
                                                    ? "bg-accent text-white border-slate-700"
                                                    : "bg-white text-slate-500 border-slate-200 hover:border-accent hover:text-accent"
                                            }`}
                                        >
                                            <Upload size={12} />
                                            Materials
                                            {expandedCourseId === course.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                        </button>
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
                                    </div>
                                </div>

                                {/* Materials Panel */}
                                <AnimatePresence>
                                    {expandedCourseId === course.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden border-t border-slate-100"
                                        >
                                            <div className="p-6 bg-slate-50/50">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                        Study Materials
                                                    </h4>
                                                    <button
                                                        onClick={() => {
                                                            setShowUploadFor(showUploadFor === course.id ? null : course.id);
                                                            setMatTitle(""); setMatDesc(""); setMatFile(null);
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
                                                    >
                                                        <Plus size={12} />
                                                        Upload Material
                                                    </button>
                                                </div>

                                                {/* Upload Form */}
                                                <AnimatePresence>
                                                    {showUploadFor === course.id && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden mb-4"
                                                        >
                                                            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                    <div>
                                                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Title *</label>
                                                                        <input
                                                                            value={matTitle}
                                                                            onChange={(e) => setMatTitle(e.target.value)}
                                                                            placeholder="e.g. Lecture 1 Slides"
                                                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</label>
                                                                        <input
                                                                            value={matDesc}
                                                                            onChange={(e) => setMatDesc(e.target.value)}
                                                                            placeholder="Optional description"
                                                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">File *</label>
                                                                    <input
                                                                        ref={fileInputRef}
                                                                        type="file"
                                                                        onChange={(e) => setMatFile(e.target.files?.[0] || null)}
                                                                        className="hidden"
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => fileInputRef.current?.click()}
                                                                        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-xs text-slate-400 hover:border-accent hover:text-accent transition-colors text-center"
                                                                    >
                                                                        {matFile ? (
                                                                            <span className="text-accent font-bold">📎 {matFile.name} ({formatSize(matFile.size)})</span>
                                                                        ) : (
                                                                            "Click to select a file (PDF, DOC, PPT, etc.)"
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                <div className="flex gap-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => { setShowUploadFor(null); setMatTitle(""); setMatDesc(""); setMatFile(null); }}
                                                                        className="flex-1 py-2.5 border border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleUploadMaterial(course.id)}
                                                                        disabled={!matFile || !matTitle.trim() || uploadingFor === course.id}
                                                                        className="flex-1 py-2.5 bg-accent text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                                                    >
                                                                        {uploadingFor === course.id ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                                                                        Upload
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Materials List */}
                                                {materialsLoading === course.id ? (
                                                    <div className="flex items-center justify-center py-8">
                                                        <Loader2 size={20} className="animate-spin text-accent" />
                                                    </div>
                                                ) : (materials[course.id] || []).length === 0 ? (
                                                    <p className="text-xs text-slate-400 text-center py-6 italic">
                                                        No materials uploaded yet. Click "Upload Material" to add study resources.
                                                    </p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {(materials[course.id] || []).map((mat) => (
                                                            <div key={mat.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                                                                <FileIcon size={16} className="text-accent flex-shrink-0" />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-bold text-primary-text truncate">{mat.title}</p>
                                                                    <p className="text-[10px] text-slate-400">{mat.file_name} • {formatSize(mat.file_size)}</p>
                                                                </div>
                                                                <a
                                                                    href={resolveFileUrl(mat.file_url)}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-accent rounded-lg hover:bg-slate-50 transition-all"
                                                                    title="Download"
                                                                >
                                                                    <Download size={13} />
                                                                </a>
                                                                <button
                                                                    onClick={() => handleDeleteMaterial(course.id, mat.id)}
                                                                    className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 size={13} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                )}

                {/* Course Modal */}
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
                                    <h3 className="text-xl font-bold text-primary-text tracking-tight mb-1">{editingCourse ? "Edit Course" : "Create New Course"}</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold truncate">Enter course details below</p>
                                </div>
                            </div>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Course Code</label>
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
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Status</label>
                                        <select
                                            value={formStatus}
                                            onChange={(e) => setFormStatus(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all appearance-none"
                                        >
                                            <option value="active">Active</option>
                                            <option value="draft">Draft</option>
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Course Title</label>
                                    <input
                                        type="text"
                                        value={formTitle}
                                        onChange={(e) => setFormTitle(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                        placeholder="e.g. Introduction to Data Structures"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Description</label>
                                    <textarea
                                        value={formDesc}
                                        onChange={(e) => setFormDesc(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none italic"
                                        placeholder="Describe the scope and objectives of this course..."
                                        rows={3}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3.5 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all uppercase tracking-[0.2em]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 py-3.5 bg-accent text-white rounded-xl text-xs font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 uppercase tracking-[0.2em]"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingCourse ? "Save Changes" : "Create Course"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
    );
}
