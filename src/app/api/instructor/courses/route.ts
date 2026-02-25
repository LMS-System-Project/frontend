import { NextResponse } from "next/server";

const mockCourses = [
    { id: "1", code: "CS301", title: "Artificial Intelligence", description: "Advanced study of neural networks and machine learning models in modern computation.", status: "active", student_count: 42 },
    { id: "2", code: "BS204", title: "Blockchain Architecture", description: "Comprehensive analysis of decentralized ledger technologies and smart contract governance.", status: "active", student_count: 38 },
    { id: "3", code: "DS102", title: "Data Structures", description: "Fundamental organizational patterns for complex information matrices.", status: "draft", student_count: 28 },
    { id: "4", code: "ML501", title: "Advanced Neural Networks", description: "Deep learning logic and backpropagation protocols for elite cognitive systems.", status: "active", student_count: 20 },
];

export async function GET() {
    return NextResponse.json(mockCourses);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newCourse = {
        id: Math.random().toString(36).substr(2, 9),
        student_count: 0,
        status: "active",
        ...body
    };
    return NextResponse.json(newCourse);
}
