"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token = api.auth.getToken();
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    return (
        <DashboardShell role="instructor">
            {children}
        </DashboardShell>
    );
}
