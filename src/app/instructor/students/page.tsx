"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { api } from "@/services/api";
import { Users, Loader2, Search, BookOpen } from "lucide-react";

interface Student {
    id: string;
    full_name: string;
    department?: string;
    course_id: string;
    course_code: string;
    course_title: string;
    enrolled_at?: string;
}

function hashColor(name: string): string {
    const colors = ["indigo", "emerald", "purple", "rose", "cyan", "amber", "teal", "blue", "orange", "pink"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}

export default function StudentsPage() {
    const router = useRouter();
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!api.auth.getToken()) { router.push("/login"); return; }
        fetchStudents();
    }, []);

    async function fetchStudents() {
        try {
            setLoading(true);
            const data = await api.instructor.students.list();
            setStudents(data);
        } catch (err: any) {
            setError(err.message || "Failed to load students");
        } finally {
            setLoading(false);
        }
    }

    const filtered = students.filter((s) =>
        `${s.full_name} ${s.course_code} ${s.department || ""}`.toLowerCase().includes(search.toLowerCase())
    );

    // Group students by course
    const grouped = filtered.reduce<Record<string, { code: string; title: string; students: Student[] }>>((acc, s) => {
        if (!acc[s.course_id]) {
            acc[s.course_id] = { code: s.course_code, title: s.course_title, students: [] };
        }
        acc[s.course_id].students.push(s);
        return acc;
    }, {});

    const uniqueStudentCount = new Set(students.map((s) => s.id)).size;
    const courseCount = new Set(students.map((s) => s.course_id)).size;

    return (
        <DashboardShell role="instructor">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Students</h1>
                <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    Students enrolled in your courses
                </p>
            </div>

            {/* Summary Stats */}
            <div className="flex gap-4">
                <div className="glass-card px-5 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
                        <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{uniqueStudentCount}</p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Total Students</p>
                    </div>
                </div>
                <div className="glass-card px-5 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{courseCount}</p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Active Courses</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm flex justify-between">
                    {error}
                    <button onClick={() => setError("")} className="text-red-400 hover:text-red-300">✕</button>
                </div>
            )}

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                <input
                    type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                    className="input-field pl-10" placeholder="Search students..."
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} /></div>
            ) : filtered.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <Users className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
                    <p className="font-medium" style={{ color: "var(--text-secondary)" }}>
                        {search ? "No students match your search" : "No students enrolled yet"}
                    </p>
                    {!search && <p className="text-sm mt-1" style={{ color: "var(--text-secondary)", opacity: 0.7 }}>Students will appear here once they enroll in your courses.</p>}
                </div>
            ) : (
                <div className="space-y-5">
                    {Object.entries(grouped).map(([courseId, group]) => (
                        <div key={courseId} className="glass-card overflow-hidden">
                            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border-color)" }}>
                                <span className="text-xs font-mono font-medium" style={{ color: "var(--accent)" }}>{group.code}</span>
                                <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>{group.title}</h3>
                                <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                                    {group.students.length} student{group.students.length !== 1 ? "s" : ""}
                                </p>
                            </div>
                            <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
                                {group.students.map((student) => {
                                    const col = hashColor(student.full_name);
                                    const initials = student.full_name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
                                    return (
                                        <div key={`${courseId}-${student.id}`} className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--hover-bg)] transition-colors">
                                            <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-${col}-500 to-${col}-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                                                {initials}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{student.full_name}</p>
                                                {student.department && <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{student.department}</p>}
                                            </div>
                                            {student.enrolled_at && (
                                                <span className="text-xs flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
                                                    Enrolled {new Date(student.enrolled_at).toLocaleDateString()}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardShell>
    );
}
