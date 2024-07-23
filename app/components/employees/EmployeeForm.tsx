import React, { useEffect, useState } from 'react'
import { EmployeeSchema, EmployeeType } from '@/schemas/employeeSchema';
import { createEmployee, updateEmployee } from '@/app/actions/employeeActions';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

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
type EmployeeProps = {
    selectedEmployee: Employee | null;
    setSelectedEmployee: (employee: Employee | null) => void;
    refreshEmployees: () => void;
};
const pointSystems = {
    0: 'Select a point system',
    1: 'Client appreciation',
    2: 'SLT appreciation',
    3: "PM's input",
    4: 'Quality',
    5: 'Learning & Growth'
};
const EmployeeForm: React.FC<EmployeeProps> = ({ selectedEmployee,
    setSelectedEmployee, refreshEmployees }) => {
    const [employee, setEmployee] = useState<Employee>({
        first_name: '',
        last_name: '',
        email: '',
        point_system: 0,
        remark: '',
        added_by: '',
    });

    const [errors, setErrors] = useState<Partial<Employee>>({});

    useEffect(() => {
        if (selectedEmployee) {
            setEmployee(selectedEmployee);
        } else {
            setEmployee({
                first_name: '',
                last_name: '',
                email: '',
                point_system: 0,
                remark: '',
                added_by: '',
            });
        }
    }, [selectedEmployee]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const intValue = name === 'point_system' ? parseInt(value) : value;
        setEmployee(prevState => ({ ...prevState, [name]: intValue }));
        // setEmployee(prevState => ({ ...prevState, [name]: value }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Validate the form data
            EmployeeSchema.parse(employee);
            if (employee.id) {
                await updateEmployee(employee.id, employee);
                toast.success("Employee Updated successfully!");
            } else {
                await createEmployee(employee);
                toast.success("Employee Added successfully!");
            }
            setSelectedEmployee(null);
            refreshEmployees();
            setEmployee({
                first_name: '',
                last_name: '',
                email: '',
                point_system: 0,
                remark: '',
                added_by: '',
            });
            setErrors({});
        } catch (error) {
            if (error instanceof ZodError) {
                const formErrors: Partial<Employee> = {};
                // Object.keys(Employee as any).forEach((key) => {
                //     formErrors[key] = '';
                // });
                error.errors.forEach((err: any) => {
                    if (err.path.length > 0) {
                        formErrors[err.path[0] as keyof Employee] = err.message;
                    }
                });
                setErrors(formErrors);
            } else {
                console.error(error);
                toast.error("An error occurred while submitting the form");
            }
        }


    };
    return (
        <div className="mx-auto mt-10">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold mb-5">Employee Recognition</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="First Name"
                            name='first_name'
                            value={employee.first_name}
                            onChange={handleChange}

                        />
                        {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Last Name"
                            name='last_name'
                            value={employee.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Email"
                            name='email'
                            value={employee.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Point System</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg"
                            name='point_system'
                            value={employee.point_system}
                            onChange={handleChange}
                        >

                            {Object.entries(pointSystems).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        {errors.point_system && <p className="text-red-500">{errors.point_system}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Remarks</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Remarks"
                            name='remark'
                            value={employee.remark}
                            onChange={handleChange}
                        />
                        {errors.remark && <p className="text-red-500">{errors.remark}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Added by</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Added by"
                            name='added_by'
                            value={employee.added_by}
                            onChange={handleChange}
                        />
                        {errors.added_by && <p className="text-red-500">{errors.added_by}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 place-content-center ">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg" type="submit">{selectedEmployee ? "Update" : "Submit"}</button>
                    {/* {selectedEmployee && <button onClick={handleCancel}>Cancel</button>} */}
                </div>

            </form>
        </div>
    )
}

export default EmployeeForm