"use client";

import { useState } from "react";
import { Download, FileText, BarChart2, Calendar, Filter } from "lucide-react";

const REPORT_TYPES = [
    { id: "student-performance", label: "Student Performance Report", desc: "Individual grades, CGPA, attendance across departments", icon: BarChart2 },
    { id: "department-summary", label: "Department Summary", desc: "Aggregate stats, GPA averages, course completion rates", icon: FileText },
    { id: "university-report", label: "University Annual Report", desc: "Full institutional report for governing bodies", icon: FileText },
    { id: "drop-risk", label: "At-Risk Student Report", desc: "All students flagged by AI drop-risk predictor", icon: BarChart2 },
    { id: "instructor-performance", label: "Instructor Performance", desc: "Course ratings, student feedback, outcomes", icon: BarChart2 },
];

export default function AdminExportPage() {
    const [selectedType, setSelectedType] = useState("student-performance");
    const [format, setFormat] = useState<"csv" | "pdf" | "xlsx">("csv");
    const [exporting, setExporting] = useState(false);
    const [done, setDone] = useState(false);

    function handleExport() {
        setExporting(true);
        setDone(false);
        setTimeout(() => {
            setExporting(false);
            setDone(true);
            setTimeout(() => setDone(false), 4000);
        }, 2000);
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-serif), serif", color: "var(--text-primary)" }}>
                    Export Reports
                </h1>
                <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                    Generate and export university reports in CSV, XLSX, or PDF format
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Report Type Selection */}
                <div className="institutional-card p-6">
                    <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Report Type</h3>
                    <div className="space-y-2">
                        {REPORT_TYPES.map((rt) => (
                            <label
                                key={rt.id}
                                className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all"
                                style={{
                                    background: selectedType === rt.id ? "var(--academic-blue-dim, rgba(11,31,59,0.06))" : "var(--hover-bg)",
                                    border: `1.5px solid ${selectedType === rt.id ? "var(--academic-blue)" : "transparent"}`,
                                }}
                            >
                                <input
                                    type="radio"
                                    name="reportType"
                                    value={rt.id}
                                    checked={selectedType === rt.id}
                                    onChange={() => setSelectedType(rt.id)}
                                    className="mt-0.5 flex-shrink-0 accent-[#0B1F3B]"
                                />
                                <div>
                                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{rt.label}</p>
                                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{rt.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Export Configuration */}
                <div className="space-y-4">
                    <div className="institutional-card p-6">
                        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                            Filters & Date Range
                        </h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-secondary)" }}>
                                        From Date
                                    </label>
                                    <input type="date" className="input-field" defaultValue="2025-01-01" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-secondary)" }}>
                                        To Date
                                    </label>
                                    <input type="date" className="input-field" defaultValue="2025-02-28" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-secondary)" }}>
                                    Department
                                </label>
                                <select className="input-field">
                                    <option>All Departments</option>
                                    <option>Computer Science</option>
                                    <option>Electronics</option>
                                    <option>Mechanical</option>
                                    <option>Civil</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium block mb-1" style={{ color: "var(--text-secondary)" }}>
                                    Semester
                                </label>
                                <select className="input-field">
                                    <option>Autumn 2025</option>
                                    <option>Spring 2025</option>
                                    <option>Autumn 2024</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="institutional-card p-6">
                        <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Export Format</h3>
                        <div className="flex gap-3 mb-5">
                            {(["csv", "xlsx", "pdf"] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFormat(f)}
                                    className="flex-1 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all"
                                    style={{
                                        background: format === f ? "var(--academic-blue)" : "var(--hover-bg)",
                                        color: format === f ? "white" : "var(--text-secondary)",
                                    }}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleExport}
                            disabled={exporting}
                            className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                            style={{
                                background: done ? "var(--slate-green)" : "var(--academic-blue)",
                                opacity: exporting ? 0.7 : 1,
                            }}
                        >
                            {exporting ? (
                                <>
                                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                    Generating Report…
                                </>
                            ) : done ? (
                                <>✓ Download Ready</>
                            ) : (
                                <>
                                    <Download className="w-4 h-4" />
                                    Generate & Download {format.toUpperCase()}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
