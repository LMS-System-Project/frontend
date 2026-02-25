"use client";

import Link from "next/link";
import { BookOpen, ChevronLeft, Home } from "lucide-react";

export default function AuthLayout({
    children,
    title,
    subtitle,
}: {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl" />

            {/* Universal Controls */}
            <div className="absolute top-8 left-8 flex gap-4">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-text transition-colors group"
                >
                    <div className="p-1.5 rounded border border-slate-200 bg-white group-hover:border-slate-300 shadow-sm transition-all">
                        <ChevronLeft size={14} />
                    </div>
                    Back
                </button>
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-text transition-colors group"
                >
                    <div className="p-1.5 rounded border border-slate-200 bg-white group-hover:border-slate-300 shadow-sm transition-all">
                        <Home size={14} />
                    </div>
                    Home
                </Link>
            </div>

            <div className="w-full max-w-md relative z-10 mt-12">
                {/* Logo */}
                <div className="flex flex-col items-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                        <BookOpen size={24} className="text-accent" />
                        <span className="text-xl font-bold text-primary-text tracking-tight">GradeFlow</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-primary-text tracking-tight mb-2">{title}</h1>
                    <p className="text-slate-500 text-center">{subtitle}</p>
                </div>

                {/* Card */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sharp p-8">
                    {children}
                </div>

                {/* Footer info */}
                <p className="mt-8 text-center text-xs text-slate-400">
                    Enterprise Security Standard • 256-bit Encryption
                </p>
            </div>
        </div>
    );
}
