"use client";

import React from 'react';
import Table from './table';

const EmployeeTableContainer: React.FC = () => {
    const handleEdit = async (id: string) => {
        console.log("Edit employee:", id);
        // Implement edit logic here
    };

    const handleDelete = async (id: string) => {
        console.log("Delete employee:", id);
        // Implement delete logic here
    };

    return (
        <>
        </>
        // <Table handleEdit={handleEdit} handleDelete={handleDelete} />
    );
};

export default EmployeeTableContainer;
