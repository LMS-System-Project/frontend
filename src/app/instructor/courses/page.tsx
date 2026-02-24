"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api } from "@/services/api";
import {
    BookOpen, Plus, X, Loader2, Edit2, Trash2, Search, Users,
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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Courses</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                        {courses.length} course{courses.length !== 1 ? "s" : ""} total
                    </p>
                </div>
                <button onClick={openCreate} className="btn-primary px-4 py-2.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 self-start">
                    <Plus className="w-4 h-4" /> New Course
                </button>
            </div>

            {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm flex justify-between">
                    {error}
                    <button onClick={() => setError("")} className="text-red-400 hover:text-red-300">✕</button>
                </div>
            )}

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                <input
                    type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    className="input-field pl-10" placeholder="Search courses..."
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} /></div>
            ) : filtered.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
                    <p className="font-medium" style={{ color: "var(--text-secondary)" }}>
                        {search ? "No courses match your search" : "No courses yet"}
                    </p>
                    {!search && (
                        <button onClick={openCreate} className="mt-3 text-sm font-medium" style={{ color: "var(--accent)" }}>
                            Create your first course →
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((course) => (
                        <div key={course.id} className="glass-card p-5 card-hover">
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {course.code.substring(0, 2).toUpperCase()}
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${course.status === "active"
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                                        : course.status === "draft"
                                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                                            : "bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400"
                                    }`}>
                                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                                </span>
                            </div>
                            <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{course.code}: {course.title}</h3>
                            <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                                {course.description || "No description"}
                            </p>
                            <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid var(--border-color)" }}>
                                <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                                    <Users className="w-3.5 h-3.5 inline mr-1" />{course.student_count} students
                                </span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => openEdit(course)} className="p-1.5 rounded-lg hover:bg-[var(--hover-bg)] transition-colors" style={{ color: "var(--text-secondary)" }}>
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => handleDelete(course.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-red-500">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="glass-card p-6 w-full max-w-md relative" style={{ background: "var(--bg-card)" }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[var(--hover-bg)]" style={{ color: "var(--text-secondary)" }}>
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
                            {editingCourse ? "Edit Course" : "Create New Course"}
                        </h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Course Code</label>
                                <input type="text" value={formCode} onChange={(e) => setFormCode(e.target.value)} className="input-field" placeholder="CS 301" required />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Title</label>
                                <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="input-field" placeholder="Data Structures" required />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Description</label>
                                <textarea value={formDesc} onChange={(e) => setFormDesc(e.target.value)} className="input-field resize-none" placeholder="Optional description" rows={3} />
                            </div>
                            {editingCourse && (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Status</label>
                                    <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="input-field">
                                        <option value="active">Active</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            )}
                            <button type="submit" disabled={saving} className="w-full btn-primary py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50">
                                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {editingCourse ? "Save Changes" : "Create Course"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </DashboardShell>
    );
}
