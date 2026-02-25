"use client";

import { useState } from "react";
import {
    Send,
    Brain,
    BookOpen,
    CalendarDays,
    Lightbulb,
    ChevronRight,
    Sparkles,
    History,
    MoreHorizontal,
    User,
    CheckCircle2,
    Clock,
    Target
} from "lucide-react";

const INITIAL_MESSAGES = [
    {
        role: "ai",
        text: "Hello Alexandra! I'm your GradeFlow Intelligence Advisor. I've analyzed your Semester 6 progression and logic competency. How can I assist your academic trajectory today?",
    },
];

const QUICK_PROMPTS = [
    "Simulate GPA trend for S7",
    "Analyze Physics Chapter 8 proficiency",
    "Optimize my weekly study load",
    "Identify cross-department electives",
];

const STUDY_PLAN = [
    { day: "MON", tasks: ["Advanced Logic: Probabilistic Models (2h)", "CS: Kernel Architectures (1.5h)"] },
    { day: "TUE", tasks: ["Calculus III: Vector Manifolds (2h)", "Elective: Blockchain Fundamentals (1h)"] },
    { day: "WED", tasks: ["CS: Distributed Hash Tables (2h)", "Physics: Quantum Entanglement Lab (1h)"] },
    { day: "THU", tasks: ["Mathematics: Stochastic Processes (2h)", "Career: Industry Placement Sync (1h)"] },
    { day: "FRI", tasks: ["Institutional Revision Cycle (2h)", "Simulated Mock Evaluation (1h)"] },
];

