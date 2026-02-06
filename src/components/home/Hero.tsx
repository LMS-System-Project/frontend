import Link from "next/link";
import { ArrowRight, Play, Award, Zap, Users, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center hero-gradient pt-10 pb-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-sm text-indigo-300">
                Now with AI-Powered Insights
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Learn Smarter, <span className="gradient-text">Track Better</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed max-w-lg">
              The next-generation learning management system with intelligent
              analytics, gamified progress tracking, and role-based dashboards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login?mode=register"
                className="btn-primary px-8 py-4 rounded-2xl text-lg font-semibold text-white pulse-glow flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/student/dashboard"
                className="px-8 py-4 rounded-2xl text-lg font-semibold border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                View Demo
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {/* Avatars */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-background-primary flex items-center justify-center text-xs font-bold text-white">JD</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-background-primary flex items-center justify-center text-xs font-bold text-white">SK</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-background-primary flex items-center justify-center text-xs font-bold text-white">ML</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-background-primary flex items-center justify-center text-xs font-bold text-white">+5k</div>
              </div>
              <div className="text-sm">
                 <div className="flex items-center gap-1 text-amber-400">
                    {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                 </div>
                <p className="text-text-secondary">Trusted by 50,000+ educators</p>
              </div>
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="relative hidden lg:block">
            <div className="gradient-border p-6 animate-float bg-background-card">
              <div className="space-y-4">
                {/* Mini Dashboard Preview Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">AJ</span>
                    </div>
                    <div>
                      <p className="font-semibold">Welcome back, Alex!</p>
                      <p className="text-sm text-text-secondary">
                        You're on a 12-day streak 🔥
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                    <span>Level 8</span>
                  </div>
                </div>

                {/* Progress Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Courses", val: 80, color: "stroke-indigo-500" },
                    { label: "Assignments", val: 70, color: "stroke-purple-500" },
                    { label: "Quizzes", val: 90, color: "stroke-cyan-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="glass-card p-3 text-center">
                      <div className="relative w-16 h-16 mx-auto">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                          <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="176" strokeDashoffset={176 - (176 * item.val)/100} className={item.color} />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                          {item.val}%
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Mini Chart */}
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">
                      Weekly Performance
                    </span>
                    <span className="text-xs text-emerald-400">+12%</span>
                  </div>
                  <div className="flex items-end gap-2 h-20">
                    {[40, 60, 45, 80, 65, 90, 100].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm transition-all duration-700 ${i===6 ? 'bg-gradient-to-t from-indigo-500 to-purple-500' : 'bg-indigo-500/50'}`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 glass-card p-3 animate-float-delay bg-background-card/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                   <div className="w-4 h-4 text-emerald-400">✓</div>
                </div>
                <div>
                  <p className="text-xs font-medium">Assignment Done!</p>
                  <p className="text-[10px] text-text-secondary">
                    Physics Quiz
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-card p-3 animate-float bg-background-card/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="text-2xl">🔥</div>
                <div>
                  <p className="text-xs font-bold text-amber-400">
                    12 Day Streak!
                  </p>
                  <p className="text-[10px] text-text-secondary">Keep it up!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
