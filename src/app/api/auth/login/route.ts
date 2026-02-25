import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const normalizedEmail = email.trim().toLowerCase();

        console.log("Mock API: Login attempt", { email: normalizedEmail });

        // Mock Admin
        if (normalizedEmail === "admin@gradeflow.com" && password === "admin123") {
            return NextResponse.json({
                access_token: "mock-admin-token",
                user: {
                    id: "mock-admin-id",
                    email: "admin@gradeflow.com",
                    full_name: "Sneha Varghese",
                    role: "admin",
                    department: "Systems"
                },
                role: "admin"
            });
        }

        // Mock Teacher
        if (normalizedEmail === "teacher@gradeflow.com" || normalizedEmail === "instructor@gradeflow.com") {
            return NextResponse.json({
                access_token: "mock-teacher-token",
                user: {
                    id: "mock-teacher-id",
                    email: normalizedEmail,
                    full_name: "Lead Faculty",
                    role: "instructor",
                    department: "Computer Science"
                },
                role: "instructor"
            });
        }

        // Default Mock Student
        return NextResponse.json({
            access_token: "mock-student-token",
            user: {
                id: "mock-student-id",
                email: normalizedEmail,
                full_name: "Demo Student",
                role: "student",
                department: "Engineering"
            },
            role: "student"
        });
    } catch (error) {
        return NextResponse.json({ detail: "Invalid request" }, { status: 400 });
    }
}
