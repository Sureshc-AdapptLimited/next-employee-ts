interface Employee {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    point_system: string;
    remark: string;
    added_by: string;
}
interface EmployeeTableProps {
    employees: Employee[];
    isLoading: boolean;
    setSelectedEmployee: (employee: Employee) => void;
    deleteEmployee: (id: string) => void;
}

const pointSystems = {
    '1': 'Client appreciation',
    '2': 'SLT appreciation',
    '3': "PM's input",
    '4': 'Quality',
    '5': 'Learning & Growth'
};
const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
const EmployeeTable = ({ employees, isLoading, setSelectedEmployee,
    deleteEmployee, }: EmployeeTableProps) => {
    return (
        <div className="mt-8">
            <div className="text-right">
                <button

                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Export Employees
                </button>
                {/* <div>
                    <input
                        type="file"
                        accept=".csv"
                        className="border p-2 rounded mr-2"
                    />
                    <button

                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Import Employees
                    </button>
                </div> */}
            </div>
            <h2 className="text-xl font-bold mb-4">Employee Recognition List</h2>
            {isLoading ? (
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            ) : (
                <table className="table-auto min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Point System</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {employees.length === 0 ? (
                            <tr >
                                <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={7}>No data found</td>
                            </tr>
                        ) : (
                            <>
                                {employees.map((employee: any) => (
                                    <tr key={employee.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.first_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.last_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{pointSystems[employee.point_system as keyof typeof pointSystems]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.remark}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.added_by}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.createdAt).toLocaleDateString('en-IN', options)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.updatedAt).toLocaleDateString('en-US', options)}</td>
                                        <td>
                                            <button onClick={() => setSelectedEmployee(employee)}>Edit</button> |
                                            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </>

                        )}

                    </tbody>
                </table>
            )}

        </div>
    );
}

export default EmployeeTable


// export default function EmployeeTable() {
//     const [employees, setEmployees] = useState<Employee[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchEmployees = async () => {
//             try {
//                 const response = await fetch('/api/employees');
//                 console.error('Failed to fetch employees:', response);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setEmployees(data.employees);
//             } catch (error) {
//                 console.error('Failed to fetch employees:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchEmployees();
//     }, []);
//     if (isLoading) {
//         return <p>Loading...</p>;
//     }
//     return (
//         <div className="mt-8">
//             <h2 className="text-xl font-bold mb-4">Employee List</h2>
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Point System</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {employees.length === 0 ? (
//                         <tr >
//                             <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={6}>No data found</td>
//                         </tr>
//                     ) : (
//                         <>
//                             {employees.map((employee) => (
//                                 <tr key={employee.id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.first_name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.last_name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.point_system}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.remark}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.added_by}</td>
//                                 </tr>
//                             ))}
//                         </>

//                     )}

//                 </tbody>
//             </table>
//         </div>
//     );
// }
