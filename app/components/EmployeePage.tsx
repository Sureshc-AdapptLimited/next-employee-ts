"use client"
import { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import AddEmployeeForm from "./AddEmployeeForm";
import { toast } from 'react-toastify';
interface Employee {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    point_system: string;
    remark: string;
    added_by: string;
    createdAt?: string;
    updatedAt?: string;
}
const EmployeePage = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [responseMessage, setResponseMessage] = useState<string>("");

    const addEmployee = async (formData: Employee) => {
        // setIsLoading(true)
        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast.success("Employee Added successfully!");
            fetchEmployees();
        } catch (error) {
            console.error('Failed to add employee');
        } finally {
            // setIsLoading(false)
        }
    }

    const updateEmployee = async (formData: Employee) => {
        try {
            const response = await fetch('/api/employees', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast.success("Employee Updated successfully!");
            fetchEmployees();
            setSelectedEmployee(null)
        } catch (error) {
            console.error('Failed to update employee');
        }
    }

    const deleteEmployee = async (id: string) => {
        try {
            const response = await fetch('/api/employees', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // setResponseMessage("Employee deleted successfully!");
            toast.success("Employee deleted successfully!");
            fetchEmployees();
        } catch (error) {
            // setResponseMessage("Failed to delete employee.");
            toast.error("Failed to delete employee.!");
            console.error('Failed to delete employee');
        }
    }
    const fetchEmployees = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/employees');
            console.error('Failed to fetch employees:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEmployees(data.employees);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <>
            {/* {responseMessage && <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{responseMessage}</span>
            </div>} */}
            <AddEmployeeForm addEmployee={addEmployee} updateEmployee={updateEmployee} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />
            <EmployeeTable employees={employees} isLoading={isLoading} setSelectedEmployee={setSelectedEmployee} deleteEmployee={deleteEmployee} />
        </>
    );
}
export default EmployeePage;