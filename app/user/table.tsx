"use server"
import { prisma } from "@/lib/db"
import Modal from "../components/Modal";
import CRUDModal from "./modal";

const Table = async () => {
    const allEntities = await prisma.user.findMany();
    return (
        <div>
            <div className="w-full flex items-center justify-between">
                <h1 className='page-title'>Users</h1>
                <CRUDModal mtype={'add'}></CRUDModal>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allEntities.map((entity, index) => {
                        return (<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-6 py-4">{entity.id}</th>
                            <td className="px-6 py-4">{entity.name}</td>
                            <td className="px-6 py-4">{entity.email}</td>
                            <td className="px-6 py-4">{entity.image}</td>
                            <td className="px-6 py-4">{entity.role}</td>
                            <td className="px-6 py-4 table-actions">

                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table