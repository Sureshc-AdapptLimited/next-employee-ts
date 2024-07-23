import { fetchEmployees } from '@/lib/fetchEmployees';
import HomeClient from '../components/HomeClient';
import { FilterProvider } from '../context/FilterContext';

// const fetchEmployees = async (searchParams: { fromDate?: string; toDate?: string; search?: string }) => {
//     const { fromDate, toDate, search } = searchParams || {};
//     console.log("search", search)
//     const parseDate = (dateString: string | undefined): Date | undefined => {
//         if (!dateString) return undefined;
//         const parsedDate = new Date(dateString);
//         return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
//     };

//     const normalizeDateStart = (date: Date) => {
//         date.setHours(0, 0, 0, 0);
//         return date;
//     };

//     const normalizeDateEnd = (date: Date) => {
//         date.setHours(23, 59, 59, 999);
//         return date;
//     };

//     const getEmployees = async (filter: { fromDate?: string; toDate?: string; search?: string }) => {
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
//     return employees.map((employee) => ({
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
// };

const Home = async ({ searchParams }: { searchParams: { fromDate?: string; toDate?: string; search?: string } }) => {
    // const { fromDate, toDate, search } = searchParams || {};

    // const parseDate = (dateString: string | undefined): Date | undefined => {
    //     if (!dateString) return undefined;
    //     const parsedDate = new Date(dateString);
    //     return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    // };

    // const normalizeDateStart = (date: Date) => {
    //     date.setHours(0, 0, 0, 0);
    //     return date;
    // };

    // const normalizeDateEnd = (date: Date) => {
    //     date.setHours(23, 59, 59, 999);
    //     return date;
    // };

    // const getEmployees = async (filter: { fromDate?: string; toDate?: string; search?: string }) => {
    //     const { fromDate, toDate, search } = filter;
    //     let query: any = {};

    //     const startDate = parseDate(fromDate);
    //     const endDate = parseDate(toDate);

    //     if (fromDate && toDate) {
    //         query.createdAt = {
    //             gte: startDate ? normalizeDateStart(startDate) : undefined,
    //             lte: endDate ? normalizeDateEnd(endDate) : undefined,
    //         };
    //     }

    //     if (search) {
    //         query.OR = [
    //             { first_name: { contains: search, mode: 'insensitive' } },
    //             { email: { contains: search, mode: 'insensitive' } },
    //         ];
    //     }

    //     return await prisma.employee.findMany({
    //         where: query,
    //         orderBy: { createdAt: 'desc' },
    //     });
    // };

    // const employees = await getEmployees({ fromDate, toDate, search });
    // const totalCount = employees.length;
    // const formattedEmployees: Employee[] = employees.map((employee) => ({
    //     id: employee.id,
    //     first_name: employee.first_name,
    //     last_name: employee.last_name,
    //     email: employee.email,
    //     point: employee.point.toNumber(),
    //     point_system: employee.point_system,
    //     remark: employee.remark,
    //     added_by: employee.added_by,
    //     createdAt: employee.createdAt.toISOString(),
    //     updatedAt: employee.updatedAt.toISOString(),
    // }));

    console.log('searchParams in Home:', searchParams);
    const employees = await fetchEmployees(searchParams);
    const totalCount = employees.length;

    return (
        <FilterProvider>
            {/* <HomeClient employees={employees} totalCount={totalCount} /> */}
            <HomeClient />
        </FilterProvider>
    );
};

export default Home;
