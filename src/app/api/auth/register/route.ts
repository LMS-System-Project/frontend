import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, full_name, role } = body;

        console.log("Mock API: Register attempt", { email, role });

        return NextResponse.json({
            access_token: "mock-register-token",
            user: {
                id: "mock-new-id",
                email: email,
                full_name: full_name || "New User",
                role: role || "student",
                department: "General"
            },
            role: role || "student"
        });
    } catch (error) {
        return NextResponse.json({ detail: "Invalid request" }, { status: 400 });
    }
}
