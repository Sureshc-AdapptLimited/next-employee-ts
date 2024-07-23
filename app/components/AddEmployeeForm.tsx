"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmployeeSchema, EmployeeType } from '@/schemas/employeeSchema';


interface Employee {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    point_system: string;
    remark: string;
    added_by: string;
}
type AddEmployeeProps = {
    addEmployee: (employee: Employee) => void;
    updateEmployee: (formData: Employee) => void;
    selectedEmployee: Employee | null;
    setSelectedEmployee: (employee: Employee | null) => void;
};


const AddEmployeeForm: React.FC<AddEmployeeProps> = ({ addEmployee, updateEmployee,
    selectedEmployee,
    setSelectedEmployee, }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [system, setSystem] = useState('');
    const [remarks, setRemarks] = useState('');
    const [addedby, setAddedby] = useState('');
    const [errors, setErrors] = useState<Partial<EmployeeType>>({});
    const router = useRouter();

    useEffect(() => {
        if (selectedEmployee) {
            console.log("selectedEmployee####", selectedEmployee);
            //   setFormData(selectedEmployee);
            setFirstname(selectedEmployee.first_name)
            setLastname(selectedEmployee.last_name)
            setEmail(selectedEmployee.email)
            setSystem(selectedEmployee.point_system.toString())
            setRemarks(selectedEmployee.remark)
            setAddedby(selectedEmployee.added_by)
        } else {
            setFirstname('')
            setLastname('')
            setEmail('')
            setSystem('')
            setRemarks('')
            setAddedby('')
        }
    }, [selectedEmployee]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate the form data using Zod

        const formData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            point_system: system,
            remark: remarks,
            added_by: addedby
        };
        const validationResult = EmployeeSchema.safeParse(formData);
        if (!validationResult.success) {
            // If validation fails, update the errors state with the errors from Zod
            const errorMessages: any = validationResult.error.flatten().fieldErrors;
            console.log(errorMessages);
            setErrors(errorMessages);
            return;
        }


        const emailCheckResponse = await fetch('/api/employees/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, id: selectedEmployee?.id }),
        });
        const emailCheckData = await emailCheckResponse.json();

        if (emailCheckData.exists) {
            setErrors({ email: 'Email already exists' });
            return;
        }
        setErrors({});
        // Call parent function to add employee

        if (selectedEmployee) {
            updateEmployee({ ...formData, id: selectedEmployee.id });
        } else {
            addEmployee(formData);
        }


        setFirstname('')
        setLastname('')
        setEmail('')
        setSystem('')
        setRemarks('')
        setAddedby('')

        // const response = await fetch('/api/employees', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         formData
        //     }),
        // });

        // if (response.ok) {
        //     router.refresh();
        //     console.log("$$$$$", response)
        //     // revalidatePath('/');
        // } else {
        //     console.error('Failed to add employee');
        // }
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
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Point System</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg"
                            value={system}
                            onChange={(e) => setSystem(e.target.value)}
                        >
                            <option value="">Select System</option>
                            <option value="1">Client appreciation</option>
                            <option value="2">SLT appreciation</option>
                            <option value="3">PM's input</option>
                            <option value="4">Quality</option>
                            <option value="5">Learning & Growth</option>
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
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                        {errors.remark && <p className="text-red-500">{errors.remark}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Added by</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Added by"
                            value={addedby}
                            onChange={(e) => setAddedby(e.target.value)}
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
    );
}
export default AddEmployeeForm;