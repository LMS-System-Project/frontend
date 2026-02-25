"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Dr. Sarah Jenkins",
        role: "Dean of Admissions, State University",
        content: "GradeFlow has completely transformed how we handle transcripts. The blockchain layer adds a level of trust we've never had before.",
        rating: 5,
    },
    {
        name: "Professor Michael Chen",
        role: "Head of AI Dept, Tech Institute",
        content: "The adaptive learning engine is a game-changer. My students are more engaged because the content actually scales with their performance.",
        rating: 5,
    },
    {
        name: "Elena Rodriguez",
        role: "Senior Student, Global Academy",
        content: "The Smart Planner predicts exactly when I'm likely to procrastinate based on my past behavior. It's scary accurate but incredibly helpful.",
        rating: 5,
    },
];

export default function Reviews() {
    return (
        <section id="reviews" className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-6">Trusted by the Best</h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Hear from the educators and students who are shaping the future of learning with GradeFlow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm relative"
                        >
                            <div className="absolute top-6 right-8 text-slate-100">
                                <Quote size={48} />
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-slate-900 text-slate-900" />
                                ))}
                            </div>

                            <p className="text-slate-700 mb-8 leading-relaxed relative z-10">
                                "{review.content}"
                            </p>

                            <div>
                                <div className="font-bold text-primary-text">{review.name}</div>
                                <div className="text-sm text-slate-500">{review.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
