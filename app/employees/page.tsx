import { prisma } from '@/lib/db';
import Table from './table'
import EmployeeAddForm from './employeeform';
import FilterComponent from '../components/employees/EmployeeFilter';
import { Employee } from './types';
const Home = async ({ searchParams }: { searchParams: { fromDate?: string; toDate?: string; search?: string, page?: string, pageSize?: string } }) => {
    const { fromDate, toDate, search, page = "1", pageSize = "5" } = searchParams || {};

    // Utility function to parse dates
    const parseDate = (dateString: string | undefined): Date | undefined => {
        if (!dateString) return undefined;
        const parsedDate = new Date(dateString);
        // Ensure the date is valid
        return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    };

    // Adjust date to the beginning or end of the day
    const normalizeDateStart = (date: Date) => {
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const normalizeDateEnd = (date: Date) => {
        date.setHours(23, 59, 59, 999);
        return date;
    };

    // Function to fetch employees with optional filters
    const getEmployees = async (filter: {
        fromDate?: string;
        toDate?: string;
        search?: string;
        page?: number;
        pageSize?: number;
    }) => {
        const { fromDate, toDate, search, page = 1, pageSize = 5 } = filter;
        let query: any = {};

        const startDate = parseDate(fromDate);
        const endDate = parseDate(toDate);

        if (fromDate && toDate) {
            query.createdAt = {
                gte: startDate ? normalizeDateStart(startDate) : undefined,
                lte: endDate ? normalizeDateEnd(endDate) : undefined,
            };
        }

        // Exact matching for name or email
        if (search) {
            query.OR = [
                { first_name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        // return await prisma.employee.findMany({
        //     where: query,
        //     orderBy: { createdAt: 'desc' },
        // });
        const [employees, totalCount] = await prisma.$transaction([
            prisma.employee.findMany({
                where: query,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            prisma.employee.count({ where: query }),
        ]);
        return { employees, totalCount };

    };
    const employeesData = await getEmployees({ fromDate, toDate, search, page: Number(page), pageSize: Number(pageSize) });
    // console.log("=====>>>>>", employeesData)
    // const totalCount = employees.length;
    const formattedEmployees: Employee[] = employeesData.employees.map((employee) => ({
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
    }));

    return (
        <div className="container mx-auto">
            <EmployeeAddForm mtype="ADD" />
            <div className="mt-8"></div>
            <FilterComponent />
            <Table employees={formattedEmployees} totalCount={employeesData.totalCount} page={Number(page)} pageSize={Number(pageSize)} />
        </div>
    );

};
export default Home;

/** Method 2 */
// import { prisma } from '@/lib/db';
// import Table from './table'
// import EmployeeAddForm from './employeeform';
// import FilterComponent from '../components/employees/EmployeeFilter';
// import { Employee } from './types';

// const Home = async ({ searchParams }: { searchParams: { fromDate?: string; toDate?: string; search?: string } }) => {
//     const { fromDate, toDate, search } = searchParams || {};

//     // Utility function to parse dates
//     const parseDate = (dateString: string | undefined): Date | undefined => {
//         if (!dateString) return undefined;
//         const parsedDate = new Date(dateString);
//         // Ensure the date is valid
//         return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
//     };

//     // Adjust date to the beginning or end of the day
//     const normalizeDateStart = (date: Date) => {
//         date.setHours(0, 0, 0, 0);
//         return date;
//     };

//     const normalizeDateEnd = (date: Date) => {
//         date.setHours(23, 59, 59, 999);
//         return date;
//     };

//     // Function to fetch employees with optional filters
//     const getEmployees = async (filter: {
//         fromDate?: string;
//         toDate?: string;
//         search?: string;
//     }) => {
//         const { fromDate, toDate, search } = filter;
//         let query: any = {};

//         const startDate = parseDate(fromDate);
//         const endDate = parseDate(toDate);

//         if (fromDate && toDate) {
//             query.createdAt = {
//                 gte: startDate ? normalizeDateStart(startDate) : undefined,
//                 lte: endDate ? normalizeDateEnd(endDate) : undefined,
//             };
//         }

//         // Exact matching for name or email
//         // if (search) {
//         //     query.OR = [
//         //         { first_name: { equals: search, mode: 'insensitive' } },
//         //         { email: { equals: search, mode: 'insensitive' } },
//         //     ];
//         // }
//         if (search) {
//             query.OR = [
//                 { first_name: { contains: search, mode: 'insensitive' } },
//                 { email: { contains: search, mode: 'insensitive' } },
//             ];
//         }

//         return await prisma.employee.findMany({
//             where: query,
//             orderBy: { createdAt: 'desc' },
//         });
//     };

//     const employees = await getEmployees({ fromDate, toDate, search });
//     const totalCount = employees.length;
//     const formattedEmployees: Employee[] = employees.map((employee) => ({
//         id: employee.id,
//         first_name: employee.first_name,
//         last_name: employee.last_name,
//         email: employee.email,
//         point: employee.point.toNumber(),
//         point_system: employee.point_system,
//         remark: employee.remark,
//         added_by: employee.added_by,
//         createdAt: employee.createdAt.toISOString(),
//         updatedAt: employee.updatedAt.toISOString(),
//     }));

//     return (
//         <div className="container mx-auto">
//             <EmployeeAddForm mtype="ADD" />
//             <div className="mt-8"></div>
//             <FilterComponent />
//             <Table employees={formattedEmployees} totalCount={totalCount} />
//         </div>
//     );
// };

// export default Home;


/** Method 1 */
// import React from 'react'
// import Table from './table'
// import EmployeeTableContainer from './EmployeeTableContainer'
// import { prisma } from '@/lib/db';
// import EmployeeAddForm from './employeeform';

// const Home = async () => {
//     const allEntities = await prisma.employee.findMany();
//     return (
//         <div className="container mx-auto">
//             <EmployeeAddForm mtype="ADD"></EmployeeAddForm>
//             <Table></Table>
//             {/* <EmployeeTableContainer></EmployeeTableContainer> */}
//         </div>
//     )
// }

// export default Home