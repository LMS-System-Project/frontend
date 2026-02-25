"use client";

import {
    BookOpen,
    Clock,
    Users,
    Star,
    ArrowRight,
    Play,
    FileText,
    MoreHorizontal,
    Search,
    Filter,
    Layers,
    ChevronDown,
    CheckCircle2,
    Calendar,
    Target
} from "lucide-react";

const courses = [
    {
        code: "CS301",
        title: "Advanced Data Structures & Algorithms",
        instructor: "Prof. Michael Chen",
        department: "Computer Science",
        credits: 4,
        progress: 68,
        status: "active",
        grade: "A",
        lecturesTotal: 42,
        lecturesDone: 29,
        nextClass: "Mon, 10:00 AM",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        code: "MA201",
        title: "Engineering Mathematics III",
        instructor: "Dr. Sarah Williams",
        department: "Mathematics",
        credits: 4,
        progress: 45,
        status: "active",
        grade: "B+",
        lecturesTotal: 38,
        lecturesDone: 17,
        nextClass: "Tue, 09:00 AM",
        color: "text-slate-900",
        bg: "bg-slate-100"
    },
    {
        code: "PH202",
        title: "Quantum Physics Fundamentals",
        instructor: "Prof. Rajiv Nair",
        department: "Physics",
        credits: 3,
        progress: 72,
        status: "active",
        grade: "A-",
        lecturesTotal: 36,
        lecturesDone: 26,
        nextClass: "Wed, 11:00 AM",
        color: "text-red-600",
        bg: "bg-red-50"
    },
    {
        code: "EN101",
        title: "Technical Communication",
        instructor: "Dr. Emily Parker",
        department: "Humanities",
        credits: 2,
        progress: 90,
        status: "active",
        grade: "A",
        lecturesTotal: 28,
        lecturesDone: 25,
        nextClass: "Thu, 02:00 PM",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        code: "HS301",
        title: "History of Science & Tech",
        instructor: "Prof. Anna Schmidt",
        department: "History",
        credits: 3,
        progress: 55,
        status: "active",
        grade: "A-",
        lecturesTotal: 32,
        lecturesDone: 18,
        nextClass: "Fri, 03:00 PM",
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        code: "BI201",
        title: "Cell Biology & Genetics",
        instructor: "Dr. James Okafor",
        department: "Biology",
        credits: 3,
        progress: 40,
        status: "active",
        grade: "B+",
        lecturesTotal: 40,
        lecturesDone: 16,
        nextClass: "Mon, 02:00 PM",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
];

export default function StudentCoursesPage() {
    return (
        <div className="space-y-8 max-w-[1200px] mx-auto">
            {/* Strategic Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <Layers size={14} className="text-accent" />
                        <span>Curriculum Portfolio • Autumn 2025</span>
                    </div>
                    <h1 className="text-3xl font-bold text-primary-text tracking-tight">Active Academic Courses</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Managing 6 core modules with a total of <span className="text-accent font-bold">19 Institutional Credits</span>.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all bg-white shadow-sm">
                        <Filter size={16} />
                        Filter
                    </button>
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold shadow-sm border border-slate-700 hover:bg-slate-800 transition-all">
                            Cycle: Autumn 2025
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub-Header / Search Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search institutional course registry..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-1.5 bg-white shadow-sm rounded-md text-xs font-bold text-accent border border-slate-200">Enrolled</button>
                    <button className="flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600">Wishlist</button>
                    <button className="flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600">History</button>
                </div>
            </div>

            {/* Course Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-sharp transition-all group flex flex-col border-b-4 border-b-slate-100 hover:border-b-accent">
                        <div className="p-6 flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`px-2.5 py-1 ${course.bg} ${course.color} text-[10px] font-black rounded uppercase tracking-widest leading-none border border-current opacity-70`}>
                                    {course.code}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Active Cycle</span>
                                </div>
                            </div>

                            <h3 className="text-base font-bold text-primary-text mb-1 tracking-tight group-hover:text-accent transition-colors">
                                {course.title}
                            </h3>
                            <p className="text-xs font-medium text-slate-400 mb-6 italic">
                                Directed by {course.instructor}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lectures</div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-sm font-bold text-accent">{course.lecturesDone}</span>
                                        <span className="text-[10px] text-slate-400">/ {course.lecturesTotal}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Credits</div>
                                    <div className="text-sm font-bold text-accent">{course.credits}.0</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    <span>Knowledge Progress</span>
                                    <span className="text-accent">{course.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent rounded-full transition-all duration-1000 group-hover:bg-slate-900"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock size={12} className="text-slate-400" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{course.nextClass}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-black text-accent italic -mb-1">{course.grade}</span>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Current Pred.</span>
                                </div>
                                <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent transition-all shadow-sm">
                                    <Play size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Enrollment Placeholder */}
                <div className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-accent hover:bg-slate-50/50 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300 mb-4">
                        <ArrowRight size={24} />
                    </div>
                    <h4 className="text-sm font-bold text-primary-text uppercase tracking-widest">Enroll in Module</h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter italic">Institutional Registry V2.1</p>
                </div>
            </div>
        </div>
    );
}
