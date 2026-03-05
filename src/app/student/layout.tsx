"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = api.auth.getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        const user = api.auth.getUser();
        if (!user || user.role !== "student") {
            router.push("/login");
            return;
        }

        // Verify token is still valid with backend
        api.auth.me().then((me) => {
            if (me.role !== "student") {
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

    if (!authorized) return null;

    return (
        <DashboardShell role="student">
            {children}
        </DashboardShell>
    );
}
