"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230F172A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-primary-text leading-[1.1] tracking-tight mb-8"
          >
            Master the Academic <br />
            <span className="text-slate-500">Lifecycle with GradeFlow.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-12"
          >
            A high-performance student management ecosystem designed for the modern university.
            From adaptive learning engines to blockchain-secured transcripts.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20"
          >
            <Link
              href="/register"
              className="bg-accent text-white px-8 py-4 rounded-md font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#how-it-works"
              className="bg-white text-slate-900 px-8 py-4 rounded-md font-bold border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
            >
              <Play size={18} fill="currentColor" />
              How It Works
            </Link>
          </motion.div>

          {/* Image/Mockup Area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden p-2">
              <div className="aspect-[16/10] bg-slate-50 rounded-lg border border-slate-100 relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Professional Student Collaboration"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />

                {/* Floating Bento Pieces */}
                <div className="absolute top-8 right-8 w-48 p-4 bg-white/90 backdrop-blur border border-white/20 rounded-lg shadow-lg">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Live Analytics</div>
                  <div className="flex items-end gap-2">
                    <div className="h-8 w-1 bg-slate-200 rounded-full" />
                    <div className="h-12 w-1 bg-slate-400 rounded-full" />
                    <div className="h-16 w-1 bg-slate-900 rounded-full" />
                    <div className="h-10 w-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-200/30 blur-[120px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
