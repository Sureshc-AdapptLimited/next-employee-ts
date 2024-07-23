import { prisma } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

interface EmployeeWhereUniqueInput {
  id?: string | null;
  email?: string | null;
}
// Handle POST requests
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, id } = await req.json();
    // const existingEmployee = await prisma.employee.findUnique({
    //   where: { email },
    // });
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        email,
        NOT: { id },
      },
    });
    console.error("existingEmployee", existingEmployee);
    if (existingEmployee) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
