'use client';

import { useFilter } from '../context/FilterContext';
import FilterComponent from '../components/employees/EmployeeFilter';
import { Employee } from '../employees/types';
import EmployeeAddForm from '../employees/employeeform';
import Table from './Table';
import { useEffect, useState } from 'react';
// import { fetchEmployees } from '@/lib/fetchEmployees';

const fetchEmployees = async (filters: { fromDate?: string; toDate?: string; search?: string }) => {
    const queryParams = new URLSearchParams(filters as any).toString();
    const response = await fetch(`/api/employees?${queryParams}`);
    const data = await response.json();
    return data;
};
// const HomeClient = ({ employees, totalCount }: { employees: Employee[]; totalCount: number }) => {
const HomeClient = () => {
    const { filters, setFilters } = useFilter();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    console.log('Filters in HomeClient:', filters);

    useEffect(() => {
        const loadEmployees = async () => {
            const data = await fetchEmployees(filters);
            console.log("fetchEmployees", data);
            setEmployees(data.employees);
            setTotalCount(data.employees.length);
        };

        loadEmployees();
    }, [filters]);
    return (
        <div className="container mx-auto">
            <EmployeeAddForm mtype="ADD" />
            <div className="mt-8"></div>
            <FilterComponent />
            <Table employees={employees} totalCount={totalCount} />
        </div>
    );
};

export default HomeClient;
