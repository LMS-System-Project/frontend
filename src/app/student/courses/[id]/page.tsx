"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    BookOpen,
    FileText,
    Download,
    Loader2,
    ArrowLeft,
    ClipboardList,
    Calendar,
    CheckCircle,
    Clock,
    File,
    AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/services/api";

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.id as string;

    const [course, setCourse] = useState<any>(null);
    const [materials, setMaterials] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"materials" | "assignments">("materials");

    useEffect(() => {
        if (!courseId) return;

        const loadData = async () => {
            try {
                // Load enrolled courses to find this one
                const courses = await api.student.courses.list();
                const found = (courses || []).find((c: any) => c.id === courseId);
                setCourse(found || null);

                // Load materials
                const mats = await api.student.courses.materials(courseId);
                setMaterials(mats || []);

                // Load assignments (filtered for this course)
                const allAssignments = await api.student.assignments.list();
                const courseAssignments = (allAssignments || []).filter(
                    (a: any) => a.course_id === courseId
                );
                setAssignments(courseAssignments);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [courseId]);

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-accent" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Loading Course...
                </p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-slate-400">
                <AlertCircle size={48} className="text-slate-200" />
                <p className="text-sm font-medium">Course not found or you are not enrolled.</p>
                <Link
                    href="/student/courses"
                    className="px-6 py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest"
                >
                    Back to Courses
                </Link>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Back Button */}
            <Link
                href="/student/courses"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors"
            >
                <ArrowLeft size={14} />
                Back to Courses
            </Link>

            {/* Course Header */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8">
                <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center text-sm font-black shadow flex-shrink-0">
                        {course.code.substring(0, 3).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{course.code}</p>
                        <h1 className="text-2xl font-bold text-primary-text tracking-tight">{course.title}</h1>
                        {course.description && (
                            <p className="text-sm text-slate-500 leading-relaxed mt-2">{course.description}</p>
                        )}
                        <div className="flex items-center gap-6 mt-4">
                            {course.instructor_name && (
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Instructor: {course.instructor_name}
                                </span>
                            )}
                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                                Progress: {course.progress}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1 }}
                            className="bg-accent h-full rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-2xl p-1 w-fit">
                <button
                    onClick={() => setActiveTab("materials")}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "materials"
                            ? "bg-white text-primary-text shadow-sm"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                >
                    <FileText size={12} className="inline mr-2" />
                    Materials ({materials.length})
                </button>
                <button
                    onClick={() => setActiveTab("assignments")}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === "assignments"
                            ? "bg-white text-primary-text shadow-sm"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                >
                    <ClipboardList size={12} className="inline mr-2" />
                    Assignments ({assignments.length})
                </button>
            </div>

            {/* Content */}
            {activeTab === "materials" ? (
                <div className="space-y-4">
                    {materials.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <FileText size={48} className="mb-4 text-slate-200" />
                            <p className="text-sm font-medium">No study materials uploaded yet.</p>
                        </div>
                    ) : (
                        materials.map((mat, i) => (
                            <motion.div
                                key={mat.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <File size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-primary-text truncate">{mat.title}</h4>
                                    {mat.description && (
                                        <p className="text-xs text-slate-400 mt-0.5 truncate">{mat.description}</p>
                                    )}
                                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400 font-medium">
                                        <span>{formatSize(mat.file_size)}</span>
                                        <span>•</span>
                                        <span>{formatDate(mat.created_at)}</span>
                                    </div>
                                </div>
                                <a
                                    href={mat.file_url.startsWith("http") ? mat.file_url : `http://localhost:8001${mat.file_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 bg-accent text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 flex-shrink-0"
                                >
                                    <Download size={12} />
                                    Download
                                </a>
                            </motion.div>
                        ))
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {assignments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                            <ClipboardList size={48} className="mb-4 text-slate-200" />
                            <p className="text-sm font-medium">No assignments for this course yet.</p>
                        </div>
                    ) : (
                        assignments.map((a, i) => {
                            const statusColors: Record<string, { color: string; bg: string; border: string; label: string }> = {
                                not_submitted: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
                                pending: { label: "Submitted", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
                                reviewed: { label: "Reviewed", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
                                graded: { label: "Graded", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
                            };
                            const sc = statusColors[a.submission_status] ?? statusColors.not_submitted;
                            const dueDate = a.due_date ? new Date(a.due_date) : null;
                            const isOverdue = dueDate && dueDate < new Date() && a.submission_status === "not_submitted";
                            return (
                                <motion.div
                                    key={a.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`bg-white border rounded-2xl p-6 hover:shadow-md transition-shadow ${isOverdue ? "border-red-200 bg-red-50/30" : "border-slate-200"}`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${sc.bg} ${sc.color} ${sc.border}`}>
                                                    {sc.label}
                                                </span>
                                                {isOverdue && (
                                                    <span className="text-[9px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1">
                                                        <AlertCircle size={10} /> Overdue
                                                    </span>
                                                )}
                                                {a.max_marks && (
                                                    <span className="text-[9px] font-medium text-slate-400 px-2 py-1 bg-slate-50 rounded-full border border-slate-200">
                                                        {a.max_marks} marks
                                                    </span>
                                                )}
                                            </div>
                                            <h4 className="text-sm font-bold text-primary-text mb-1">{a.title}</h4>
                                            {a.description && (
                                                <p className="text-xs text-slate-500 leading-relaxed mb-2">{a.description}</p>
                                            )}
                                            {a.instructions && (
                                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-2">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Instructions</p>
                                                    <p className="text-xs text-slate-600 leading-relaxed">{a.instructions}</p>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400 font-medium flex-wrap">
                                                {dueDate && (
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={10} />
                                                        Due: {formatDate(a.due_date)}
                                                    </span>
                                                )}
                                                {a.grade && (
                                                    <span className="flex items-center gap-1 text-emerald-600 font-black">
                                                        <CheckCircle size={10} />
                                                        Grade: {a.grade}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            href="/student/assignments"
                                            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors ${
                                                a.submission_status === "not_submitted"
                                                    ? "bg-accent text-white hover:bg-slate-800"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                        >
                                            {a.submission_status === "not_submitted" ? "Submit →" : "View →"}
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            )}
        </motion.div>
    );
}