export default function StudentAIAssistantPage() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [activeTab, setActiveTab] = useState<"chat" | "planner" | "advisor">("chat");

    function sendMessage(text: string) {
        if (!text.trim()) return;
        const userMsg = { role: "user", text };
        const aiResponse = {
            role: "ai",
            text: `Analyzing context for: "${text}"... Based on your academic standing (TOP 5%), I recommend focusing on the multivariate logic markers in your upcoming CS assignments. Would you like a simulated study path for these specific modules?`,
        };
        setMessages((prev) => [...prev, userMsg, aiResponse]);
        setInput("");
    }

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto">
            {/* Governance Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <Sparkles size={14} className="text-accent" />
                        <span>Elite Academic Intelligence • Active Session</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight">GradeFlow Intelligence Assistant</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Context-aware advisory system synchronized with your institutional data.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-2 px-4 shadow-sm">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-tighter">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Advisor Online
                    </div>
                </div>
            </div>

            {/* Functional Tabs */}
            <div className="bg-slate-100 p-1 rounded-xl w-fit flex items-center border border-slate-200">
                {[
                    { id: "chat", icon: Brain, label: "Intelligence Chat" },
                    { id: "planner", icon: CalendarDays, label: "Adaptive Planner" },
                    { id: "advisor", icon: Target, label: "Trajectory Advisor" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-accent border border-slate-200' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === "chat" && (
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Chat Architecture */}
                    <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl flex flex-col shadow-sm overflow-hidden h-[600px]">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
                                    <Brain size={18} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-primary-text leading-none">Intelligence Engine</div>
                                    <div className="text-[10px] text-slate-400 font-bold leading-none mt-1 uppercase tracking-widest">Model: GradeFlow-X1</div>
                                </div>
                            </div>
                            <button className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400"><History size={18} /></button>
                        </div>

                        {/* Message Stream */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${msg.role === 'ai' ? 'bg-white border border-slate-200 text-accent' : 'bg-accent text-white'
                                            }`}>
                                            {msg.role === 'ai' ? <Brain size={16} /> : <User size={16} />}
                                        </div>
                                        <div className={`p-4 rounded-xl text-sm leading-relaxed shadow-sm border ${msg.role === 'ai' ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-white'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Hub */}
                        <div className="p-6 bg-white border-t border-slate-100 space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {QUICK_PROMPTS.map((p, i) => (
                                    <button
                                        key={i}
                                        onClick={() => sendMessage(p)}
                                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-bold text-slate-500 hover:border-accent hover:text-accent transition-all"
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                                    placeholder="Execute academic query..."
                                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                                />
                                <button
                                    onClick={() => sendMessage(input)}
                                    className="px-5 py-3 bg-accent text-white rounded-xl shadow-lg border border-slate-700 hover:bg-slate-800 transition-all"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Context Constraints */}
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Context Vectors</h3>
                            <div className="space-y-2">
                                {[
                                    { label: "CGPA (Current)", val: "8.7" },
                                    { label: "Cohort Rank", val: "#12 / 280" },
                                    { label: "Department", val: "CS Core" },
                                    { label: "S6 Credits", val: "22 / 22" },
                                    { label: "Alerts Due", val: "03 ACTIVE" },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{item.label}</span>
                                        <span className="text-xs font-bold text-accent">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm text-white">
                            <div className="flex items-center gap-2 mb-4 text-emerald-400">
                                <Lightbulb size={18} />
                                <h3 className="text-xs font-bold uppercase tracking-widest">Model Capabilities</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    "Simulate Grade Trajectories",
                                    "Course Dependency Mapping",
                                    "Adaptive Study Scheduling",
                                    "Inter-disciplinary Matching",
                                    "Logic Marker Analysis"
                                ].map((cap, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                        {cap.toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "planner" && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-lg font-bold text-primary-text tracking-tight mb-1">Weekly Intelligence Plan</h2>
                            <p className="text-xs text-slate-500 italic">Optimized schedule based on upcoming assessment deadlines.</p>
                        </div>
                        <button className="px-4 py-2 bg-accent text-white rounded-md text-xs font-bold border border-slate-700 shadow-sm">Re-Optimize Schedule</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {STUDY_PLAN.map((day, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-accent group transition-all">
                                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-4 group-hover:text-accent">{day.day}</p>
                                <div className="space-y-3">
                                    {day.tasks.map((task, j) => (
                                        <div key={j} className="bg-white border border-slate-200 p-3 rounded-lg text-[10px] font-bold text-slate-600 leading-snug border-l-4 border-l-slate-300 group-hover:border-l-accent shadow-sm">
                                            {task}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "advisor" && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100">
                        <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg border border-slate-700">
                            <Target size={32} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-primary-text tracking-tight mb-1 italic underline decoration-slate-200">Trajectory Advisory Console</h2>
                            <p className="text-sm text-slate-500">Autonomous intelligence predicting long-term academic and career outcomes.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            {[
                                { cat: "Immediate High-Impact", color: "text-red-500", items: ["Complete Logic Gaps in Semester 6 Modules", "Initialize Career Track Selection (Deadline in 12d)"] },
                                { cat: "Mid-Term Strategic", color: "text-amber-500", items: ["Audit Semester 7 Pre-requisites", "Schedule Review with Faculty Mentor Prof. Chen"] },
                                { cat: "Long-Term Goal (GPA 9.0)", color: "text-emerald-500", items: ["Target 12% increase in Quantitative markers", "Engage in Institutional Research Projects"] }
                            ].map((sect, i) => (
                                <div key={i} className="space-y-4">
                                    <div className={`text-[10px] font-extrabold uppercase tracking-[0.2em] ${sect.color}`}>{sect.cat}</div>
                                    <div className="space-y-2">
                                        {sect.items.map((it, j) => (
                                            <div key={j} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 hover:bg-white hover:border-accent hover:shadow-sm transition-all cursor-pointer">
                                                <div className={`w-1.5 h-1.5 rounded-full ${sect.color.replace('text', 'bg')}`} />
                                                {it}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-900 rounded-2xl p-8 text-white relative h-full flex flex-col justify-between overflow-hidden">
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <CheckCircle2 size={24} />
                                        <span className="text-sm font-bold uppercase tracking-widest">Optimization Complete</span>
                                    </div>
                                    <h4 className="text-2xl font-bold tracking-tight italic leading-snug">
                                        Your trajectory toward <span className="underline decoration-emerald-500 text-emerald-400">Advanced AI Research</span> is currently at <span className="text-emerald-400">88%</span> proficiency.
                                    </h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                        Intelligence model suggests maintaining core logic performance while increasing engagement with institutional research labs within the next 4 months.
                                    </p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between relative z-10">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-slate-500" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Next Auto-Sync: 24h</span>
                                    </div>
                                    <button className="text-xs font-bold text-emerald-400 flex items-center gap-1 hover:gap-2 transition-all group">
                                        Detailed Strategy <ChevronRight size={16} />
                                    </button>
                                </div>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
