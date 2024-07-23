"use client"
import { EmployeeSchema, EmployeeType } from '@/schemas/employeeSchema';
import { startTransition, useState } from "react";
import { ZodError } from 'zod';
import { createEmployee } from '../actions/employeeActions';
import { toast } from 'react-toastify';
import { Employee } from '../employees/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const pointSystems = {
    0: 'Select a point system',
    1: 'Client appreciation',
    2: 'SLT appreciation',
    3: "PM's input",
    4: 'Quality',
    5: 'Learning & Growth'
};
// interface ICRUDModalRequiredProps {
//     mtype: string;
// }
// interface ICRUDModalOptionalProps {
//     data?: EmployeeType;
// }
// Combine required and optional props to build the full prop interface
// interface ICRUDModalProps
//     extends ICRUDModalRequiredProps,
//     ICRUDModalOptionalProps { }

interface EmployeeFormProps {
    mtype: 'ADD' | 'EDIT';
    employee?: Employee;
    onSave?: () => void;
}
const EmployeeAddForm: React.FC<EmployeeFormProps> = ({ mtype, employee, onSave }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeType>({
        resolver: zodResolver(EmployeeSchema),
    });

    // const [formData, setFormData] = useState<Employee>({
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     point: 0,
    //     point_system: 0,
    //     remark: '',
    //     added_by: '',
    // });
    // const [errors, setErrors] = useState<Partial<Employee>>({});
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target;
    //     const intValue = name === 'point_system' ? parseInt(value) : value;
    //     setFormData(prevState => ({ ...prevState, [name]: intValue }));
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         // Validate the form data using Zod
    //         EmployeeSchema.parse(formData);
    //         startTransition(() => {
    //             const serveAction = async () => {
    //                 console.log(formData)
    //                 await createEmployee(formData);
    //                 setFormData({
    //                     first_name: '',
    //                     last_name: '',
    //                     email: '',
    //                     point: 0,
    //                     point_system: 0,
    //                     remark: '',
    //                     added_by: '',
    //                 });
    //                 setErrors({});
    //                 toast.success("Employee Added successfully!");
    //             };
    //             serveAction();
    //         });

    //     } catch (error) {
    //         if (error instanceof ZodError) {
    //             const formErrors: Partial<Employee> = {};
    //             error.errors.forEach((err: any) => {
    //                 if (err.path.length > 0) {
    //                     formErrors[err.path[0] as keyof Employee] = err.message;
    //                 }
    //             });
    //             setErrors(formErrors);
    //         } else {
    //             console.error(error);
    //             // toast.error("An error occurred while submitting the form");
    //         }
    //     }

    // }

    const onSubmit: SubmitHandler<EmployeeType> = async (data) => {
        try {
            startTransition(() => {
                const serveAction = async () => {
                    await createEmployee({ ...data, last_name: '' });
                    reset();
                    toast.success("Employee Added successfully!");
                };
                serveAction();
            });
        } catch (error) {
            if (error instanceof ZodError) {
                console.error("Validation Error:", error.errors);
            } else {
                console.error("Submission Error:", error);
                toast.error("An error occurred while submitting the form");
            }
        }
    };
    return (
        <div className="mx-auto mt-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
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
                            id='first_name'
                            {...register('first_name')}
                        />
                        {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Point</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Point"
                            id='point'
                            {...register('point', { valueAsNumber: true })}
                        />
                        {errors.point && <p className="text-red-500">{errors.point.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Email"
                            id='email'
                            {...register('email')}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Point System</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg"
                            id='point_system'
                            {...register('point_system', { valueAsNumber: true })}
                        >

                            {Object.entries(pointSystems).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        {errors.point_system && <p className="text-red-500">{errors.point_system.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Remarks</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Remarks"
                            id='remark'
                            {...register('remark')}
                        />
                        {errors.remark && <p className="text-red-500">{errors.remark.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Added by</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Added by"
                            id='added_by'
                            {...register('added_by')}
                        />
                        {errors.added_by && <p className="text-red-500">{errors.added_by.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 place-content-center ">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg" type="submit">{mtype === 'ADD' ? 'Submit' : 'Update'}</button>
                </div>

            </form>

            {/* <form
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
                            value={formData.first_name}
                            onChange={handleChange}

                        />
                        {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                    </div>

                    <div className="mb-4"> */}
            {/* <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Last Name"
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleChange}
                        /> */}
            {/* <label className="block text-gray-700">Point</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder="Point"
                            name='point'
                            value={formData.point}
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
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Point System</label>
                        <select
                            className="w-full px-3 py-2 border rounded-lg"
                            name='point_system'
                            value={formData.point_system}
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
                            value={formData.remark}
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
                            value={formData.added_by}
                            onChange={handleChange}
                        />
                        {errors.added_by && <p className="text-red-500">{errors.added_by}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4 place-content-center ">
                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg" type="submit">{mtype === 'ADD' ? 'Submit' : 'Update'}</button> */}
            {/* {selectedEmployee && <button onClick={handleCancel}>Cancel</button>} */}
            {/* </div>

            </form> */}
        </div>
    )
}

export default EmployeeAddForm