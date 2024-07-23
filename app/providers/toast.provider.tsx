"use client";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../globals.css';

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
}