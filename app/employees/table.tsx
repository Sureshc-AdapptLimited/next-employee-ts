"use server"
import { prisma } from "@/lib/db"
import EmployeeAddForm from "./employeeform";
import EmployeeActions from "../components/employees/EmployeeActions";
import ExportEmployees from "../components/ExportEmployees";
import { Employee } from './types';
import FilterComponent from "../components/employees/EmployeeFilter";
import Pagination from "../components/Pagination";

const pointSystems = {
    1: 'Client appreciation',
    2: 'SLT appreciation',
    3: "PM's input",
    4: 'Quality',
    5: 'Learning & Growth'
};

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
interface TableProps {
    employees: Employee[],
    totalCount: number;
    page: number;
    pageSize: number;
    allFilteredEmployees: Employee[];
}
// const Table: React.FC<TableProps> = async ({ employees }) => {
const Table: React.FC<TableProps> = ({ employees, totalCount, page, pageSize, allFilteredEmployees  }) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    // const allEntities = await prisma.employee.findMany();

    // const employees: Employee[] = allEntities.map(employee => ({
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

    return (
        <div>
            <div className="mt-8"></div>

            <div className="space-x-4 text-right">
                {employees.length > 0 && <ExportEmployees employeesData={allFilteredEmployees} />}
            </div>
            {/* <div className="flex justify-between items-center mb-4"> */}
            <h2 className="text-xl font-bold">Employee Recognition List</h2>
            {/* </div> */}
            <table className="table-auto min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Point</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Point System</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {employees.length === 0 ? (
                        <tr >
                            <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={9}>No data found</td>
                        </tr>
                    ) : (
                        <>
                            {employees.map((employee: any) => (
                                <tr key={employee.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.first_name}</td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">{employee.last_name}</td> */}
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.point}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{pointSystems[employee.point_system as keyof typeof pointSystems]}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.remark}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.added_by}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.createdAt).toLocaleDateString('en-IN', options)}</td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.updatedAt).toLocaleDateString('en-US', options)}</td> */}
                                    <td>
                                        <EmployeeActions
                                            employeeId={employee.id}
                                            employeeData={{
                                                id: employee.id,
                                                first_name: employee.first_name,
                                                last_name: employee.last_name,
                                                email: employee.email,
                                                point: employee.point,
                                                point_system: employee.point_system,
                                                remark: employee.remark,
                                                added_by: employee.added_by,
                                                createdAt: employee.createdAt,
                                                updatedAt: employee.updatedAt
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </>

                    )}
                </tbody>

            </table>
            <Pagination currentPage={page} totalPages={totalPages} totalCount={totalCount} pageSize={pageSize}></Pagination>
            <div className="mt-5"></div>
        </div>
    )
}

export default Table

// "use server";
// import { prisma } from "@/lib/db";
// import EmployeeForm from "./employeeform";
// import EmployeeTable from "./EmployeeTable"; // Import the client component
// import { Employee } from './types'; // Import the Employee type

// const pointSystems = {
//     1: 'Client appreciation',
//     2: 'SLT appreciation',
//     3: "PM's input",
//     4: 'Quality',
//     5: 'Learning & Growth'
// };

// const options: Intl.DateTimeFormatOptions = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
// };

// const Table = async () => {
//     const allEntities: Employee[] = await prisma.employee.findMany();

//     return (
//         <div>
//             <EmployeeForm mtype={'ADD'} />
//             <div className="mt-8"></div>
//             <EmployeeTable employees={allEntities} />
//         </div>
//     );
// };

// export default Table;