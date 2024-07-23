import React from 'react'

interface IModelProps {
    isOpen: boolean;
    onClose: () => void;
    children: any
}

const Modal: React.FC<IModelProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal