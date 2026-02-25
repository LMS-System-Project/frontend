"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
    ShieldCheck,
    ShieldAlert,
    Lock,
    Database,
    Cpu,
    Link,
    Search,
    ArrowRight,
    CheckCircle,
    FileText,
    History,
    Fingerprint,
    Zap,
    ExternalLink,
    RefreshCw,
    Download,
    Eye,
    ChevronRight,
    Target,
    Activity
} from "lucide-react";

interface LedgerEntry {
    id: string;
    student: string;
    enrollId: string;
    hash: string;
    timestamp: string;
    status: "verified" | "pending" | "revoked";
}

const ledgerEntries: LedgerEntry[] = [
    { id: "1", student: "Alexandra Kim", enrollId: "CS2022001", hash: "0x8f2a...e7b1", timestamp: "Feb 25, 2025 · 10:42", status: "verified" },
    { id: "2", student: "Priya Sinha", enrollId: "ME2022078", hash: "0x4d1c...a9f2", timestamp: "Feb 25, 2025 · 09:15", status: "verified" },
    { id: "3", student: "Arjun Mehta", enrollId: "EC2023042", hash: "0xb3e5...f0c8", timestamp: "Feb 24, 2025 · 16:30", status: "pending" },
    { id: "4", student: "Samuel Okafor", enrollId: "CE2023015", hash: "0x7a8d...c3d4", timestamp: "Feb 24, 2025 · 14:20", status: "verified" },
];

export default function BlockchainVerificationPage() {
    const [verifying, setVerifying] = useState(false);
    const [token, setToken] = useState("");
    const [result, setResult] = useState<"success" | "fail" | null>(null);

    async function handleVerify() {
        setVerifying(true);
        setResult(null);
        await new Promise(resolve => setTimeout(resolve, 2500));
        setVerifying(false);
        setResult(token.length > 5 ? "success" : "fail");
    }

    return (
        <DashboardShell role="admin">
            <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
                {/* Governance Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Lock size={14} className="text-accent" />
                            <span>Institutional Integrity • Immutable Ledger</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Credential Verification</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Deploying <span className="text-accent font-bold italic">Cryptographic Proof</span> to secure institutional academic vectors.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-accent shadow-inner">
                                <Database size={20} />
                            </div>
                            <div>
                                <p className="text-xl font-black text-primary-text leading-none tracking-tighter italic">14,204</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Hashed Degrees</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Tactical Verification Engine */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl group border border-slate-800">
                            {/* Decorative mesh */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -mr-32 -mt-32" />

                            <div className="relative z-10 max-w-xl">
                                <div className="flex items-center gap-3 text-accent mb-8">
                                    <Fingerprint size={24} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">Cryptographic Node Active</span>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight italic mb-8 leading-tight">
                                    Validate <span className="text-white italic underline decoration-accent/30 lowercase italic">any academic artifact</span> in real-time.
                                </h2>
                                <div className="space-y-4">
                                    <div className="relative group/input">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-accent transition-colors" size={20} />
                                        <input
                                            type="text"
                                            value={token}
                                            onChange={(e) => setToken(e.target.value)}
                                            placeholder="Enter Transaction Hash or Global Enrollment ID..."
                                            className="w-full pl-14 pr-4 py-5 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold placeholder:text-slate-600 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-accent transition-all italic tracking-wide"
                                        />
                                    </div>
                                    <button
                                        onClick={handleVerify}
                                        disabled={verifying || !token}
                                        className="w-full py-5 bg-accent text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {verifying ? <RefreshCw size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                                        {verifying ? "Executing Verification Sequence..." : "Audit Transaction"}
                                    </button>
                                </div>

                                {result && (
                                    <div className={`mt-8 p-6 rounded-2xl border flex items-center gap-4 animate-in zoom-in duration-300 ${result === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                                        }`}>
                                        {result === 'success' ? <CheckCircle size={24} /> : <ShieldAlert size={24} />}
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest">{result === 'success' ? 'Vector Validated' : 'Validation Error'}</p>
                                            <p className="text-[10px] font-medium italic mt-0.5 opacity-80">
                                                {result === 'success' ? 'Integrity check complete. Institutional ledger synced with 0x8f...e7b1.' : 'No institutional match found for the provided hash vector.'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Immutable Ledger Registry */}
                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm border-b-4 border-b-slate-100">
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-black text-primary-text uppercase tracking-widest flex items-center gap-2 italic">
                                        <Database size={16} className="text-accent" />
                                        Institutional Ledger Registry
                                    </h3>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 italic">Public Repository of Synchronized Credentials</p>
                                </div>
                                <button className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-accent hover:border-accent transition-all">
                                    <Download size={18} />
                                </button>
                            </div>

                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        {["Entity", "Registry ID", "Cryptographic Hash", "Timestamp", "State", ""].map((h, i) => (
                                            <th key={i} className="text-left px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {ledgerEntries.map((entry) => (
                                        <tr key={entry.id} className="group hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-5">
                                                <p className="text-sm font-bold text-primary-text tracking-tight group-hover:text-accent transition-colors italic">{entry.student}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Asset Ready</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-[10px] font-bold text-slate-500 font-mono italic">{entry.enrollId}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2 text-[10px] font-black text-accent font-mono italic">
                                                    <Link size={12} className="opacity-40" />
                                                    {entry.hash}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{entry.timestamp}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${entry.status === 'verified' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-amber-50 border-amber-100 text-amber-600'
                                                    }`}>
                                                    <div className={`w-1 h-1 rounded-full ${entry.status === 'verified' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">{entry.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-accent hover:border-accent transition-all">
                                                    <Eye size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="p-6 bg-slate-50/50 text-center border-t border-slate-100">
                                <button className="text-[10px] font-black text-slate-400 hover:text-accent uppercase tracking-widest flex items-center justify-center gap-2 mx-auto">
                                    Expand Ledger Repository
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Operational Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Node Status */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm border-b-4 border-b-slate-100 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Cpu size={100} strokeWidth={1} />
                            </div>
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-2">
                                <Activity size={14} className="text-accent" />
                                Decentralized Node Status
                            </h4>

                            <div className="space-y-6">
                                {[
                                    { label: "Institutional Validator", val: "Operational", col: "emerald-500" },
                                    { label: "Relay Latency", val: "14ms", col: "accent" },
                                    { label: "Block Synchronization", val: "100%", col: "emerald-500" },
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                        <span className={`text-xs font-black text-${stat.col} italic`}>{stat.val}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                <Zap size={14} className="text-amber-500" />
                                Reset Validator Node
                            </button>
                        </div>

                        {/* Recent Blocks */}
                        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
                            <h4 className="text-[10px] font-black text-accent uppercase tracking-widest mb-8 flex items-center gap-2">
                                <History size={14} />
                                Recent Block Matrix
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { hash: "0x8f...e7b1", type: "Certificate", time: "2m ago" },
                                    { hash: "0x4d...a9f2", type: "Grade Commit", time: "12m ago" },
                                    { hash: "0x7a...c3d4", type: "Registry Sync", time: "45m ago" },
                                ].map((block, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                            <Link size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold tracking-tight font-mono text-white/90">{block.hash}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">{block.type}</span>
                                                <span className="text-[9px] font-bold text-accent italic">{block.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security Protocol */}
                        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 relative group overflow-hidden">
                            <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <ShieldAlert size={14} />
                                Audit Advisory
                            </h4>
                            <p className="text-[10px] text-amber-800 font-medium leading-relaxed italic">
                                Any detected discrepancies in the <span className="font-bold underline decoration-amber-200">Hash Vector</span> will trigger an immediate system lock and notification to the Institutional Board.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
