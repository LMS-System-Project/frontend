"use client";

import { useState } from "react";
import {
    Calendar,
    Clock,
    Sparkles,
    Brain,
    ChevronLeft,
    ChevronRight,
    Plus,
    Target,
    Activity,
    Lock,
    Smile,
    Coffee,
    Moon,
    Flame,
    CheckCircle2,
    AlertTriangle,
    Zap,
    TrendingUp,
    Timer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
    id: string;
    title: string;
    type: "assignment" | "deep-work" | "lecture" | "break";
    start: string;
    end: string;
    priority: "high" | "medium" | "low";
    done?: boolean;
}

interface Task {
    id: string;
    title: string;
    course: string;
    due: string;
    priority: "high" | "medium" | "low";
    done: boolean;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = [24, 25, 26, 27, 28, 1, 2];
const TODAY_IDX = 2;

const EVENTS: Event[] = [
    { id: "1", title: "CS 301: Final Submission", type: "assignment", start: "09:00", end: "10:30", priority: "high" },
    { id: "2", title: "Deep Work: Machine Learning", type: "deep-work", start: "11:00", end: "13:00", priority: "medium" },
    { id: "3", title: "MA 201: Calculus Lecture", type: "lecture", start: "14:00", end: "15:30", priority: "low" },
];

const INITIAL_TASKS: Task[] = [
    { id: "1", title: "CS 301 Assignment 3", course: "CS 301", due: "Today", priority: "high", done: false },
    { id: "2", title: "Read Chapter 7", course: "MA 201", due: "Tomorrow", priority: "medium", done: true },
    { id: "3", title: "Lab Report Draft", course: "PHY 101", due: "Mar 3", priority: "medium", done: false },
    { id: "4", title: "Quiz Prep: Linear Algebra", course: "MA 301", due: "Mar 4", priority: "low", done: false },
];

const typeConfig = {
    assignment: { bg: "bg-red-50", border: "border-red-100", dot: "bg-red-500", text: "text-red-600", label: "Assignment" },
    "deep-work": { bg: "bg-blue-50", border: "border-blue-100", dot: "bg-blue-500", text: "text-blue-600", label: "Deep Work" },
    lecture: { bg: "bg-amber-50", border: "border-amber-100", dot: "bg-amber-400", text: "text-amber-600", label: "Lecture" },
    break: { bg: "bg-emerald-50", border: "border-emerald-100", dot: "bg-emerald-400", text: "text-emerald-600", label: "Break" },
};

const priorityDot: Record<string, string> = { high: "bg-red-500", medium: "bg-amber-400", low: "bg-slate-300" };

export default function SmartPlannerPage() {
    const [selectedDay, setSelectedDay] = useState(TODAY_IDX);
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [focusActive, setFocusActive] = useState(false);

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const completedCount = tasks.filter(t => t.done).length;
    const completionPct = Math.round((completedCount / tasks.length) * 100);

    return (
        <div className="space-y-8 max-w-[1200px] mx-auto pb-20">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <Calendar size={14} className="text-accent" />
                        <span>Schedule • Weekly Planner</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase italic underline decoration-slate-200">
                        Study Planner
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Plan your <span className="text-accent font-bold italic">study sessions</span> and track upcoming deadlines.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-black transition-all self-start md:self-auto">
                    <Plus size={14} />
                    Add Event
                </button>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: CheckCircle2, label: "Tasks Done", value: `${completedCount}/${tasks.length}`, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { icon: Flame, label: "Day Streak", value: "7 Days", color: "text-orange-500", bg: "bg-orange-50" },
                    { icon: Timer, label: "Focus Hours", value: "4.5h", color: "text-blue-500", bg: "bg-blue-50" },
                    { icon: TrendingUp, label: "This Week", value: `${completionPct}%`, color: "text-accent", bg: "bg-accent/5" },
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm border-b-4 border-b-slate-100 flex items-center gap-4"
                    >
                        <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                            <s.icon size={18} className={s.color} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                            <p className={`text-lg font-black italic ${s.color}`}>{s.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* ── Left: Day Selector + Events ── */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Day selector strip */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden border-b-4 border-b-slate-100">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 transition-all">
                                    <ChevronLeft size={16} />
                                </button>
                                <h3 className="text-sm font-black text-primary-text uppercase tracking-widest italic">Feb 24 — Mar 2, 2025</h3>
                                <button className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 transition-all">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest hidden sm:block">Week 8</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2 p-4">
                            {DAYS.map((day, i) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(i)}
                                    className={`flex flex-col items-center py-3 px-1 rounded-xl transition-all ${
                                        selectedDay === i
                                            ? "bg-slate-900 text-white shadow-lg"
                                            : i === TODAY_IDX
                                            ? "bg-accent/10 text-accent"
                                            : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                                    }`}
                                >
                                    <span className="text-[9px] font-black uppercase tracking-widest mb-1">{day}</span>
                                    <span className={`text-base font-black italic ${selectedDay === i ? "text-white" : i === TODAY_IDX ? "text-accent" : "text-primary-text"}`}>
                                        {DATES[i]}
                                    </span>
                                    {i === TODAY_IDX && (
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${selectedDay === i ? "bg-white" : "bg-accent"}`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Events for selected day */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Clock size={12} className="text-accent" />
                                {selectedDay === TODAY_IDX ? "Today's Schedule" : `${DAYS[selectedDay]}, ${DATES[selectedDay]}`}
                            </h3>
                            {selectedDay === TODAY_IDX && (
                                <span className="text-[9px] font-black text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded-full">Today</span>
                            )}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDay}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -12 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3"
                            >
                                {selectedDay === TODAY_IDX ? EVENTS.map((event, idx) => {
                                    const cfg = typeConfig[event.type];
                                    return (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.06 }}
                                            className={`${cfg.bg} border ${cfg.border} rounded-2xl p-5 flex items-center gap-5 hover:shadow-md transition-all cursor-pointer`}
                                        >
                                            <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${cfg.dot}`} />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-[8px] font-black uppercase tracking-widest ${cfg.text}`}>{cfg.label}</span>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${priorityDot[event.priority]}`} />
                                                </div>
                                                <p className="text-sm font-bold text-primary-text truncate">{event.title}</p>
                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    <Clock size={10} className="text-slate-400" />
                                                    <span className="text-[10px] font-bold text-slate-400">{event.start} – {event.end}</span>
                                                </div>
                                            </div>
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex-shrink-0">
                                                {(() => {
                                                    const [sh, sm] = event.start.split(":").map(Number);
                                                    const [eh, em] = event.end.split(":").map(Number);
                                                    const mins = (eh * 60 + em) - (sh * 60 + sm);
                                                    return mins >= 60 ? `${(mins / 60).toFixed(1)}h` : `${mins}m`;
                                                })()}
                                            </span>
                                        </motion.div>
                                    );
                                }) : (
                                    <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
                                        <Calendar size={36} className="mx-auto text-slate-200 mb-4" />
                                        <p className="text-sm font-bold text-slate-400">No events scheduled</p>
                                        <button className="mt-4 px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all inline-flex items-center gap-2">
                                            <Plus size={12} />
                                            Add Event
                                        </button>
                                    </div>
                                )}

