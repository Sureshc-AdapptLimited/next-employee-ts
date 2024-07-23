'use client';

import { useContext } from 'react';
import { FilterProvider, useFilter } from '../context/FilterContext';
import Home from '../employees/Home';


const FilterProviderWrapper = () => {
    const { searchParams } = useFilter();
    return (
        <FilterProvider>
            <Home searchParams={searchParams} />
        </FilterProvider>
    );
};

export default FilterProviderWrapper;
