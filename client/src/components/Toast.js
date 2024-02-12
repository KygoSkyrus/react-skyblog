import React, { useEffect, useRef } from "react";
import { useToast } from "./ToastContext";

const Toast = () => {

    const toastContainer = useRef();
    const { toast, hideToast } = useToast();

    useEffect(() => {
        console.log('ueeeee', toast?.toastVisibility)
        if (toast?.toastVisibility) {
            toastContainer.current.classList.add("active");
        } else {
            toastContainer.current.classList.remove("active");
        }
    }, [toast?.toastVisibility])

    return (
        <>
            <div
                className="toastContainer shadow rounded"
                ref={toastContainer}
                onClick={hideToast}
                style={{borderLeft: "8px solid #18c29c"}}
            >

                <span style={{ marginRight: "10px", color: "#18c29c", fontSize: "18px" }}>
                    <i className="fa-solid fa-info-circle"></i>
                </span>

                <section className="toast-inner">{toast?.toastContent}</section>
                <span onClick={hideToast} style={{ marginleft: "10px" }}>
                    <i className="fa-solid fa-xmark close  cursor-pointer"></i>
                </span>
            </div>
        </>
    );
};

export default Toast;
