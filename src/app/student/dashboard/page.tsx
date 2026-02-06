import DashboardShell from "@/components/dashboard/DashboardShell";
import { TrendingUp, Calendar, Award } from "lucide-react";

export default function StudentDashboard() {
  return (
    <DashboardShell role="student">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 animated-gradient">
        <div className="relative z-10 text-white">
          <h3 className="text-2xl font-bold mb-2">Welcome back, Alex! 👋</h3>
          <p className="text-white/90 mb-4">
            You&apos;re on a 12-day learning streak. Keep it up!
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
              <span className="text-xl">🔥</span>
              <span className="font-semibold">12 Days</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
              <span className="text-xl">⭐</span>
              <span className="font-semibold">Level 8</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5">
              <span className="text-xl">🏆</span>
              <span className="font-semibold">Top 10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Courses", val: "6", sub: "+2 new", bar: 75, col: "from-indigo-500 to-purple-500" },
          { label: "Completed", val: "24", sub: "+5", bar: 80, col: "from-emerald-500 to-cyan-500" },
          { label: "Avg Grade", val: "A-", sub: "+3%", bar: 88, col: "from-amber-500 to-orange-500" },
          { label: "XP Points", val: "2,450", sub: "+150", bar: 65, col: "from-rose-500 to-pink-500" },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 stat-card cursor-pointer hover:scale-105 transition-transform bg-background-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-secondary text-sm">{stat.label}</span>
              <span className="text-emerald-400 text-xs">{stat.sub}</span>
            </div>
            <p className="text-3xl font-bold">{stat.val}</p>
            <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${stat.col} rounded-full`}
                style={{ width: `${stat.bar}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grade Analytics */}
        <div className="glass-card p-6 bg-background-card">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold">Grade Analytics</h4>
            <select className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:border-indigo-500 text-text-primary">
              <option>This Semester</option>
              <option>Last Semester</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="flex items-end gap-3 h-40">
            {[ 
               { name: "Math", h: 85, c: "indigo" },
               { name: "CS", h: 92, c: "purple" },
               { name: "Phy", h: 78, c: "cyan" },
               { name: "Eng", h: 88, c: "amber" },
               { name: "Hist", h: 95, c: "rose" },
               { name: "Bio", h: 82, c: "emerald" }
            ].map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-full bg-gradient-to-t from-${d.c}-600 to-${d.c}-400 rounded-t-lg chart-bar hover:opacity-80 transition-opacity`} style={{ height: `${d.h}%` }}></div>
                    <span className="text-xs text-text-secondary">{d.name}</span>
                </div>
            ))}
          </div>
        </div>

        {/* Skill Mastery */}
        <div className="glass-card p-6 bg-background-card">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-semibold">Skill Mastery</h4>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              +12% this week
            </span>
          </div>
          <div className="space-y-4">
            {[
              { name: "Problem Solving", val: 92, c: "indigo", t: "purple" },
              { name: "Critical Thinking", val: 85, c: "purple", t: "pink" },
              { name: "Data Analysis", val: 78, c: "cyan", t: "blue" },
              { name: "Communication", val: 88, c: "amber", t: "orange" },
            ].map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span className={`text-${skill.c}-400`}>{skill.val}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full w-[${skill.val}%] bg-gradient-to-r from-${skill.c}-500 to-${skill.t}-500 rounded-full`}
                    style={{ width: `${skill.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Row */}
       <div className="grid lg:grid-cols-3 gap-6">
         {/* Upcoming */}
         <div className="glass-card p-6 bg-background-card">
           <h4 className="font-semibold mb-4 flex items-center gap-2">
             <Calendar className="w-5 h-5 text-amber-400" /> Upcoming
           </h4>
           <div className="space-y-3">
             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
               <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-sm">2h</div>
               <div className="flex-1">
                 <p className="text-sm font-medium">Physics Quiz</p>
                 <p className="text-xs text-text-secondary">Chapter 5 - Forces</p>
               </div>
             </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
               <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">1d</div>
               <div className="flex-1">
                 <p className="text-sm font-medium">Math Assignment</p>
                 <p className="text-xs text-text-secondary">Calculus Problems</p>
               </div>
             </div>
           </div>
         </div>
         
         {/* Recent Activity */}
         <div className="glass-card p-6 bg-background-card">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-indigo-400" /> Recent Activity
            </h4>
            <div className="space-y-3">
               {[
                 { action: "Completed", item: "Chapter 4 Quiz", time: "2 hours ago", color: "emerald", dot: "emerald-400" },
                 { action: "Earned", item: "Quick Learner badge", time: "5 hours ago", color: "indigo", dot: "indigo-400" },
                 { action: "Submitted", item: "Math HW #12", time: "Yesterday", color: "purple", dot: "purple-400" }
               ].map((act, i) => (
                 <div key={i} className="flex items-start gap-3">
                   <div className={`w-2 h-2 rounded-full bg-${act.dot} mt-2`}></div>
                   <div>
                     <p className="text-sm">{act.action} <span className={`text-${act.color}-400`}>{act.item}</span></p>
                     <p className="text-xs text-text-secondary">{act.time}</p>
                   </div>
                 </div>
               ))}
            </div>
         </div>
         
         {/* Achievements */}
         <div className="glass-card p-6 bg-background-card">
           <h4 className="font-semibold mb-4 flex items-center gap-2">
             <Award className="w-5 h-5 text-amber-400" /> Achievements
           </h4>
           <div className="grid grid-cols-4 gap-2">
             {["🏆","🔥","💯","⭐","🤝","🦉"].map((emoji, i) => (
                <div key={i} className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform">
                  {emoji}
                </div>
             ))}
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl cursor-pointer opacity-50">🔒</div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl cursor-pointer opacity-50">🔒</div>
           </div>
         </div>
       </div>

    </DashboardShell>
  );
}
