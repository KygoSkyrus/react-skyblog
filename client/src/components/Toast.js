import React, { useEffect, useRef } from "react";
import { useToast } from "./ToastContext";

const Toast = () => {

    const toastContainer = useRef();
    const { toast, hideToast } = useToast();

    useEffect(() => {
        if (toast?.toastVisibility) {
            toastContainer.current.classList.add("active");
        } else {
            toastContainer.current.classList.remove("active");
        }
    }, [toast?.toastVisibility])

    return (
        <>
            <div
                ref={toastContainer}
                className="toastContainer shadow rounded"
                style={{ borderLeft: "8px solid #18c29c" }}
                onClick={hideToast}
            >
                <div className="d-flex align-items-center">
                    <span style={{ marginRight: "10px", color: "#18c29c", fontSize: "18px" }}>
                        <i className="fa-solid fa-info-circle"></i>
                    </span>
                    <section className="toast-inner">{toast?.toastContent}</section>
                </div>
                <span onClick={hideToast} style={{ marginLeft: "10px" }}>
                    <i className="fa-solid fa-xmark close cursor-pointer"></i>
                </span>
            </div>
        </>
    );
};

export default Toast;
