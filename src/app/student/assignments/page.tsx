"use client";

import { FileText, Upload, Clock, CheckCircle, AlertCircle, Eye, Brain, Folder, Search, Filter, ChevronDown, MoreHorizontal, X, FileCheck } from "lucide-react";
import { useState } from "react";

const assignments = [
    {
        id: 1,
        course: "CS301",
        title: "Binary Search Tree Implementation",
        dueDate: "Feb 27, 2025",
        dueSoon: true,
        status: "pending",
        maxMarks: 100,
        grade: null,
        aiSuggestion: null,
        description: "Implement a BST with insert, delete, and search operations. Include time complexity analysis.",
        tag: "Core Algorithm"
    },
    {
        id: 2,
        course: "MA201",
        title: "Integral Calculus Problem Set 7",
        dueDate: "Mar 02, 2025",
        dueSoon: false,
        status: "submitted",
        maxMarks: 50,
        grade: null,
        aiSuggestion: null,
        description: "Solve all problems in Chapter 7 regarding line integrals and surface integrals.",
        tag: "Quantitative"
    },
    {
        id: 3,
        course: "PH202",
        title: "Quantum Wave Function Lab Report",
        dueDate: "Feb 18, 2025",
        dueSoon: false,
        status: "graded",
        maxMarks: 100,
        grade: 88,
        aiSuggestion: "Your analysis of wave-particle duality was strong. Work on formalizing your mathematical derivations — they lack structure in Section 3.",
        description: "Write a comprehensive lab report on the double-slit experiment.",
        tag: "Laboratory"
    },
    {
        id: 4,
        course: "EN101",
        title: "Technical Paper — AI in Education",
        dueDate: "Feb 10, 2025",
        dueSoon: false,
        status: "graded",
        maxMarks: 100,
        grade: 94,
        aiSuggestion: "Excellent introduction and conclusion. Your argument structure is coherent. Minor grammar issues in paragraphs 4 and 7.",
        description: "Write a 1500-word technical paper on a topic of your choice.",
        tag: "Writing"
    },
    {
        id: 5,
        course: "CS301",
        title: "Graph Traversal Algorithms",
        dueDate: "Mar 10, 2025",
        dueSoon: false,
        status: "pending",
        maxMarks: 80,
        grade: null,
        aiSuggestion: null,
        description: "Implement BFS and DFS. Compare their performance on dense vs sparse graphs.",
        tag: "Core Algorithm"
    },
];

const STATUS_THEMES: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    pending: { label: "Awaiting Action", color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
    submitted: { label: "Received", color: "text-blue-600", bg: "bg-blue-50", icon: FileCheck },
    graded: { label: "Evaluated", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle },
};

export default function StudentAssignmentsPage() {
    const [uploadId, setUploadId] = useState<number | null>(null);
    const [filter, setFilter] = useState("All");

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto">
            {/* Header Hub */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <Folder size={14} className="text-accent" />
                        <span>Assessment Registry • Active Semester</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight">Academic Assessments</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Track submissions, evaluations, and <span className="text-accent font-bold italic">AI evaluation patterns</span>.
                    </p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    {["All", "Pending", "Submitted", "Graded"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-white shadow-sm text-accent border border-slate-200' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tactical Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Scan assignments by title or course ID..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm"
                    />
                </div>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
                    <Filter size={16} />
                    Advanced Matrix
                </button>
            </div>

            {/* Assessment Pipeline */}
            <div className="space-y-4">
                {assignments.map((a, i) => {
                    const theme = STATUS_THEMES[a.status];
                    const StatusIcon = theme.icon;
                    return (
                        <div key={a.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-sharp hover:border-accent/30 transition-all group">
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                    {/* Lead Info */}
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className={`w-12 h-12 rounded-xl ${theme.bg} ${theme.color} flex items-center justify-center flex-shrink-0 shadow-sm border border-current opacity-20 group-hover:opacity-100 transition-opacity`}>
                                            <FileText size={24} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none px-2 py-0.5 bg-slate-100 rounded border border-slate-200">{a.course}</span>
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter italic">Evaluation Cycle S6</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-primary-text tracking-tight mb-1">{a.title}</h3>
                                            <p className="text-xs text-slate-500 line-clamp-1 italic">{a.description}</p>
                                        </div>
                                    </div>

                                    {/* Status & Actions */}
                                    <div className="flex flex-wrap items-center gap-6 lg:justify-end">
                                        <div className="flex items-center gap-8">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due Trajectory</span>
                                                <div className="flex items-center gap-2">
                                                    <Clock size={12} className={a.dueSoon ? 'text-red-500' : 'text-slate-400'} />
                                                    <span className={`text-xs font-bold ${a.dueSoon ? 'text-red-500' : 'text-primary-text'}`}>{a.dueDate}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Point Weight</span>
                                                <span className="text-xs font-bold text-primary-text italic opacity-60">Max {a.maxMarks}.0</span>
                                            </div>
                                            {a.grade && (
                                                <div className="flex flex-col items-center px-4 border-l border-slate-100">
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Evaluation</span>
                                                    <span className="text-xl font-black text-accent italic tracking-tighter">{a.grade}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 ml-auto lg:ml-0">
                                            {a.status === 'pending' ? (
                                                <button
                                                    onClick={() => setUploadId(a.id)}
                                                    className="px-6 py-2.5 bg-accent text-white rounded-xl text-xs font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2"
                                                >
                                                    <Upload size={14} />
                                                    Execute Submission
                                                </button>
                                            ) : (
                                                <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-accent hover:border-accent hover:bg-slate-50 transition-all shadow-sm">
                                                    <Eye size={18} />
                                                </button>
                                            )}
                                            <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Intelligence Panel */}
                                {a.aiSuggestion && (
                                    <div className="mt-6 pt-6 border-t border-slate-50 flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                                            <Brain size={16} />
                                        </div>
                                        <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                            <div className="text-[10px] font-black text-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-accent" />
                                                Evaluation Insight Core
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                                                &ldquo;{a.aiSuggestion}&rdquo;
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sophisticated Upload Modal */}
            {uploadId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl border border-slate-200 relative overflow-hidden">
                        <button
                            onClick={() => setUploadId(null)}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-all"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl border border-slate-700">
                                <Upload size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary-text tracking-tight mb-1">Transmission Protocol</h3>
                                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold font-mono">ID: {uploadId.toString().padStart(4, '0')} • ASYNC UPLOAD</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-accent hover:bg-slate-50/50 transition-all cursor-pointer group">
                                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                    <Folder size={32} />
                                </div>
                                <p className="text-sm font-bold text-primary-text mb-2">Initialize Payload Transfer</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">PDF, DOCX, ZIP • Max Load 50.0 MB</p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 italic">
                                <p className="text-[10px] text-slate-500 leading-relaxed text-center font-bold">
                                    <span className="text-accent underline decoration-slate-200">NOTE:</span> BY SUBMITTING, YOU ADHERE TO THE INSTITUTIONAL <span className="text-slate-900">ACADEMIC INTEGRITY POLICY</span>. PAYLOADS ARE SCANNED BY GRADEFLOW SECURITY.
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setUploadId(null)}
                                    className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all uppercase tracking-widest"
                                >
                                    Abort
                                </button>
                                <button
                                    onClick={() => setUploadId(null)}
                                    className="flex-1 py-4 bg-accent text-white rounded-xl text-xs font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all uppercase tracking-widest"
                                >
                                    Execute Load
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
