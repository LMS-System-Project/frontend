import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
        { id: "s1", name: "Alexandra Vance", email: "alexandra@edu.gradeflow.com", gpa: 8.7, attendance: "94%", risk: "Low" },
        { id: "s2", name: "Marcus Thorne", email: "marcus@edu.gradeflow.com", gpa: 7.2, attendance: "88%", risk: "Medium" },
        { id: "s3", name: "Elena Rossi", email: "elena@edu.gradeflow.com", gpa: 9.4, attendance: "98%", risk: "Low" },
        { id: "s4", name: "Jia Li", email: "jia@edu.gradeflow.com", gpa: 5.8, attendance: "72%", risk: "High" },
    ]);
}
