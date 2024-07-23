import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ employees }, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Error fetching employees" },
      { status: 500 }
    );
  }
}

// Handle POST request
export async function POST(req: Request) {
  try {
    //     const { firstname, lastname, email, system, remarks, addedby } =
    //       await req.json();
    const data = await req.json();
    const emp = data.formData;
    console.error("@@@@@", emp);
    const newEmployee = await prisma.employee.create({
      data: {
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        point_system: parseInt(emp.point_system),
        remark: emp.remark,
        added_by: emp.added_by,
      },
    });

    return NextResponse.json({ newEmployee }, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json(
      { error: "Error creating employee" },
      { status: 500 }
    );
  }
}

// Handle PUT request

export async function PUT(req: Request) {
  try {
    const { formData } = await req.json();
    const { id, first_name, last_name, email, point_system, remark, added_by } =
      formData;
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        point_system: parseInt(point_system),
        remark: remark,
        added_by: added_by,
      },
      // data: { first_name, last_name, email, point_system, remark, added_by },
    });
    return NextResponse.json({ updatedEmployee }, { status: 200 });
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { error: "Error creating employee" },
      { status: 500 }
    );
  }
}
// Handle DELETE request
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.employee.delete({ where: { id } });
    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { error: "Error deleting employee" },
      { status: 500 }
    );
  }
}
