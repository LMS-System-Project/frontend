"use client";

import Link from "next/link";
import { User, Users, Shield, ArrowRight, CheckCircle2, Monitor, Database, BrainCircuit, NotebookPen } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const tiers = [
    {
        title: "Student Portal",
        icon: User,
        color: "bg-blue-50 text-blue-600",
        description: "Empowering learners with intelligent tools and adaptive content.",
        features: [
            "Adaptive Learning Engine (Micro-quizzes & Practice)",
            "Built-in Doubt Solver & Voice-to-Notes",
            "Video Player with tracking & downloads",
            "Personalized Academic Roadmap",
            "Performance-matched Study Groups"
        ],
        cta: "Start Learning",
        href: "/login?mode=register"
    },
    {
        title: "Teacher / Faculty",
        icon: Users,
        color: "bg-green-50 text-green-600",
        description: "Data-driven management for modern educators.",
        features: [
            "Real-time Class Attention Analytics",
            "Dropout Prediction Models",
            "Automatic Question Paper Generator",
            "Monitor Student Progress & Screens",
            "Bulk Multimedia Content Uploads"
        ],
        cta: "Faculty Portal",
        href: "/login"
    },
    {
        title: "Super Admin",
        icon: Shield,
        color: "bg-slate-900 text-white",
        description: "Full institutional control and system governance.",
        features: [
            "Full Database & Audit Control",
            "Task Assignment for Teachers",
            "Platform-wide Moderator Powers",
            "Blockchain Transcript Verification",
            "Enterprise Level Security & RBAC"
        ],
        cta: "Admin Login",
        href: "/login"
    }
];

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h1 className="text-4xl md:text-6xl font-bold text-primary-text mb-6 tracking-tight">
                            One Ecosystem. <br />
                            <span className="text-slate-500 text-3xl md:text-5xl">Three Tailored Experiences.</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            GradeFlow is designed to serve every stakeholder in the academic lifecycle with specialized tools
                            and data-driven intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((tier, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-sharp transition-all flex flex-col"
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-sm ${tier.color}`}>
                                    <tier.icon size={24} />
                                </div>

                                <h3 className="text-2xl font-bold text-primary-text mb-3">{tier.title}</h3>
                                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                    {tier.description}
                                </p>

                                <div className="space-y-4 mb-10 flex-grow">
                                    {tier.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex items-start gap-3">
                                            <CheckCircle2 size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-slate-600 leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={tier.href}
                                    className={`flex items-center justify-center gap-2 py-3 rounded-md font-bold text-sm transition-all ${index === 2
                                            ? "bg-slate-900 text-white hover:bg-slate-800"
                                            : "bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300"
                                        }`}
                                >
                                    {tier.cta}
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Breakdown Section */}
                    <div className="mt-32 space-y-32">
                        {/* Section 1: Academic Engine */}
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="w-full md:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 mb-6">
                                    <BrainCircuit size={14} />
                                    <span>Adaptive Learning Engine</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-6">Content that scales with you.</h2>
                                <p className="text-slate-600 mb-8 leading-relaxed">
                                    Our core logic monitors student performance in real-time. Students scoring below 60% are automatically recommended micro-quizzes
                                    and practice sessions. Scoring above 85% unlocks advanced tier content to challenge top performers.
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                        <div className="text-2xl font-bold text-primary-text mb-1">98%</div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Accuracy</div>
                                    </div>
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                        <div className="text-2xl font-bold text-primary-text mb-1">-40%</div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Dropouts</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="aspect-video bg-white rounded-xl border border-slate-200 shadow-sharp overflow-hidden p-2">
                                    <img
                                        src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800"
                                        alt="Adaptive Learning Illustration"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Smart Planner */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-16 text-right md:text-left">
                            <div className="w-full md:w-1/2 text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 mb-6">
                                    <NotebookPen size={14} />
                                    <span>Smart Academic Planner</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-6">Stay ahead of procrastination.</h2>
                                <p className="text-slate-600 mb-8 leading-relaxed">
                                    Automatic timetable synchronization and assignment deadline predictors. Our AI models analyze past procrastination behavior
                                    to send perfectly timed reminders before deadlines become critical.
                                </p>
                                <Link
                                    href="/login?mode=register"
                                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-md font-bold hover:bg-slate-800 transition-all shadow-sm"
                                >
                                    Start Learning Now
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="aspect-video bg-white rounded-xl border border-slate-200 shadow-sharp overflow-hidden p-2">
                                    <img
                                        src="https://images.pexels.com/photos/3184319/pexels-photo-3184319.jpeg?auto=compress&cs=tinysrgb&w=800"
                                        alt="Collaboration and Planning"
                                        className="w-full h-full object-cover rounded-lg text-left"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
