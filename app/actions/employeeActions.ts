"use server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getEmployees() {
  try {
    return await prisma.employee.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error: any) {
    throw new Error("Error getting employees: " + error.message);
  }
}

export async function createEmployee(data: any) {
  try {
    await prisma.employee.create({
      data,
    });
    revalidatePath("/");
    return { message: "Employee created" };
  } catch (error: any) {
    throw new Error("Error creating employee: " + error.message);
  }
}
export async function updateEmployee(id: string, data: any) {
  try {
    return await prisma.employee.update({
      where: { id },
      data,
    });
  } catch (error: any) {
    throw new Error("Error updating employee: " + error.message);
  }
}

export async function deleteEmployee(id: string) {
  try {
    await prisma.employee.delete({
      where: { id },
    });
    revalidatePath("/");
    return { message: "Employee deleted" };
  } catch (error: any) {
    throw new Error("Error deleting employee: " + error.message);
  }
}
