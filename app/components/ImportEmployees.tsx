"use client"
import React, { useState } from 'react'

const ImportEmployees: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleImport = () => {
        if (!file) return;
        // Call API to import employees from the file
    }
    return (
        <div>
            <h2 className="text-xl mb-4">Import Employees</h2>
            <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="border p-2 rounded mb-4"
            />
            <button
                onClick={handleImport}
                disabled={!file}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Import Employees
            </button>
        </div>
    )
}

export default ImportEmployees