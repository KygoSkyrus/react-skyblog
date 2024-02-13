import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();
export const ToastProvider = ({ children }) => {

    const [toast, setToast] = useState({ toastVisibility: false, toastContent: "" });

    const showToast = (message) => {
        setToast({ toastVisibility: true, toastContent: message });
        setTimeout(() => hideToast(), 5000); 
    };

    const hideToast = () => {
        setToast({ toastVisibility: false, toastContent: "" });
    };

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
