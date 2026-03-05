"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = api.auth.getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        // Verify the user is actually an instructor
        const user = api.auth.getUser();
        if (!user || (user.role !== "instructor" && user.role !== "teacher")) {
            router.push("/login");
            return;
        }

        // Optionally verify with backend that token is still valid
        api.auth.me().then((me) => {
            if (me.role !== "instructor") {
                api.auth.logout();
                router.push("/login");
            } else {
                setAuthorized(true);
            }
        }).catch(() => {
            api.auth.logout();
            router.push("/login");
        });
    }, [router]);

    if (!authorized) {
        return null; // Don't render until we verify
    }

    return (
        <DashboardShell role="instructor">
            {children}
        </DashboardShell>
    );
}
