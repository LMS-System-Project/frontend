"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const DASHBOARD_PREFIXES = ["/student", "/instructor", "/admin"];

export default function ConditionalShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isDashboard = DASHBOARD_PREFIXES.some((prefix) =>
        pathname?.startsWith(prefix)
    );

    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-24">{children}</main>
            <Footer />
        </div>
    );
}
