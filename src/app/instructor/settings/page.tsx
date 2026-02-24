"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api } from "@/services/api";
import { Save, Loader2, User } from "lucide-react";

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
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
                <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>Manage your profile and preferences</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} /></div>
            ) : (
                <div className="max-w-2xl space-y-6">
                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm flex justify-between">
                            {error}
                            <button onClick={() => setError("")} className="text-red-400 hover:text-red-300">✕</button>
                        </div>
                    )}
                    {success && (
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm">
                            {success}
                        </div>
                    )}

                    {/* Profile Card */}
                    <div className="glass-card">
                        {/* Avatar Section */}
                        <div className="flex items-center gap-5 p-6" style={{ borderBottom: "1px solid var(--border-color)" }}>
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                                {initials || <User className="w-8 h-8" />}
                            </div>
                            <div>
                                <p className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>{fullName || "Instructor"}</p>
                                <p className="text-sm capitalize" style={{ color: "var(--text-secondary)" }}>
                                    {profile?.role} · {profile?.email || ""}
                                </p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Full Name</label>
                                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Department</label>
                                <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Computer Science" className="input-field" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Role</label>
                                <input value={profile?.role || ""} disabled className="input-field opacity-50 cursor-not-allowed" />
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={saving || !hasChanges}
                                className="btn-primary px-6 py-2.5 rounded-xl font-medium text-white flex items-center gap-2 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardShell>
    );
}
