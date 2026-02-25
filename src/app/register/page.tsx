"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, MapPin, UserPlus, ArrowRight, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { api } from "@/services/api";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        location: "",
        role: "student" as "student" | "instructor" | "admin",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        console.log("Registration: Starting flow for", formData.role);

        try {
            const data = await api.auth.register({
                email: formData.email,
                password: formData.password,
                full_name: formData.name,
                role: formData.role,
            });

            console.log("Registration: Success, data returned:", data);

            // Role-based redirection on success
            const userRole = data.role || data.user?.role || formData.role;
            let targetPath = "/student/dashboard";

            if (userRole === "instructor" || userRole === "teacher") {
                targetPath = "/instructor/dashboard";
            } else if (userRole === "admin") {
                targetPath = "/admin/dashboard";
            }

            console.log("Registration: Redirecting to", targetPath);

            // Primary Next.js navigation
            router.push(targetPath);

            // Secondary fallback if router hangs in some environments
            setTimeout(() => {
                if (window.location.pathname !== targetPath) {
                    console.log("Registration: Push took too long, forcing location update.");
                    window.location.href = targetPath;
                }
            }, 1500);

        } catch (err: any) {
            console.error("Registration: Error", err);
            setError(err.message || "Registration failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <AuthLayout
            title="Create Student Account"
            subtitle="Join 50,000+ students and start your high-performance academic journey"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <User size={18} />
                            </div>
                            <input
                                id="name"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-md bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="email">
                            Institutional Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Mail size={18} />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-md bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                                placeholder="j.doe@university.edu"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="phone">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Phone size={18} />
                                </div>
                                <input
                                    id="phone"
                                    type="tel"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-md bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="gender">
                                Gender
                            </label>
                            <select
                                id="gender"
                                required
                                className="block w-full px-3 py-2.5 border border-slate-200 rounded-md bg-white text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Location - Required for Roadmap Logic */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="location">
                            Current Location (City, Country)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <MapPin size={18} />
                            </div>
                            <input
                                id="location"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-md bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                                placeholder="New York, USA"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-md bg-white text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all"
                                placeholder="Managed by security portal"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="pt-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                            Account Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: "student" })}
                                className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${formData.role === "student"
                                    ? "bg-slate-900 border-slate-900 text-white shadow-md scale-[1.02]"
                                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                                    }`}
                            >
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: "instructor" })}
                                className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${formData.role === "instructor"
                                    ? "bg-slate-900 border-slate-900 text-white shadow-md scale-[1.02]"
                                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                                    }`}
                            >
                                Teacher
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-md font-bold hover:bg-slate-800 transition-all shadow-sm border border-slate-700 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Establishing Identity...
                        </>
                    ) : (
                        <>
                            Create Account
                            <UserPlus size={18} />
                        </>
                    )}
                </button>

                <p className="text-center text-sm text-slate-600">
                    Already have a student account?{" "}
                    <Link href="/login" className="font-bold text-accent hover:underline">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
