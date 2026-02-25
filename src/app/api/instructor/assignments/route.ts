import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
        { id: "a1", course_id: "1", title: "Neural Networks Quiz", due_date: "2025-03-01", submissions: 38 },
        { id: "a2", course_id: "2", title: "Blockchain Architecture Review", due_date: "2025-03-05", submissions: 12 },
        { id: "a3", course_id: "1", title: "Final Research Paper", due_date: "2025-05-15", submissions: 0 },
    ]);
}
