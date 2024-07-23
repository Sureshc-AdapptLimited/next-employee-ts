import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db";

const fetchEmployees = async (filters: {
  fromDate?: string;
  toDate?: string;
  search?: string;
}) => {
  const { fromDate, toDate, search } = filters;
  let query: any = {};

  const parseDate = (dateString: string | undefined): Date | undefined => {
    if (!dateString) return undefined;
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  };

  const normalizeDateStart = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const normalizeDateEnd = (date: Date) => {
    date.setHours(23, 59, 59, 999);
    return date;
  };

  const startDate = parseDate(fromDate);
  const endDate = parseDate(toDate);

  if (fromDate && toDate) {
    query.createdAt = {
      gte: startDate ? normalizeDateStart(startDate) : undefined,
      lte: endDate ? normalizeDateEnd(endDate) : undefined,
    };
  }

  if (search) {
    query.OR = [
      { first_name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const employees = await prisma.employee.findMany({
    where: query,
    orderBy: { createdAt: "desc" },
  });

  return {
    employees: employees.map((employee) => ({
      id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      point: employee.point.toNumber(),
      point_system: employee.point_system,
      remark: employee.remark,
      added_by: employee.added_by,
      createdAt: employee.createdAt.toISOString(),
      updatedAt: employee.updatedAt.toISOString(),
    })),
    totalCount: employees.length,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fromDate, toDate, search } = req.query;
  console.log("handler", req.query);
  const filters = {
    fromDate: Array.isArray(fromDate) ? fromDate[0] : fromDate,
    toDate: Array.isArray(toDate) ? toDate[0] : toDate,
    search: Array.isArray(search) ? search[0] : search,
  };

  //   const data = await fetchEmployees(filters);
  //   res.status(200).json(data);
}
