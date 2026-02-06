"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<"student" | "instructor" | "admin">("student");

  return (
    <section id="dashboards" className="py-24 relative hero-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
            Role-Based Dashboards
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Designed for <span className="gradient-text">Everyone</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Tailored experiences for students, instructors, and administrators.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {(["student", "instructor", "admin"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setActiveTab(role)}
              className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
                activeTab === role
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "text-text-secondary hover:bg-white/5"
              }`}
            >
              {role === "student" && "🎒 "}
              {role === "instructor" && "👨‍🏫 "}
              {role === "admin" && "🛠️ "}
              {role}
            </button>
          ))}
        </div>

        {/* Preview Content */}
        <div className="dashboard-panel min-h-[400px]">
          <div className="gradient-border p-8 bg-background-card">
            <div className="text-center space-y-6 py-12">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-4xl">
                 {activeTab === "student" && "🎒"}
                 {activeTab === "instructor" && "👨‍🏫"}
                 {activeTab === "admin" && "🛠️"}
              </div>
              <h3 className="text-2xl font-bold capitalize">{activeTab} Dashboard</h3>
              <p className="text-text-secondary max-w-md mx-auto">
                Access your personalized {activeTab} tools, tracking, and insights.
                This is a preview of the full dashboard experience.
              </p>
              
              <Link 
                href={`/${activeTab}/dashboard`}
                className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-xl font-semibold text-white"
              >
                Launch {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
