'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FilterContextType {
    filters: { fromDate?: string; toDate?: string; search?: string };
    setFilters: React.Dispatch<React.SetStateAction<{ fromDate?: string; toDate?: string; search?: string }>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [filters, setFilters] = useState<{ fromDate?: string; toDate?: string; search?: string }>({});

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};