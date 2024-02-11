import React, { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toastVisibility, setToastContent } from "./redux/toastSlice";

const Toast = ({ toastVisibility, toastContent }) => {
    let timer;
    const toastContainer = useRef();
    //   const dispatch = useDispatch();

    const hideToast = () => {
        toastContainer.current.classList.remove("active");
        clearTimeout(timer);
    };

    const showToast = () => {
        toastContainer.current.classList.add("active");
        timer = setTimeout(() => {
            toastContainer.current.classList.remove("active");
            //   dispatch(toastVisibility({ toast: false })); //setting visibility to false
            //   dispatch(setToastContent({ message: "" })); //and content empty
        }, 3500);
    };

    const isSuccess = true;
    //   const isToastVisible = useSelector((state) => state.toast.toast);
    //   const isSuccess = useSelector((state) => state.toast.isSuccess);
    //   const message = useSelector((state) => state.toast.toastContent);

    if (toastVisibility) {
        showToast();
    }

    return (
        <>
            <div
                className="toastContainer shadow rounded-1"
                ref={toastContainer}
                onClick={hideToast}
                style={{
                    borderLeft: isSuccess
                        ? "6px solid var(--color-green)"
                        : "6px solid var(--color-red)",
                }}
            >
                {isSuccess ? (
                    <span>
                        <i className="fa-solid fa-circle-check me-3"></i>
                    </span>
                ) : (
                    <span>
                        <i className="fa-solid fa-triangle-exclamation me-3"></i>
                    </span>
                )}

                <section className="toast-inner">{toastContent}</section>
                <span onClick={hideToast}>
                    <i className="fa-solid fa-xmark close ms-5"></i>
                </span>
            </div>
        </>
    );
};

export default Toast;
