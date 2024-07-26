"use client";
import React from 'react'
import { convertToCSV, downloadCSV } from '../utils/exportUtils';
import { Employee } from '../employees/types';

interface EmployeeExportProps {
    employeesData: Employee[];
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
const ExportEmployees: React.FC<EmployeeExportProps> = ({ employeesData }) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const handleExport = () => {
        // Convert employees data to CSV format
        const csvContent = convertToCSV(employeesData.map(employee => ({
            'First Name': employee.first_name,
            // 'Last Name': employee.last_name,
            'Email': employee.email,
            'Point': employee.point,
            'Point System': pointSystems[employee.point_system as keyof typeof pointSystems],
            'Remarks': employee.remark,
            'Added By': employee.added_by,
            'Created At': employee.createdAt ? new Date(employee.createdAt).toLocaleDateString('en-IN', options) : '',
            'Updated At': employee.updatedAt ? new Date(employee.updatedAt).toLocaleDateString('en-US', options) : '',
        })));
        // console.log(csvContent, "@@@@@@@");

        // Generate the current date for the filename
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const filename = `employees_recognition_list_${formattedDate}.csv`;
        // Call utility function to download CSV file
        downloadCSV(csvContent, filename);
    }
    return (
        <div>
            <button
                onClick={handleExport}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Export Employees
            </button>
        </div>
    )
}

export default ExportEmployees