import React from "react";

interface DashboardShellProps {
  role: "student" | "instructor" | "admin";
  children: React.ReactNode;
}

export default function DashboardShell({ role, children }: DashboardShellProps) {
  // For instructor — the layout.tsx handles sidebar, so just render children
  if (role === "instructor") {
    return <div className="space-y-6 animate-fade-in">{children}</div>;
  }

  // For student/admin — fallback to a basic centered layout
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
