import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
           <Link href="/student/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
           </Link>
           <h1 className="text-3xl font-bold">Detailed Analytics</h1>
           <p className="text-text-secondary mt-2">Deep dive into your learning patterns and performance.</p>
        </div>

        <div className="gradient-border p-8 bg-background-card">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Large Chart */}
            <div className="lg:col-span-2 glass-card p-6 bg-background-card">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-semibold">Platform Engagement</h4>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium">Day</button>
                  <button className="px-3 py-1.5 rounded-lg text-text-secondary text-sm font-medium hover:bg-white/5">Week</button>
                  <button className="px-3 py-1.5 rounded-lg text-text-secondary text-sm font-medium hover:bg-white/5">Month</button>
                </div>
              </div>
              <div className="relative h-64 w-full">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="engagementGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="engagementGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  {[40, 80, 120, 160].map(y => (
                      <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  ))}

                  {/* Charts */}
                  <path d="M0 160 Q120 140, 170 120 T290 100 T400 80 T520 60 T600 50 L600 180 L0 180 Z" fill="url(#engagementGradient1)" />
                  <path d="M0 160 Q120 140, 170 120 T290 100 T400 80 T520 60 T600 50" fill="none" stroke="#6366f1" strokeWidth="2" />

                  <path d="M0 170 Q120 160, 170 145 T290 130 T400 115 T520 100 T600 85 L600 180 L0 180 Z" fill="url(#engagementGradient2)" />
                  <path d="M0 170 Q120 160, 170 145 T290 130 T400 115 T520 100 T600 85" fill="none" stroke="#a855f7" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex justify-center gap-6 mt-4">
               <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div><span className="text-sm text-text-secondary">Active Users</span>
               </div>
               <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div><span className="text-sm text-text-secondary">Course Views</span>
               </div>
              </div>
            </div>

            {/* Side Stats */}
            <div className="space-y-4">
              {[
                { label: "Completion Rate", val: 85, sub: "+5% from last month", col: "cyan" },
                { label: "Engagement Score", val: 75, sub: "+12% from last month", col: "purple" },
                { label: "Satisfaction", val: 90, sub: "Based on 2.4k reviews", col: "pink" }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-5 bg-background-card">
                   <div className="flex items-center gap-4">
                     <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="176" strokeDashoffset={176 - (176 * stat.val)/100} className={`text-${stat.col}-500`} />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{stat.val}%</span>
                     </div>
                     <div>
                       <p className="font-semibold">{stat.label}</p>
                       <p className="text-sm text-text-secondary">{stat.sub}</p>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
