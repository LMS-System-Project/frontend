"use client";

import { useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
    Calendar,
    Clock,
    Sparkles,
    Zap,
    Brain,
    ChevronLeft,
    ChevronRight,
    Plus,
    Target,
    AlertCircle,
    Activity,
    Lock,
    ArrowUpRight,
    Search,
    Filter,
    MoreHorizontal,
    Smile,
    Coffee,
    Moon
} from "lucide-react";

interface Event {
    id: string;
    title: string;
    type: "assignment" | "deep-work" | "lecture" | "pro-match";
    start: string;
    end: string;
    priority: "high" | "medium" | "low";
}

export default function SmartPlannerPage() {
    const [view, setView] = useState<"calendar" | "timeline">("calendar");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const events: Event[] = [
        { id: "1", title: "CS 301: Final Submission", type: "assignment", start: "09:00", end: "10:00", priority: "high" },
        { id: "2", title: "AI Deep Work: Neural Nets", type: "deep-work", start: "11:00", end: "13:30", priority: "medium" },
        { id: "3", title: "MA 201: Calculus Lecture", type: "lecture", start: "14:00", end: "15:30", priority: "low" },
    ];

    return (
        <DashboardShell role="student">
            <div className="space-y-8 max-w-[1200px] mx-auto pb-20">
                {/* Tactical Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Calendar size={14} className="text-accent" />
                            <span>Academic Velocity • Temporal Governance</span>
                        </div>
                        <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">Smart Planner</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Synchronizing <span className="text-accent font-bold italic">Deep Work Vectors</span> with institutional assessment lifecycles.
                        </p>
                    </div>

                    <div className="flex p-1 bg-slate-100 rounded-xl">
                        <button
                            onClick={() => setView("calendar")}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === "calendar" ? "bg-white text-accent shadow-sm" : "text-slate-400"
                                }`}
                        >
                            Mesh View
                        </button>
                        <button
                            onClick={() => setView("timeline")}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === "timeline" ? "bg-white text-accent shadow-sm" : "text-slate-400"
                                }`}
                        >
                            Linear Flow
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Interaction Area */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Weekly Mesh */}
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm border-b-4 border-b-slate-100">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 transition-all">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <h3 className="text-sm font-black text-primary-text uppercase tracking-widest italic px-2">Feb 23 — Mar 01, 2025</h3>
                                    <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 transition-all">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                                <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-slate-800 hover:bg-black transition-all flex items-center gap-2">
                                    <Plus size={14} />
                                    New Vector
                                </button>
                            </div>

                            <div className="grid grid-cols-7 border-b border-slate-100">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                    <div key={day} className="py-3 text-center border-r border-slate-50 last:border-r-0">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{day}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 h-[600px] overflow-y-auto relative custom-scrollbar">
                                {/* Time marker background */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 50px' }} />

                                {Array.from({ length: 7 }).map((_, dIdx) => (
                                    <div key={dIdx} className="border-r border-slate-50 last:border-r-0 p-2 space-y-2 relative min-h-full bg-white group hover:bg-slate-50/30 transition-colors">
                                        {dIdx === 2 && events.map(event => (
                                            <div
                                                key={event.id}
                                                className={`p-3 rounded-xl border shadow-sm transition-all hover:scale-[1.02] cursor-pointer group/card ${event.type === 'assignment' ? 'bg-red-50 border-red-100' :
                                                        event.type === 'deep-work' ? 'bg-accent/5 border-accent/10' :
                                                            'bg-white border-slate-100'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`text-[8px] font-black uppercase tracking-widest ${event.type === 'assignment' ? 'text-red-500' :
                                                            event.type === 'deep-work' ? 'text-accent' :
                                                                'text-slate-400'
                                                        }`}>{event.type}</span>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${event.priority === 'high' ? 'bg-red-500' :
                                                            event.priority === 'medium' ? 'bg-amber-400' :
                                                                'bg-slate-200'
                                                        }`} />
                                                </div>
                                                <p className="text-[10px] font-bold text-primary-text leading-tight group-hover/card:text-accent transition-colors">{event.title}</p>
                                                <div className="mt-3 flex items-center gap-1.5 text-slate-400">
                                                    <Clock size={10} />
                                                    <span className="text-[9px] font-bold uppercase tracking-tighter">{event.start} - {event.end}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {/* AI Ghost Slot for tomorrow */}
                                        {dIdx === 3 && (
                                            <div className="p-3 rounded-xl border border-dashed border-accent/30 bg-accent/[0.02] animate-pulse-soft cursor-pointer group/ghost">
                                                <div className="flex items-center gap-2 mb-2 text-accent">
                                                    <Sparkles size={10} />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">AI Suggestion</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-400 italic">Recommended: 2H Focus Block</p>
                                                <button className="mt-3 w-full py-1.5 bg-accent/10 text-accent rounded-lg text-[8px] font-black uppercase tracking-widest border border-accent/20 opacity-0 group-hover/ghost:opacity-100 transition-opacity">Lock Flow</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Intelligence Integration Area */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-accent mb-6">
                                        <Brain size={18} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Cognitive Advisor</span>
                                    </div>
                                    <h4 className="text-xl font-bold tracking-tight italic mb-4 underline decoration-accent/30 lowercase italic">Avoid the midnight oil.</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                                        Your <span className="text-white font-bold">Inference Matrix</span> suggests a high cognitive load for Friday. I've rescheduled your non-critical tasks to Saturday Morning.
                                    </p>
                                    <button className="mt-8 px-6 py-3 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-slate-700 hover:bg-slate-800 transition-all">Accept Optimization</button>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col border-b-4 border-b-slate-100 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <Zap size={100} className="text-accent" strokeWidth={1} />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                                    <Target size={14} className="text-accent" />
                                    Sync Calibration
                                </h4>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Module Adherence</span>
                                        <span className="text-xs font-black text-accent italic">98%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100">
                                        <div className="h-full bg-accent shadow-[0_0_8px_rgba(27,51,84,0.3)] transition-all duration-1000" style={{ width: '98%' }} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Temporal Drift</span>
                                        <span className="text-xs font-black text-emerald-500 italic">-4.2m Nominal</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Behavior Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Procrastination Meter */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm border-b-4 border-b-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Activity size={14} className="text-red-500" />
                                Procrastination Index
                            </h4>

                            <div className="flex flex-col items-center py-4">
                                <div className="relative w-32 h-32">
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle cx="64" cy="64" r="58" fill="none" strokeWidth="8" className="stroke-slate-50" />
                                        <circle
                                            cx="64"
                                            cy="64"
                                            r="58"
                                            fill="none"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray="364"
                                            strokeDashoffset={364 - (364 * 14) / 100}
                                            className="stroke-emerald-500 transition-all duration-1000"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black text-primary-text italic">14%</span>
                                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Nominal</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-8 text-center italic">Elite Compliance Matrix Identified</p>
                            </div>
                        </div>

                        {/* Flow Status */}
                        <div className="space-y-4">
                            {[
                                { label: 'Optimal Focus', sub: '9AM - 1PM', icon: Smile, col: 'accent' },
                                { label: 'Cognitive Decay', sub: '4PM - 6PM', icon: Coffee, col: 'amber-500' },
                                { label: 'Recovery State', sub: '11PM - 7AM', icon: Moon, col: 'indigo-500' },
                            ].map((state, i) => (
                                <div key={i} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between border-b-4 border-b-slate-100 group hover:border-b-accent transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-${state.col} group-hover:scale-110 transition-transform`}>
                                            <state.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-primary-text uppercase tracking-widest">{state.label}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{state.sub}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-200 group-hover:text-accent transition-all" />
                                </div>
                            ))}
                        </div>

                        {/* Lockdown Hub */}
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 group">
                            <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Lock size={14} />
                                Executive Focus
                            </h4>
                            <p className="text-[10px] text-red-800 font-medium leading-relaxed italic mb-6">
                                Enable <span className="font-bold underline decoration-red-200">Total System Lockdown</span> to isolate academic vectors and eliminate digital noise.
                            </p>
                            <button className="w-full py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border border-red-700 hover:bg-red-700 transition-all">
                                Initiate Lockdown
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
