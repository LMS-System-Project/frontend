"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { api } from "@/services/api";

export default function LoginPage() {
    const router = useRouter();
    const [roleMode, setRoleMode] = useState<"student" | "teacher" | "admin">("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const normalizedEmail = email.trim().toLowerCase();
        console.log("DEBUG: Login Attempt", {
            roleSelected: roleMode,
            emailEntered: normalizedEmail,
            passwordEntered: password.trim(),
            expectedEmail: "admin@gradeflow.com",
            expectedPass: "admin123"
        });

        // --- HYPER-ROBUST LOCAL BYPASS FOR ADMIN ---
        // Catch admin credentials REGARDLESS of the tab selected
        if (normalizedEmail === "admin@gradeflow.com" && password.trim() === "admin123") {
            console.log("MATCH: Master Admin detected. Bypassing backend...");
            const targetPath = "/admin/dashboard";

            if (typeof window !== "undefined") {
                localStorage.setItem("gradeflow_token", "local-admin-bypass-token");
                localStorage.setItem("gradeflow_user", JSON.stringify({
                    role: "admin",
                    email: "admin@gradeflow.com",
                    full_name: "Sneha Varghese",
                    id: "local-admin-id"
                }));
            }

            console.log("Login: State set, redirecting...");
            router.push(targetPath);

            setTimeout(() => {
                if (window.location.pathname !== targetPath) {
                    console.log("Login: Forcing location update.");
                    window.location.href = targetPath;
                }
            }, 800);

            setLoading(false);
            return;
        }
        // --------------------------------------------

        try {
            console.log("Login: Proceeding to backend authentication...");
            const data = await api.auth.login({ email: normalizedEmail, password });
            console.log("Login: Backend success, data returned:", data);

            // Redirection logic based on role from backend or selection
            const userRole = data.role || data.user?.role || roleMode;
            let targetPath = "/student/dashboard";

            if (userRole === "instructor" || userRole === "teacher") {
                targetPath = "/instructor/dashboard";
            } else if (userRole === "admin") {
                targetPath = "/admin/dashboard";
            }

            console.log("Login: Redirecting to", targetPath);

            // Primary Next.js navigation
            router.push(targetPath);

            // Secondary fallback if router hangs
            setTimeout(() => {
                if (window.location.pathname !== targetPath) {
                    console.log("Login: Push took too long, forcing location update.");
                    window.location.href = targetPath;
                }
            }, 1500);

        } catch (err: any) {
            console.error("Login: Error", err);
            setError(err.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getRoleConfig = () => {
        switch (roleMode) {
            case "admin":
                return {
                    title: "Admin Console",
                    subtitle: "Institutional oversight and system control",
                    button: "Admin Sign In"
                };
            case "teacher":
                return {
                    title: "Faculty Portal",
                    subtitle: "Manage courses, grading, and student progress",
                    button: "Teacher Sign In"
                };
            default:
                return {
                    title: "Student Portal",
                    subtitle: "Access your learning journey and academic records",
                    button: "Student Sign In"
                };
        }
    };

    const config = getRoleConfig();

    return (
        <AuthLayout
            title={config.title}
            subtitle={config.subtitle}
        >
            <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
                {(["student", "teacher", "admin"] as const).map((mode) => (
                    <button
                        key={mode}
                        type="button"
                        onClick={() => setRoleMode(mode)}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-md transition-all ${roleMode === mode
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        {mode}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-md text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                        {error}
                    </div>
                )}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Mail size={18} />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-md bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                                placeholder="name@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider" htmlFor="password">
                                Password
                            </label>
                            <Link href="#" className="text-xs font-medium text-slate-500 hover:text-accent transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-md bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-md font-bold hover:bg-slate-800 transition-all shadow-sm border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Establishing Identity...
                        </>
                    ) : (
                        <>
                            {config.button}
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>

                <p className="text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-bold text-accent hover:underline">
                        Create one
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
