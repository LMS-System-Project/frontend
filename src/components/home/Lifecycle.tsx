"use client";

import { motion } from "framer-motion";
import { BookOpen, Award, Target, Zap, GraduationCap } from "lucide-react";
import PexelsVideo from "./PexelsVideo";

const steps = [
    {
        icon: Target,
        title: "Discovery & Onboarding",
        description: "Personalized academic roadmap generation based on location and background.",
        quote: "The first step to excellence is a clear path.",
    },
    {
        icon: BookOpen,
        title: "Adaptive Learning Engine",
        description: "AI-driven content recommendations. Score < 60% unlocks practice; Score > 85% unlocks advanced tiers.",
        quote: "Education is not the filling of a pail, but the lighting of a fire.",
    },
    {
        icon: Zap,
        title: "Smart Assessment",
        description: "Rubric-based grading, plagiarism detection, and real-time doubt solving.",
        quote: "True knowledge exists in knowing that you know nothing.",
    },
    {
        icon: Award,
        title: "Performance Tracking",
        description: "Rank tracking and dropout prediction models for proactive intervention.",
        quote: "Success is the sum of small efforts repeated day in and day out.",
    },
    {
        icon: GraduationCap,
        title: "Blockchain Certification",
        description: "Tamper-proof grade storage and digital transcript verification for lifelong success.",
        quote: "The future belongs to those who learn more skills and combine them in creative ways.",
    },
];

export default function Lifecycle() {
    return (
        <section id="lifecycle" className="py-24 bg-white border-t border-slate-100 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-6">The Learning Lifecycle</h2>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            A structured progression designed to guide every student from enrollment to verified graduation.
                        </p>
                    </div>

                    {/* Section Video Visualization */}
                    <div className="relative w-full max-w-3xl mx-auto aspect-video mb-24 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
                        <PexelsVideo
                            videoId="4298113"
                            fallbackUrl="https://assets.mixkit.co/videos/preview/mixkit-university-students-walking-through-the-hallway-44474-large.mp4"
                            posterUrl="https://images.pexels.com/photos/4298113/pexels-photo-4298113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            opacity={0.8}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <div className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">Institutional Motion</div>
                                <div className="text-2xl font-bold">Visualizing the Student Journey</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200" />

                        <div className="space-y-24">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                                >
                                    {/* Content */}
                                    <div className="w-1/2 px-12">
                                        <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl hover:shadow-sharp transition-all">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-accent text-white rounded-md">
                                                    <step.icon size={20} />
                                                </div>
                                                <h3 className="text-xl font-bold text-primary-text">{step.title}</h3>
                                            </div>
                                            <p className="text-slate-600 mb-6 leading-relaxed">
                                                {step.description}
                                            </p>
                                            <div className="pl-4 border-l-2 border-slate-300 italic text-sm text-slate-500">
                                                "{step.quote}"
                                            </div>
                                        </div>
                                    </div>

                                    {/* Node */}
                                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-sm z-10" />

                                    {/* Empty Spacer */}
                                    <div className="w-1/2" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
