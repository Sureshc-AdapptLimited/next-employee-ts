'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const FilterComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [search, setSearch] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'fromDate') {
      setFromDate(value);
    } else if (name === 'toDate') {
      setToDate(value);
    }
    // updateQuery({ [name]: value });
  };
  
  useEffect(() => {
    // Read URL parameters and set input values
    const fromDateParam = searchParams.get('fromDate') || '';
    const toDateParam = searchParams.get('toDate') || '';
    const searchParam = searchParams.get('search') || '';

    setFromDate(fromDateParam);
    setToDate(toDateParam);
    setSearch(searchParam);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    // updateQuery({ search: value });
  };
  const updateQuery = (newQuery: Record<string, string>) => {
    const query = new URLSearchParams(window.location.search);
    Object.keys(newQuery).forEach(key => {
      if (newQuery[key]) {
        query.set(key, newQuery[key]);
      } else {
        query.delete(key);
      }
    });

    router.push(`${window.location.pathname}?${query.toString()}`);
  };
  const handleFilter = () => {
    updateQuery({ fromDate, toDate, search });
  };
  const handleClearFilter = () => {
    setFromDate('');
    setToDate('');
    setSearch('');
    updateQuery({ fromDate: '', toDate: '', search: '' });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      <div className="mb-4 flex flex-col">
        <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
        <input
          type="date"
          name="fromDate"
          id="fromDate"
          value={fromDate || ''}
          onChange={handleDateChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="From Date"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To Date</label>
        <input
          type="date"
          name="toDate"
          id="toDate"
          value={toDate || ''}
          onChange={handleDateChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="To Date"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Name / Email</label>
        <input
          type="text"
          placeholder="Search..."
          id="search"
          value={search || ''}
          onChange={handleSearchChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4 flex items-end space-x-2">
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Filter
        </button>
        <button
          onClick={handleClearFilter}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full md:w-auto"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
