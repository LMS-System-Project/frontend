"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Users, BookOpen, Clock, Activity, ArrowRight, Plus, X, Loader2 } from "lucide-react";
import { api } from "@/services/api";

interface DashboardData {
  active_courses: number;
  total_students: number;
  pending_reviews: number;
  class_average: string;
}

interface Course {
  id: string;
  code: string;
  title: string;
  description: string | null;
  status: string;
  student_count: number;
}

export default function InstructorDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create course modal
  const [showCreate, setShowCreate] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);

  const user = api.auth.getUser();

  useEffect(() => {
    const token = api.auth.getToken();
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [dashData, coursesData] = await Promise.all([
        api.instructor.dashboard(),
        api.instructor.courses.list(),
      ]);
      setStats(dashData);
      setCourses(coursesData);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard");
      if (err.message?.includes("Authentication")) router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      await api.instructor.courses.create({
        code: newCode,
        title: newTitle,
        description: newDesc || undefined,
      });
      setShowCreate(false);
      setNewCode(""); setNewTitle(""); setNewDesc("");
      fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to create course");
    } finally {
      setCreating(false);
    }
  }

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) {
    return (
      <DashboardShell role="instructor">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent)" }} />
        </div>
      </DashboardShell>
    );
  }

  const statCards = [
    { label: "Active Courses", val: String(stats?.active_courses ?? 0), icon: BookOpen, color: "indigo" },
    { label: "Total Students", val: String(stats?.total_students ?? 0), icon: Users, color: "emerald" },
    { label: "Pending Reviews", val: String(stats?.pending_reviews ?? 0), icon: Clock, color: "amber" },
    { label: "Class Average", val: stats?.class_average ?? "N/A", icon: Activity, color: "rose" },
  ];

  return (
    <DashboardShell role="instructor">
      {error && (
        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm flex items-center justify-between">
          {error}
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-300 ml-2">✕</button>
        </div>
      )}

      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          {greeting}, {user?.full_name?.split(" ")[0] || "Instructor"} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Here's what's happening with your courses today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className={`glass-card p-5 card-hover animate-fade-in stagger-${i + 1}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-500/15 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{stat.val}</p>
                <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Your Courses</h2>
          <button
            onClick={() => setShowCreate(true)}
            className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Course
          </button>
        </div>

        {courses.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--text-secondary)", opacity: 0.5 }} />
            <p className="font-medium" style={{ color: "var(--text-secondary)" }}>No courses yet</p>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)", opacity: 0.7 }}>Create your first course to get started.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="glass-card p-5 card-hover cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                    {course.code.substring(0, 2).toUpperCase()}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${course.status === "active"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                      : course.status === "draft"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400"
                    }`}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                </div>
                <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                  {course.code}: {course.title}
                </h3>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                  {course.description || "No description"}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid var(--border-color)" }}>
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    <Users className="w-3.5 h-3.5 inline mr-1" />{course.student_count} students
                  </span>
                  <span className="text-xs font-medium flex items-center gap-1" style={{ color: "var(--accent)" }}>
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Course Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 w-full max-w-md relative" style={{ background: "var(--bg-card)" }}>
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors hover:bg-[var(--hover-bg)]"
              style={{ color: "var(--text-secondary)" }}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>Create New Course</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Course Code</label>
                <input
                  type="text" value={newCode} onChange={(e) => setNewCode(e.target.value)}
                  className="input-field" placeholder="CS 301" required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Title</label>
                <input
                  type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  className="input-field" placeholder="Data Structures" required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Description</label>
                <textarea
                  value={newDesc} onChange={(e) => setNewDesc(e.target.value)}
                  className="input-field resize-none" placeholder="Course description (optional)" rows={3}
                />
              </div>
              <button
                type="submit" disabled={creating}
                className="w-full btn-primary py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
