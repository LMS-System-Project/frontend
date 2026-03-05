"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Loader2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  not_submitted: { label: "Pending", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  pending: { label: "Submitted", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  reviewed: { label: "Reviewed", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" },
  graded: { label: "Graded", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
};

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "not_submitted" | "pending" | "graded">("all");
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [submitModal, setSubmitModal] = useState<any | null>(null);
  const [notes, setNotes] = useState("");

  async function loadAssignments() {
    try {
      const data = await api.student.assignments.list();
      setAssignments(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssignments();
  }, []);

  async function handleSubmit() {
    if (!submitModal) return;
    setSubmitting(submitModal.id);
    try {
      await api.student.assignments.submit(submitModal.id, notes);
      await loadAssignments();
      setSubmitModal(null);
      setNotes("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(null);
    }
  }

  const filtered = assignments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.course_code?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || a.submission_status === filter;
    return matchesSearch && matchesFilter;
  });

  const filterTabs = [
    { key: "all", label: "All" },
    { key: "not_submitted", label: "Pending" },
    { key: "pending", label: "Submitted" },
    { key: "graded", label: "Graded" },
  ] as const;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Loading Assignments...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            <FileText size={14} className="text-accent" />
            <span>Assessment Modules • {assignments.length} Total</span>
          </div>
          <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase">Assignments</h1>
        </div>
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-primary-text placeholder-slate-400 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
              filter === tab.key
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-400 border-slate-200 hover:border-slate-400"
            }`}
          >
            {tab.label}
            {tab.key !== "all" && (
              <span className="ml-2 opacity-60">
                ({assignments.filter((a) => a.submission_status === tab.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <FileText size={48} className="mb-4 text-slate-200" />
          <p className="text-sm font-medium">No assignments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((assignment, i) => {
            const statusCfg = STATUS_CONFIG[assignment.submission_status] ?? STATUS_CONFIG.not_submitted;
            const dueDate = assignment.due_date ? new Date(assignment.due_date) : null;
            const isOverdue = dueDate && dueDate < new Date() && assignment.submission_status === "not_submitted";
            const isSoon =
              dueDate && !isOverdue && dueDate.getTime() - Date.now() < 48 * 3600 * 1000 && assignment.submission_status === "not_submitted";

            return (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
                  isOverdue ? "border-red-200 bg-red-50/30" : "border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[9px] font-black text-accent uppercase tracking-widest bg-accent/5 px-2 py-1 rounded-lg border border-accent/10">
                        {assignment.course_code}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${statusCfg.bg} ${statusCfg.color} ${statusCfg.border}`}
                      >
                        {statusCfg.label}
                      </span>
                      {isOverdue && (
                        <span className="text-[9px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1">
                          <AlertCircle size={10} /> Overdue
                        </span>
                      )}
                      {isSoon && (
                        <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                          <Clock size={10} /> Due Soon
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-primary-text mb-1 truncate">{assignment.title}</h3>
                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 font-medium">
                      {dueDate && (
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          Due: {dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      )}
                      {assignment.grade != null && (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold">
                          <CheckCircle size={10} />
                          Grade: {assignment.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {assignment.submission_status === "not_submitted" ? (
                      <button
                        onClick={() => { setSubmitModal(assignment); setNotes(""); }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow hover:bg-slate-800 transition-all"
                      >
                        <Upload size={12} />
                        Submit
                      </button>
                    ) : (
                      <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${statusCfg.bg} ${statusCfg.color} border ${statusCfg.border}`}>
                        {statusCfg.label}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Submit Modal */}
      <AnimatePresence>
        {submitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setSubmitModal(null); setNotes(""); } }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-200"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-primary-text tracking-tight">Submit Assignment</h2>
                  <p className="text-xs text-slate-400 mt-1">{submitModal.title}</p>
                </div>
                <button
                  onClick={() => { setSubmitModal(null); setNotes(""); }}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes or comments for your instructor..."
                  className="w-full p-4 border border-slate-200 rounded-xl text-xs text-primary-text placeholder-slate-400 focus:outline-none focus:border-accent transition-colors resize-none"
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setSubmitModal(null); setNotes(""); }}
                  className="flex-1 py-3 border border-slate-200 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!!submitting}
                  className="flex-1 py-3 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow hover:bg-slate-800 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
