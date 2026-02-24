"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, User, Github, Loader2 } from "lucide-react";
import { api } from "@/services/api";

export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("instructor");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            if (isRegister) {
                await api.auth.register({ email, password, full_name: fullName, role });
            } else {
                await api.auth.login({ email, password });
            }
            const user = api.auth.getUser();
            if (user?.role === "instructor") router.push("/instructor/dashboard");
            else if (user?.role === "student") router.push("/student/dashboard");
            else if (user?.role === "admin") router.push("/admin/dashboard");
            else router.push("/instructor/dashboard");
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delay" />

            <div className="w-full max-w-md mx-4 relative z-10">
                <div className="glass-card p-8 relative" style={{ background: "var(--bg-card)" }}>
                    <Link href="/" className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--hover-bg)] transition-colors" style={{ color: "var(--text-secondary)" }}>
                        <ArrowLeft className="w-5 h-5" />
                    </Link>

                    <div className="text-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                            <span className="text-lg font-bold text-white">GF</span>
                        </div>
                        <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                            {isRegister ? "Create an Account" : "Welcome Back"}
                        </h2>
                        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                            {isRegister ? "Join thousands of learners today" : "Sign in to continue your progress"}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {isRegister && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                                            className="input-field pl-10" placeholder="John Doe" required />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Role</label>
                                    <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
                                        <option value="instructor">Instructor</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10" placeholder="you@example.com" required />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10" placeholder="••••••••" required />
                            </div>
                        </div>

                        {!isRegister && (
                            <div className="flex justify-end">
                                <a href="#" className="text-xs font-medium" style={{ color: "var(--accent)" }}>Forgot password?</a>
                            </div>
                        )}

                        <button type="submit" disabled={loading}
                            className="w-full btn-primary py-3 rounded-xl font-semibold text-white mt-2 flex items-center justify-center gap-2 disabled:opacity-50">
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isRegister ? "Sign Up" : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full" style={{ borderTop: "1px solid var(--border-color)" }} />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2" style={{ background: "var(--bg-card)", color: "var(--text-secondary)" }}>Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl transition-colors"
                                style={{ border: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                                <Github className="w-5 h-5" />
                                <span className="text-sm font-medium">GitHub</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl transition-colors"
                                style={{ border: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                                <span className="text-lg font-bold">G</span>
                                <span className="text-sm font-medium">Google</span>
                            </button>
                        </div>

                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button onClick={() => { setIsRegister(!isRegister); setError(""); }} className="font-medium" style={{ color: "var(--accent)" }}>
                                {isRegister ? "Sign In" : "Sign Up"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
