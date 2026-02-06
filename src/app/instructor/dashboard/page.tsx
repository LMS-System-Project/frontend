import DashboardShell from "@/components/dashboard/DashboardShell";
import { Users, BookOpen, Clock, Activity, ArrowRight, BrainCircuit } from "lucide-react";

export default function InstructorDashboard() {
  return (
    <DashboardShell role="instructor">
      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Courses", val: "4", icon: BookOpen, col: "indigo" },
          { label: "Total Students", val: "156", icon: Users, col: "emerald" },
          { label: "Pending Reviews", val: "23", icon: Clock, col: "amber" },
          { label: "Class Average", val: "B+", icon: Activity, col: "rose" },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 stat-card cursor-pointer bg-background-card hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-${stat.col}-500/20 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.col}-400`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.val}</p>
                <p className="text-xs text-text-secondary">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Your Courses</h4>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-2">
            <span>+ Create Course</span>
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
           {[
             { code: "CS 301", title: "Data Structures", desc: "Advanced algorithms", students: 42, col: "indigo" },
             { code: "CS 201", title: "Web Development", desc: "Modern frontend", students: 38, col: "emerald" },
             { code: "CS 401", title: "Machine Learning", desc: "Intro to ML", students: 36, col: "amber" },
             { code: "CS 350", title: "Cybersecurity", desc: "Network security", students: 40, col: "rose" }
           ].map((course, i) => (
             <div key={i} className="glass-card p-5 card-hover cursor-pointer bg-background-card">
               <div className="flex items-start justify-between mb-4">
                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${course.col}-500 to-${course.col}-600 flex items-center justify-center text-white font-bold`}>
                   {course.code.split(' ')[0]}
                 </div>
                 <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">Active</span>
               </div>
               <h5 className="font-semibold mb-1">{course.code}: {course.title}</h5>
               <p className="text-sm text-text-secondary mb-4">{course.desc}</p>
               <div className="flex items-center justify-between text-sm">
                 <span className="text-text-secondary">{course.students} students</span>
                 <span className="text-indigo-400 flex items-center gap-1">View <ArrowRight className="w-4 h-4" /></span>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-6 border border-purple-500/30 bg-background-card">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl animated-gradient flex items-center justify-center flex-shrink-0">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              AI Insights <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">New</span>
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              Based on recent performance data, 12 students may need additional support in Chapter 6: Recursion. 
              Consider scheduling office hours or providing extra practice materials.
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/30 transition-colors">
                View Details
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-white/5 text-text-secondary text-sm font-medium hover:bg-white/10 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
