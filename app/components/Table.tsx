import { Employee } from "../employees/types";

interface TableProps {
    employees: Employee[];
    totalCount: number;
}

const Table = ({ employees, totalCount }: TableProps) => {
    return (
        <div>
            <p className="text-sm text-gray-600">Total Records: <span className="font-semibold">{totalCount}</span></p>
            <h2 className="text-xl font-bold mb-4">Employee Recognition List</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Points</th>
                        <th>Point System</th>
                        <th>Remark</th>
                        <th>Added By</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.point}</td>
                            <td>{employee.point_system}</td>
                            <td>{employee.remark}</td>
                            <td>{employee.added_by}</td>
                            <td>{employee.createdAt}</td>
                            <td>{employee.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
