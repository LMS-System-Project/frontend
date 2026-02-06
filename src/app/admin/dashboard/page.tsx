import DashboardShell from "@/components/dashboard/DashboardShell";
import { Users, BookOpen, Clock, Activity, TrendingUp, Check, X } from "lucide-react";

export default function AdminDashboard() {
  return (
    <DashboardShell role="admin">
       {/* System Health Banner */}
       <div className="glass-card p-4 border border-emerald-500/30 bg-background-card/50">
          <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="font-medium text-emerald-400">All Systems Operational</span>
           </div>
           <span className="text-sm text-text-secondary">Last checked: 2 min ago</span>
          </div>
       </div>

       {/* Main Stats */}
       <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Users", val: "5,284", sub: "+12%", col: "indigo" },
          { label: "Active Courses", val: "127", sub: "+8%", col: "emerald" },
          { label: "Active Sessions", val: "892", sub: "+23%", col: "amber" },
          { label: "Uptime", val: "99.9%", sub: "99.9%", col: "rose" },
        ].map((stat, i) => (
           <div key={i} className="glass-card p-5 stat-card cursor-pointer bg-background-card">
             <div className="flex items-center justify-between mb-3">
               <div className={`w-10 h-10 rounded-xl bg-${stat.col}-500/20 flex items-center justify-center`}>
                 <Activity className={`w-5 h-5 text-${stat.col}-400`} />
               </div>
               <span className="text-xs text-emerald-400">{stat.sub}</span>
             </div>
             <p className="text-3xl font-bold mb-1">{stat.val}</p>
             <p className="text-xs text-text-secondary">{stat.label}</p>
           </div>
        ))}
       </div>

       {/* Charts Row */}
       <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 bg-background-card">
            <h4 className="font-semibold mb-4">User Growth</h4>
            <div className="relative h-44 w-full flex items-end justify-between px-2">
                 {/* Simulated Area Chart using div bars for simplicity as explicit SVG is long */}
                 {[30, 45, 35, 60, 50, 75, 65, 90].map((h, i) => (
                    <div key={i} className="w-8 bg-indigo-500/30 rounded-t-sm hover:bg-indigo-500/50 transition-colors" style={{ height: `${h}%`}}></div>
                 ))}
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
            </div>
          </div>
          
          <div className="glass-card p-6 bg-background-card">
            <h4 className="font-semibold mb-4">User Distribution</h4>
            <div className="flex items-center gap-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-white/5" strokeWidth="12" /> 
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="12" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="40" /> 
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="12" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="210" className="opacity-70" /> 
                  </svg>
                </div>
                <div className="space-y-3 flex-1">
                 {[
                   { label: "Students", val: "4,521 (85%)", col: "indigo-500" },
                   { label: "Instructors", val: "689 (13%)", col: "purple-500" },
                   { label: "Admins", val: "74 (2%)", col: "cyan-500" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                     <div className={`w-3 h-3 rounded-full bg-${item.col}`}></div>
                     <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium">{item.val}</span>
                   </div>
                 ))}
                </div>
            </div>
          </div>
       </div>

       {/* Pending Approvals */}
       <div className="glass-card p-6 bg-background-card">
         <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Pending Approvals</h4>
          <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">3 pending</span>
         </div>
         <div className="space-y-3">
           {[
             { title: "Quantum Computing 101", by: "Dr. Sarah Lee", type: "Course" },
             { title: "AI Ethics & Society", by: "Prof. Michael Park", type: "Course" }
           ].map((item, i) => (
             <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                   <BookOpen className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-sm font-medium">{item.title}</p>
                   <p className="text-xs text-text-secondary">By {item.by}</p>
                 </div>
               </div>
               <div className="flex gap-2">
                 <button className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                   <Check className="w-4 h-4" />
                 </button>
                 <button className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors">
                   <X className="w-4 h-4" />
                 </button>
               </div>
             </div>
           ))}
         </div>
       </div>
    </DashboardShell>
  );
}
