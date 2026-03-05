"use client";

import { useEffect, useState } from "react";
import { BookOpen, ArrowRight, Search, Loader2, CheckCircle, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { api } from "@/services/api";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.student.courses
      .list()
      .then((data) => setCourses(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Loading Courses...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
            <BookOpen size={14} className="text-accent" />
            <span>Academic Modules • {courses.length} Enrolled</span>
          </div>
          <h1 className="text-3xl font-bold text-primary-text tracking-tight uppercase">My Courses</h1>
        </div>
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-primary-text placeholder-slate-400 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      {/* Courses Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <BookOpen size={48} className="mb-4 text-slate-200" />
          <p className="text-sm font-medium">
            {search ? "No courses match your search." : "You are not enrolled in any courses yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-accent w-full" style={{ opacity: 0.5 + course.progress / 200 }} />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-accent text-white rounded-xl flex items-center justify-center text-[10px] font-black shadow border border-slate-700 flex-shrink-0">
                    {course.code.substring(0, 3).toUpperCase()}
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                      course.status === "active"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                        : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>

                <div className="mb-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.code}</p>
                </div>
                <h3 className="text-base font-bold text-primary-text leading-tight mb-2 tracking-tight">{course.title}</h3>
                {course.description && (
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                )}
                {course.instructor_name && (
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={12} className="text-slate-400" />
                    <span className="text-[10px] text-slate-400 font-medium">{course.instructor_name}</span>
                  </div>
                )}

                {/* Progress */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                    <span className="text-[10px] font-black text-accent">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                      className="bg-accent h-full rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <CheckCircle size={11} />
                      <span className="text-[9px] font-bold uppercase tracking-wider">
                        {course.submitted_assignments}/{course.total_assignments} submitted
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
