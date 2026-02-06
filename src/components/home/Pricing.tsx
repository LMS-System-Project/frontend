import Link from "next/link";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative hero-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="gradient-border p-8 hover:-translate-y-2 transition-transform bg-background-card">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-text-secondary">Perfect for individuals</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-text-secondary">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Up to 3 courses", "Basic analytics", "Progress tracking", "AI Insights (Limited)"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className={i > 2 ? "text-text-secondary" : ""}>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/login?mode=register"
              className="block w-full py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/10 transition-colors text-center"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="relative gradient-border p-8 hover:-translate-y-2 transition-transform border-2 border-indigo-500/50 bg-background-card">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold text-white">
              Most Popular
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-text-secondary">For growing institutions</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold">$29</span>
              <span className="text-text-secondary">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Unlimited courses", "Advanced analytics", "AI-powered insights", "Priority support"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/login?mode=register"
              className="block w-full btn-primary py-3 rounded-xl font-semibold text-white text-center"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="gradient-border p-8 hover:-translate-y-2 transition-transform bg-background-card">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-text-secondary">For large organizations</p>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold">Custom</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantee"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="block w-full py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/10 transition-colors text-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
