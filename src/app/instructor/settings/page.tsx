"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api } from "@/services/api";
import {
    Save,
    Loader2,
    User,
    Shield,
    Bell,
    Globe,
    Moon,
    Layout,
    Key,
    Settings as SettingsIcon,
    ChevronRight,
    Target,
    Zap,
    Flag,
    Building
} from "lucide-react";

interface Profile {
    id: string;
    full_name: string;
    email?: string;
    role: string;
    department?: string;
    created_at?: string;
}

export default function SettingsPage() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [fullName, setFullName] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        if (!api.auth.getToken()) { router.push("/login"); return; }
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            setLoading(true);
            const data = await api.instructor.profile.get();
            setProfile(data);
            setFullName(data.full_name);
            setDepartment(data.department || "");
        } catch (err: any) {
            setError(err.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        try {
            setSaving(true); setError(""); setSuccess("");
            const updated = await api.instructor.profile.update({
                full_name: fullName,
                department: department || undefined,
            });
            setProfile(updated);
            setSuccess("Profile updated successfully!");
            const storedUser = api.auth.getUser();
            if (storedUser) {
                api.auth.setUser({ ...storedUser, full_name: fullName, department: department || undefined });
            }
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: any) {
            setError(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    }

    const hasChanges = profile && (fullName !== profile.full_name || department !== (profile.department || ""));
    const initials = fullName ? fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "";

    return (
        <DashboardShell role="instructor">
            <div className="space-y-8 max-w-[1000px] mx-auto pb-20">
                {/* Governance Header */}
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <SettingsIcon size={14} className="text-accent" />
                        <span>Faculty Governance • Personal Registry</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Governance Parameters</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Control your <span className="text-accent font-bold">Instructional Identity</span> and institutional visibility vectors.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-10 h-10 border-4 border-slate-100 border-t-accent rounded-full animate-spin" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synchronizing Profile Matrix...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Sidebar Sections */}
                        <div className="lg:col-span-4 space-y-2">
                            {[
                                { id: 'personal', label: 'Identity Profile', icon: User, active: true },
                                { id: 'security', label: 'Security Crypt', icon: Shield, active: false },
                                { id: 'notifications', label: 'Signal Settings', icon: Bell, active: false },
                                { id: 'institutional', label: 'Registry Access', icon: Globe, active: false },
                                { id: 'workflow', label: 'Workflow Engine', icon: Layout, active: false },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${item.active
                                            ? 'bg-white shadow-sharp text-accent border border-slate-200'
                                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={16} />
                                        <span className="uppercase tracking-widest">{item.label}</span>
                                    </div>
                                    <ChevronRight size={14} className={item.active ? 'opacity-100' : 'opacity-0'} />
                                </button>
                            ))}
                        </div>

                        {/* Main Interaction Area */}
                        <div className="lg:col-span-8 space-y-8">
                            {error && (
                                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex justify-between animate-in slide-in-from-top duration-300">
                                    <div className="flex items-center gap-2 uppercase tracking-widest">
                                        <Shield size={14} />
                                        Sync Error: {error}
                                    </div>
                                    <button onClick={() => setError("")} className="text-red-400 hover:text-red-600">✕</button>
                                </div>
                            )}
                            {success && (
                                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-in slide-in-from-top duration-300">
                                    <Shield size={14} />
                                    {success}
                                </div>
                            )}

                            {/* Identity Hub */}
                            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                <div className="bg-slate-900 px-8 py-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                                    {/* Decorative pattern overlay */}
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                                    <div className="w-24 h-24 rounded-3xl bg-accent flex items-center justify-center text-4xl font-black text-white shadow-2xl border border-slate-700 relative z-10 group cursor-pointer overflow-hidden">
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Target size={24} />
                                        </div>
                                        {initials}
                                    </div>
                                    <div className="relative z-10 text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">{fullName || "Unregistered Identity"}</h3>
                                        <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mt-1 italic">{profile?.role || "GUEST"} • FACULTY CLASS S7</p>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest leading-none">
                                                <Zap size={10} className="text-amber-500" />
                                                Elite Sync
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest leading-none">
                                                <Building size={10} className="text-emerald-500" />
                                                {department || "UNASSIGNED DECK"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5 flex flex-col">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Instructional Name</label>
                                            <input
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-primary-text focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all italic"
                                            />
                                        </div>
                                        <div className="space-y-1.5 flex flex-col">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Departmental Designation</label>
                                            <input
                                                value={department}
                                                onChange={(e) => setDepartment(e.target.value)}
                                                placeholder="e.g. Computer Science Hub"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-primary-text focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all italic"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 flex flex-col">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Institutional Email Interface</label>
                                        <input
                                            value={profile?.email || ""}
                                            disabled
                                            className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-400 cursor-not-allowed opacity-60 italic"
                                        />
                                        <span className="text-[9px] text-slate-300 font-bold uppercase tracking-tighter px-1">* Primary identity vector managed by institution admin.</span>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">All parameters synchronized with core ledger (12H)</span>
                                        </div>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving || !hasChanges}
                                            className="px-8 py-3.5 bg-accent text-white rounded-xl text-xs font-bold shadow-lg border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50 uppercase tracking-[0.2em]"
                                        >
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                                            Commit Change Ledger
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Parameters Preview */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl group flex flex-col justify-between hover:border-accent/50 transition-all">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                            <Key size={18} />
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Locked State</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-1 italic">Security Encryption</h4>
                                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">Manage dual-factor authentication and session trajectory logs.</p>
                                    </div>
                                </div>
                                <div className="bg-white border border-slate-200 p-6 rounded-2xl group flex flex-col justify-between hover:border-accent/50 transition-all shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                            <Moon size={18} />
                                        </div>
                                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Global Opt</span>
                                    </div>
                                    <div>
                                        <h4 className="text-primary-text text-sm font-bold uppercase tracking-widest mb-1 italic">Atmospheric Design</h4>
                                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">Switch between Dark/High-Contrast/Elite institutional aesthetics.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
