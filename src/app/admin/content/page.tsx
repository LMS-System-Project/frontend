"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
    Upload,
    FileText,
    Video,
    Tag,
    Trash2,
    Search,
    CheckCircle,
    ShieldCheck,
    Cloud,
    ArrowRight,
    Search as SearchIcon,
    Filter,
    ChevronDown,
    Activity,
    Lock,
    Eye
} from "lucide-react";

const contentItems = [
    { id: 1, type: "video", title: "Data Structures: Arrays & Linked Lists", course: "CS 301", dept: "Computer Science", size: "245 MB", date: "Feb 20, 2025", status: "published" },
    { id: 2, type: "document", title: "Quantum Physics Reference Manual", course: "PH 202", dept: "Physics", size: "18 MB", date: "Feb 18, 2025", status: "published" },
    { id: 3, type: "video", title: "Integral Calculus — Line Integrals", course: "MA 201", dept: "Mathematics", size: "180 MB", date: "Feb 15, 2025", status: "draft" },
    { id: 4, type: "document", title: "Cell Biology Lab Manual 2025", course: "BI 201", dept: "Biology", size: "22 MB", date: "Feb 10, 2025", status: "published" },
    { id: 5, type: "document", title: "Technical Writing Style Guide", course: "EN 101", dept: "Humanities", size: "5 MB", date: "Feb 8, 2025", status: "published" },
];

const STATUS_THEMES: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    published: { label: "IN REPOSITORY", color: "text-emerald-600", bg: "bg-emerald-50", icon: ShieldCheck },
    draft: { label: "STAGING DRAFT", color: "text-amber-600", bg: "bg-amber-50", icon: Activity },
};

export default function AdminContentPage() {
    const [dragOver, setDragOver] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = contentItems.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.course.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardShell role="admin">
            <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
                {/* Governance Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Lock size={14} className="text-accent" />
                            <span>Academic Audit • Content Repository</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Institutional Assets</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Governance of academic <span className="text-accent font-bold italic">Curriculum Artifacts</span> across your system.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shadow-inner">
                                <Cloud size={20} />
                            </div>
                            <div>
                                <p className="text-xl font-black text-primary-text leading-none tracking-tighter italic">2.4 TB</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Storage Util</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tactical Upload Zone */}
                <div
                    className={`group relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${dragOver ? "border-accent bg-slate-50 shadow-inner" : "border-slate-200 bg-white hover:border-accent/40"
                        }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); setUploaded(true); setTimeout(() => setUploaded(false), 3000); }}
                >
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100 overflow-hidden">
                        <div className={`h-full bg-accent transition-all duration-1000 ${uploaded ? 'w-full' : 'w-0'}`} />
                    </div>

                    {uploaded ? (
                        <div className="flex flex-col items-center justify-center animate-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 border border-emerald-100 shadow-sm">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-base font-bold text-emerald-600 uppercase tracking-widest">Axiom Synchronized</h3>
                            <p className="text-xs text-slate-400 mt-2 italic font-medium">Your instructional artifact has been committed to the institutional ledger.</p>
                        </div>
                    ) : (
                        <div className="max-w-xl mx-auto">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-6 group-hover:scale-110 group-hover:text-accent transition-all">
                                <Upload size={32} />
                            </div>
                            <h3 className="text-base font-bold text-primary-text uppercase tracking-widest">Ingest Academic Artifact</h3>
                            <p className="text-xs text-slate-400 mt-2 mb-8 italic font-medium">Drag & drop modular lectures, research manuals, or evaluation schemas.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-left">
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Artifact Code</label>
                                    <input type="text" placeholder="e.g. CS-301-L04" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-primary-text focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all italic shadow-inner" />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Modular Unit</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-primary-text focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all appearance-none italic shadow-inner">
                                        <option>Select Course</option>
                                        <option>CS 301</option>
                                        <option>MA 201</option>
                                        <option>PH 202</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Department Registry</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-primary-text focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all appearance-none italic shadow-inner">
                                        <option>Select Unit</option>
                                        <option>Computer Science</option>
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                    </select>
                                </div>
                            </div>

                            <button className="px-10 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl border border-slate-800 hover:bg-black transition-all flex items-center gap-2 mx-auto">
                                <Cloud size={16} />
                                Initiate Sequence
                            </button>
                        </div>
                    )}
                </div>

                {/* Registry Management */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm border-b-4 border-b-slate-100">
                    <div className="p-6 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center">
                        <div className="relative flex-1 group w-full">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Scan repository for specific artifacts..."
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-accent transition-all shadow-sm italic"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["All", "Video", "Manual"].map(f => (
                                <button
                                    key={f}
                                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${f === "All" ? "bg-accent text-white border-slate-700 shadow-sm" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                {["Format", "Artifact Title", "Course Unit", "Department", "Payload", "Timestamp", "Audit State", ""].map((h, i) => (
                                    <th key={i} className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((item, i) => {
                                const theme = STATUS_THEMES[item.status];
                                return (
                                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="px-6 py-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border group-hover:scale-110 transition-transform ${item.type === "video" ? "bg-accent/5 border-accent/10 text-accent" : "bg-amber-50 border-amber-100 text-amber-500"
                                                }`}>
                                                {item.type === "video" ? <Video size={18} /> : <FileText size={18} />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-primary-text tracking-tight group-hover:underline italic decoration-slate-200 underline-offset-4">{item.title}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Asset ID: RF-{item.id}29XC</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">{item.course}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 w-fit">
                                                <Tag size={10} className="text-slate-400" />
                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter whitespace-nowrap">{item.dept}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-[10px] font-black text-slate-400 italic font-mono">{item.size}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{item.date}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${theme.bg}`}>
                                                <theme.icon size={12} className={theme.color} />
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${theme.color}`}>{theme.label}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-accent hover:border-accent transition-all shadow-sm">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Institutional Core Ledger Synced (Last Audit: 12m ago)</span>
                        </div>
                        <button className="text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-2 hover:underline">
                            Full System Audit
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
