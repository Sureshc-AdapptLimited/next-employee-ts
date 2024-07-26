"use client"
import { EmployeeSchema, EmployeeType } from '@/schemas/employeeSchema';
import { startTransition} from "react";
import { ZodError } from 'zod';
import { createEmployee } from '../actions/employeeActions';
import { toast } from 'react-toastify';
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

interface EmployeeFormProps {
    mtype: 'ADD' | 'EDIT';
}
const EmployeeAddForm: React.FC<EmployeeFormProps> = ({ mtype }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EmployeeType>({
        resolver: zodResolver(EmployeeSchema),
    });

    

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

        </div>
    )
}

export default EmployeeAddForm