                                {/* AI Suggestion slot */}
                                <div className="border border-dashed border-accent/30 bg-accent/[0.03] rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:bg-accent/[0.06] transition-all">
                                    <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                                        <Sparkles size={14} className="text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[9px] font-black text-accent uppercase tracking-widest">AI Suggestion</p>
                                        <p className="text-xs font-bold text-slate-500 italic mt-0.5">Recommended: 2h Focus Block at 4 PM</p>
                                    </div>
                                    <button className="px-3 py-1.5 bg-accent text-white rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                        Add
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Smart Suggestions Banner */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -mr-24 -mt-24" />
                        <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-2 text-accent mb-4">
                                    <Brain size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Smart Suggestions</span>
                                </div>
                                <h4 className="text-xl font-bold tracking-tight italic mb-3 underline decoration-accent/30 lowercase">
                                    Avoid the midnight oil.
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium italic max-w-sm">
                                    High workload detected on <span className="text-white font-bold">Friday</span>. We suggest moving non-critical tasks to Saturday morning.
                                </p>
                            </div>
                            <button className="flex-shrink-0 px-5 py-3 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700 whitespace-nowrap">
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Right Sidebar ── */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Task Checklist */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm border-b-4 border-b-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Target size={13} className="text-accent" />
                                Task List
                            </h4>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-emerald-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${completionPct}%` }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                </div>
                                <span className="text-[9px] font-black text-slate-400 italic">{completionPct}%</span>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {tasks.map((task) => (
                                <button
                                    key={task.id}
                                    onClick={() => toggleTask(task.id)}
                                    className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50/60 transition-colors text-left group"
                                >
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                        task.done ? "bg-emerald-500 border-emerald-500" : "border-slate-200 group-hover:border-accent"
                                    }`}>
                                        {task.done && <CheckCircle2 size={11} className="text-white" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold truncate transition-colors ${task.done ? "text-slate-300 line-through" : "text-primary-text group-hover:text-accent"}`}>
                                            {task.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">{task.course}</span>
                                            <span className={`text-[9px] font-black uppercase tracking-wider flex items-center gap-0.5 ${task.due === "Today" ? "text-red-500" : "text-slate-300"}`}>
                                                {task.due === "Today" && <AlertTriangle size={8} />}
                                                {task.due}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priorityDot[task.priority]}`} />
                                </button>
                            ))}
                        </div>
                        <div className="p-4 border-t border-slate-50">
                            <button className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest hover:border-accent hover:text-accent transition-all flex items-center justify-center gap-2">
                                <Plus size={12} />
                                Add Task
                            </button>
                        </div>
                    </div>

                    {/* Focus Score */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm border-b-4 border-b-slate-100">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                            <Activity size={13} className="text-emerald-500" />
                            Focus Score
                        </h4>
                        <div className="flex items-center gap-5">
                            <div className="relative w-24 h-24 flex-shrink-0">
                                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                                    <circle cx="48" cy="48" r="42" fill="none" strokeWidth="7" className="stroke-slate-100" />
                                    <circle
                                        cx="48" cy="48" r="42" fill="none" strokeWidth="7"
                                        strokeLinecap="round"
                                        strokeDasharray="264"
                                        strokeDashoffset={264 - (264 * 86) / 100}
                                        className="stroke-emerald-500 transition-all duration-1000"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl font-black text-primary-text italic">86%</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-bold text-primary-text italic">Great Focus!</p>
                                <p className="text-[10px] text-slate-400 leading-relaxed">You're on track this week. Keep the momentum going.</p>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">On Track</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Energy Windows */}
                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Energy Windows</p>
                        {[
                            { label: "Optimal Focus", sub: "9 AM – 1 PM", icon: Smile, color: "text-accent", bg: "bg-accent/5", hoverBorder: "hover:border-b-accent" },
                            { label: "Low Energy", sub: "4 PM – 6 PM", icon: Coffee, color: "text-amber-500", bg: "bg-amber-50", hoverBorder: "hover:border-b-amber-400" },
                            { label: "Rest Period", sub: "11 PM – 7 AM", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50", hoverBorder: "hover:border-b-indigo-400" },
                        ].map((s, i) => (
                            <div key={i} className={`bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-4 border-b-4 border-b-slate-100 ${s.hoverBorder} transition-all group cursor-pointer`}>
                                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                    <s.icon size={16} className={s.color} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-primary-text uppercase tracking-widest">{s.label}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{s.sub}</p>
                                </div>
                                <ChevronRight size={13} className="text-slate-200 group-hover:text-accent ml-auto transition-all" />
                            </div>
                        ))}
                    </div>

                    {/* Focus Mode Toggle */}
                    <motion.div
                        className={`rounded-2xl p-6 border transition-colors duration-500 ${focusActive ? "bg-slate-900 border-slate-800" : "bg-red-50 border-red-100"}`}
                        animate={focusActive ? { scale: [1, 1.008, 1] } : {}}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        <h4 className={`text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${focusActive ? "text-emerald-400" : "text-red-600"}`}>
                            {focusActive ? <Zap size={13} /> : <Lock size={13} />}
                            {focusActive ? "Focus Mode Active" : "Focus Mode"}
                        </h4>
                        <p className={`text-[10px] font-medium leading-relaxed italic mb-5 ${focusActive ? "text-slate-400" : "text-red-800"}`}>
                            {focusActive
                                ? "Distractions blocked. Stay in the zone — you're doing great."
                                : "Block distractions and concentrate fully on your studies."}
                        </p>
                        <button
                            onClick={() => setFocusActive(f => !f)}
                            className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all ${
                                focusActive
                                    ? "bg-emerald-500 text-white border border-emerald-600 hover:bg-emerald-600"
                                    : "bg-red-600 text-white border border-red-700 hover:bg-red-700"
                            }`}
                        >
                            {focusActive ? "Stop Focus Mode" : "Start Focus Mode"}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
