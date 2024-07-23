"use client";

import { deleteEmployee } from '@/app/actions/employeeActions';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Trash2, Pencil, PlusCircle, X } from 'lucide-react';
import EmployeeAddForm from '../../employees/employeeform';
import { Employee } from '@/app/employees/types';


interface EmployeeActionsProps {
    employeeId: string;
    employeeData: Employee;
}

const EmployeeActions: React.FC<EmployeeActionsProps> = ({ employeeId, employeeData }) => {
    const [editEmployeeData, setEditEmployeeData] = useState<Employee | null>(null)
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(employeeData);

    const handleEdit = () => {
        // console.log("Edit employee:", employeeData);
        // setEditEmployeeData(employeeData);
        // setEditMode(true);
    };

    const handleDelete = async () => {
        console.log("Delete employee:", employeeId);
        if (employeeId) {
            await deleteEmployee(employeeId);
            toast.success("Employee deleted successfully!");
        }
    };
    const handleSave = () => {
        // Implement save functionality, e.g., updateEmployee(employeeId, editedData);
        console.log("Save edited employee data:", employeeData);
        setEditMode(false); // Disable edit mode after saving
    };


    return (
        <div className="px-6 py-4 whitespace-nowrap text-center">
            {/* {!editMode ? (
                <> */}
            {/* <button onClick={handleEdit} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"><Pencil size={18}></Pencil></button>
            &nbsp; */}
            <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"><Trash2 size={18}></Trash2></button>
            {/* </>
            ) : (
                <EmployeeAddForm mtype="EDIT" employee={employeeData} onSave={handleSave} />
            )} */}
        </div>
    );
};

export default EmployeeActions;
