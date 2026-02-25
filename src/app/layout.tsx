import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ConditionalShell from "@/components/layout/ConditionalShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GradeFlow – Intelligent Academic Management System",
  description:
    "A production-grade academic management platform for universities. Powered by AI analytics, institutional design, and enterprise-grade architecture.",
  keywords: [
    "academic management",
    "LMS",
    "university platform",
    "student portal",
    "grade analytics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans overflow-x-hidden min-h-screen`}
        style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
      >
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
