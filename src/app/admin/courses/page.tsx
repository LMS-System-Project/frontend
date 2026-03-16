"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Trash2,
  Users,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";

interface Course {
  id: string;
  code: string;
  title: string;
  description: string | null;
  status: string;
  instructor_id: string;
  instructor_name: string;
  student_count: number;
  created_at: string | null;
}

const STATUS_THEME: Record<string, { label: string; color: string; bg: string }> = {
  active:   { label: "ACTIVE",   color: "text-emerald-600", bg: "bg-emerald-50" },
  draft:    { label: "DRAFT",    color: "text-amber-600",   bg: "bg-amber-50" },
  archived: { label: "ARCHIVED", color: "text-slate-500",   bg: "bg-slate-100" },
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function loadCourses() {
    try {
      setLoading(true);
      const data = await api.admin.courses.list(statusFilter || undefined);
      setCourses(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, [statusFilter]);

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await api.admin.courses.delete(deleteId);
      setDeleteId(null);
      loadCourses();
    } catch (err: any) {
      alert(err.message || "Failed to delete course");
    }
  }

  const filtered = courses.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.instructor_name.toLowerCase().includes(q)
    );
  });

  if (loading && courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-accent" size={32} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-[1200px] mx-auto pb-20"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
          <ShieldCheck size={14} className="text-accent" />
          <span>Administration • Course Overview</span>
        </div>
        <h1 className="text-4xl font-bold text-primary-text tracking-tight mb-2">
          All Courses
        </h1>
        <p className="text-sm text-slate-500">
          <span className="text-accent font-bold">{courses.length}</span> courses across the platform.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { label: "All", value: "" },
          { label: "Active", value: "active" },
          { label: "Draft", value: "draft" },
          { label: "Archived", value: "archived" },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
              statusFilter === f.value
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, code, or instructor..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent shadow-sm"
        />
      </div>

      {/* Course cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-sm text-slate-400">
            {search ? "No courses match your search." : "No courses found."}
          </div>
        ) : (
          filtered.map((c, i) => {
            const theme = STATUS_THEME[c.status] || STATUS_THEME.draft;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 tracking-[0.15em] uppercase">
                      {c.code}
                    </span>
                    <h3 className="text-sm font-bold text-primary-text mt-1 leading-snug">
                      {c.title}
                    </h3>
                  </div>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${theme.bg} ${theme.color}`}>
                    {theme.label}
                  </span>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <GraduationCap size={13} />
                    <span>{c.instructor_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users size={13} />
                    <span>{c.student_count} enrolled</span>
                  </div>
                </div>

                <button
                  onClick={() => setDeleteId(c.id)}
                  className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete course"
                >
                  <Trash2 size={14} />
                </button>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 group-hover:bg-accent transition-colors" />
              </motion.div>
            );
          })
        )}
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary-text mb-2">Delete Course?</h3>
              <p className="text-sm text-slate-500 mb-6">
                This removes the course and all related assignments, enrollments, and submissions.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
