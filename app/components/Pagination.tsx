"use client"
import React from 'react';
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalCount, pageSize }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            updatePage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            updatePage(currentPage + 1);
        }
    };

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage.toString());
        window.location.search = params.toString();
    };

    const startEntry = (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalCount);

    const renderPageNumbers = () =>{
        const pages = [];
        
        for(let i=1; i <= Math.min(3, totalPages); i++ ){
            pages.push(
                <button
                    key={i}
                    className={`px-4 py-2 rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300`}
                    onClick={() => updatePage(i)}
                >
                    {i}
                </button>
            );
        }
        if (totalPages > 3) {
            pages.push(
                <span key="ellipsis" className="px-2 py-2 text-gray-700">
                    ...
                </span>
            );
            pages.push(
                <button
                    key={totalPages}
                    className={`px-4 py-2 rounded ${totalPages === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-300`}
                    onClick={() => updatePage(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }
        return pages;

    }

    return (
        <div className="flex flex-col items-center mt-4 space-y-2">
            <div className="text-sm text-gray-700 w-full text-left">
                Showing {startEntry} to {endEntry} of {totalCount} entries
            </div>
            <div className="flex justify-between items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center space-x-1"
                        disabled={currentPage === 1}
                        onClick={() => updatePage(1)}
                    >
                        <ChevronsLeft className="h-5 w-5" />
                    </button>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center space-x-1"
                        disabled={currentPage === 1}
                        onClick={handlePrevious}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                </div>

                {/* <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span> */}

                <div className="flex items-center space-x-2">
                    {renderPageNumbers()}
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center space-x-1"
                        disabled={currentPage === totalPages}
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center space-x-1"
                        disabled={currentPage === totalPages}
                        onClick={() => updatePage(totalPages)}
                    >
                        <ChevronsRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
