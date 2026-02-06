import { 
  BarChart2, 
  BrainCircuit, 
  Trophy, 
  Calendar, 
  Shield, 
  Users 
} from "lucide-react";

const features = [
  {
    title: "Smart Analytics",
    desc: "Real-time performance tracking with beautiful visualizations and actionable insights.",
    icon: BarChart2,
    color: "text-indigo-400",
  },
  {
    title: "AI-Powered Insights",
    desc: "Personalized recommendations and predictive analytics powered by machine learning.",
    icon: BrainCircuit,
    color: "text-purple-400",
  },
  {
    title: "Gamified Learning",
    desc: "Badges, streaks, achievements, and leaderboards to keep students motivated.",
    icon: Trophy,
    color: "text-cyan-400",
  },
  {
    title: "Smart Calendar",
    desc: "Integrated scheduling with deadline tracking and automatic reminders.",
    icon: Calendar,
    color: "text-amber-400",
  },
  {
    title: "Role-Based Access",
    desc: "Customized dashboards and permissions for students, instructors, and admins.",
    icon: Users,
    color: "text-rose-400",
  },
  {
    title: "Secure & Private",
    desc: "Enterprise-grade security with FERPA compliance and data encryption.",
    icon: Shield,
    color: "text-emerald-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Powerful tools designed for modern education, from AI-driven
            insights to gamified learning experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="gradient-border p-6 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-background-card"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
