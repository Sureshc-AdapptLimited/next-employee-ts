"use client";
import React, { useTransition, useState, useEffect } from 'react'
import Modal from '../Modal'
import ExportEmployees from '../ExportEmployees'
import ImportEmployees from '../ImportEmployees'
import EmployeeForm from './EmployeeForm';
import { getEmployees, deleteEmployee } from '@/app/actions/employeeActions';
import { toast } from 'react-toastify';
import { convertToCSV, downloadCSV } from '@/app/utils/exportUtils';

interface Employee {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    point_system: number;
    remark: string;
    added_by: string;
    createdAt?: Date;
    updatedAt?: Date;
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

const EmployeeModels = () => {
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isPending, startTransition] = useTransition();


    const openExportModal = () => setIsExportModalOpen(true);
    const closeExportModal = () => setIsExportModalOpen(false);

    const openImportModal = () => setIsImportModalOpen(true);
    const closeImportModal = () => setIsImportModalOpen(false);

    const refreshEmployees = async () => {
        startTransition(async () => {
            setEmployees(await getEmployees());
        });
    }

    useEffect(() => {
        refreshEmployees()
    }, []);


    const onDelete = async (id: string) => {
        console.log(id, "Delete@@@@@@")
        if (id) {
            await deleteEmployee(id);
            toast.success("Employee deleted successfully!");
            setSelectedEmployee(null);
            refreshEmployees();
        }
    }

    const handleExport = () => {
        // Convert employees data to CSV format
        const csvContent = convertToCSV(employees.map(employee => ({
            'First Name': employee.first_name,
            'Last Name': employee.last_name,
            'Email': employee.email,
            'Point System': pointSystems[employee.point_system as keyof typeof pointSystems],
            'Remarks': employee.remark,
            'Added By': employee.added_by,
            'Created At': employee.createdAt ? new Date(employee.createdAt).toLocaleDateString('en-IN', options) : '',
            'Updated At': employee.updatedAt ? new Date(employee.updatedAt).toLocaleDateString('en-US', options) : '',
        })));
        // console.log(csvContent, "@@@@@@@");
        // Call utility function to download CSV file
        downloadCSV(csvContent, 'employees.csv');
    }
    return (
        <div>
            <EmployeeForm selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} refreshEmployees={refreshEmployees}></EmployeeForm>
            <div className="mt-8"></div>
            <div className="space-x-4 text-right">
                <button
                    onClick={handleExport}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Export Employees
                </button>
                {/* <button
                    onClick={openExportModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Export Employees
                </button>
                <button
                    onClick={openImportModal}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Import Employees
                </button> */}
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
                    {employees.length === 0 ? (
                        <tr >
                            <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={9}>No data found</td>
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
                                        <button onClick={() => onDelete(employee.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </>

                    )}
                </tbody>
            </table>
            {/* <Modal isOpen={isExportModalOpen} onClose={closeExportModal}>
                <ExportEmployees></ExportEmployees>
            </Modal>
            <Modal isOpen={isImportModalOpen} onClose={closeImportModal}>
                <ImportEmployees></ImportEmployees>
            </Modal> */}
        </div>
    )
}

export default EmployeeModels