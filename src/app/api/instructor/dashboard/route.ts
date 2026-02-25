import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        active_courses: 4,
        total_students: 128,
        pending_reviews: 12,
        avg_attendance: "88%",
        recent_activity: [
            { id: 1, action: "Assignment Graded", target: "Neural Networks Quiz", time: "2h ago" },
            { id: 2, action: "Course Updated", target: "Blockchain Architecture", time: "5h ago" },
            { id: 3, action: "New Enrollment", target: "Artificial Intelligence", time: "1d ago" }
        ]
    });
}
