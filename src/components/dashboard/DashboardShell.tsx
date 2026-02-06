import React from "react";
import Sidebar from "./Sidebar";

interface DashboardShellProps {
  role: "student" | "instructor" | "admin";
  children: React.ReactNode;
}

export default function DashboardShell({ role, children }: DashboardShellProps) {
  return (
    <div className="py-8">
       <div className="max-w-7xl mx-auto px-6">
        <div className="dashboard-panel">
          <div className="gradient-border p-8 bg-background-card min-h-[800px]">
            <div className="flex flex-col lg:flex-row gap-8">
              <Sidebar role={role} />
              <div className="flex-1 space-y-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
