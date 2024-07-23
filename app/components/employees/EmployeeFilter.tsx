'use client'
import { useFilter } from '@/app/context/FilterContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
/** Filter using QueryString */

const FilterComponent = () => {
  const router = useRouter();
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
      <div className="mb-4 flex items-end">
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;


/** Filter using Context */
// const FilterComponent = () => {
//   const { filters, setFilters } = useFilter();
//   const searchParams = useSearchParams();

//   const [fromDate, setFromDate] = useState(filters.fromDate || searchParams.get('fromDate') || '');
//   const [toDate, setToDate] = useState(filters.toDate || searchParams.get('toDate') || '');
//   const [search, setSearch] = useState(filters.search || searchParams.get('search') || '');

//   useEffect(() => {
//     setFilters({ fromDate, toDate, search });
//   }, [fromDate, toDate, search, setFilters]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFilters({ fromDate, toDate, search });
//     console.log('Filters updated:', { fromDate, toDate, search });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-4">
//       <input
//         type="date"
//         value={fromDate}
//         onChange={(e) => setFromDate(e.target.value)}
//         className="border p-2 mr-2"
//       />
//       <input
//         type="date"
//         value={toDate}
//         onChange={(e) => setToDate(e.target.value)}
//         className="border p-2 mr-2"
//       />
//       <input
//         type="text"
//         placeholder="Name or Email"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="border p-2 mr-2"
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2">
//         Filter
//       </button>
//     </form>
//   );

// };

// export default FilterComponent




// Filter design code
// "use client";

// import React, { useState } from 'react';

// interface FilterProps {
//     onFilter: (fromDate: string, toDate: string) => void;
// }

// // const FilterComponent: React.FC<FilterProps> = ({ onFilter }) => {
// const FilterComponent = () => {
//     const [fromDate, setFromDate] = useState<string>('');
//     const [toDate, setToDate] = useState<string>('');

//     const handleFilter = () => {
//         // onFilter(fromDate, toDate);
//     };

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="mb-4 flex flex-col">
//                 <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">From Date</label>
//                 <input
//                     type="date"
//                     id="fromDate"
//                     value={fromDate}
//                     onChange={e => setFromDate(e.target.value)}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 />
//             </div>
//             <div className="mb-4 flex flex-col">
//                 <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">To Date</label>
//                 <input
//                     type="date"
//                     id="toDate"
//                     value={toDate}
//                     onChange={e => setToDate(e.target.value)}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 />
//             </div>
//             <div className="mb-4 flex flex-col">
//                 <label htmlFor="search" className="block text-sm font-medium text-gray-700">Name / Email</label>
//                 <input
//                     type="text"
//                     id='search'
//                     placeholder="Search..."
//                     value={''}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 />
//             </div>
//             <div className="mb-4 flex items-end">
//                 <button
//                     onClick={handleFilter}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
//                 >
//                     Filter
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default FilterComponent;
