"use client";

import { useState } from "react";
import { Employee } from './types'; // Import the Employee type



type EmployeeProps = {
    employees: Employee[];
}

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


const EmployeeTable = ({ employees }: EmployeeProps) => {
    const [allEntities, setAllEntities] = useState(employees);

    const onEdit = (id: string) => {
        console.log("Edit employee:", id);
    };

    const onDelete = (id: string) => {
        console.log("Delete employee:", id);
    };

    const handleExport = () => {
        console.log("Export Employees");
    };

    return (
        <div>
            <div className="space-x-4 text-right">
                <button
                    onClick={handleExport}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Export Employees
                </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Employee Recognition List</h2>
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
                    {allEntities.length === 0 ? (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={9}>No data found</td>
                        </tr>
                    ) : (
                        allEntities.map((employee: any) => (
                            <tr key={employee.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.first_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.last_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {typeof employee.point_system === 'number' && employee.point_system in pointSystems && pointSystems[employee.point_system as keyof typeof pointSystems]}


                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.remark}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employee.added_by}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.createdAt).toLocaleDateString('en-IN', options)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.updatedAt).toLocaleDateString('en-US', options)}</td>
                                <td>
                                    <button onClick={() => onEdit(employee.id)}>Edit</button> |
                                    <button onClick={() => onDelete(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
