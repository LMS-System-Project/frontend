"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function InstructorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <>
            {/* Hide the global Navbar + Footer via CSS — they render from the root layout */}
            <style jsx global>{`
        nav:first-child, footer { display: none !important; }
        main { padding-top: 0 !important; }
      `}</style>

            <div className="flex min-h-screen">
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                <main
                    className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-[72px]" : "ml-[260px]"
                        }`}
                    style={{ background: "var(--bg-primary)" }}
                >
                    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
