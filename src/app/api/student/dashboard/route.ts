import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        student: {
            name: "Alexandra Vance",
            rank: "#12 / 280",
            streak: "14-Day Study Streak 🔥"
        },
        stats: [
            { label: "Current GPA", value: "8.7", sub: "↑ 0.3 vs last sem" },
            { label: "Courses", value: "6", sub: "2 Labs in progress" },
            { label: "Attendance", value: "92%", sub: "Threshold: 75%" },
            { label: "Assigned", value: "3", sub: "Next due: 4h" },
        ],
        deadlines: [
            { title: "Neural Networks Quiz", detail: "Chapter 4: Backpropagation", timer: "2h 40m", priority: "high" },
            { title: "Database Lab Report", detail: "Query Optimization", timer: "1d", priority: "medium" },
            { title: "Blockhain Project", detail: "Smart Contract Review", timer: "3d", priority: "low" },
        ],
        cgpa_history: [
            { sem: "S1", cgpa: 7.2 },
            { sem: "S2", cgpa: 7.8 },
            { sem: "S3", cgpa: 8.1 },
            { sem: "S4", cgpa: 7.9 },
            { sem: "S5", cgpa: 8.4 },
            { sem: "S6", cgpa: 8.7 },
        ]
    });
}
