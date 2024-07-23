"use client"
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    // onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            // onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            // onPageChange(currentPage + 1);
        }
    };

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set('page', newPage.toString());
        window.location.search = params.toString();
    };

    return (
        <div className="flex justify-between items-center mt-4">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={currentPage === 1}
                onClick={() => updatePage(currentPage - 1)}
            >
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={currentPage === totalPages}
                onClick={() => updatePage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
