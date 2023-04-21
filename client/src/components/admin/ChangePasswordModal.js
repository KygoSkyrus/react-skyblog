import React from 'react'

const ChangePasswordModal = () => {

    async function cpswrd() {
        const uname = document.getElementById("uname").value;
        const password = document.getElementById("password").value;
        const newPassword = document.getElementById("newPassword").value;

        const res = await fetch("/cpswrd", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uname,
                password,
                newPassword,
            }),
        });

        const data = await res.json();
        if (data.message === "changed") {
            alert("Password changed successfully!");
            document.getElementById("password").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("close").click();
        }
    }

    return (
        <>
            <div className="modal fade" id="change" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mt-0">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                            <i className="fa fa-window-close fa-2x" type="button" id="close" data-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center justify-content-center text-center">
                                <div className="form-wrapper m-auto" style={{ width: "100%" }}>
                                    <div className="form-container my-4" style={{ maxWidth: "unset" }}>
                                        <div className="panel" style={{ border: "none", boxShadow: "none" }}>
                                            <form className="register-form">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="uname" placeholder="username" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" id="password"
                                                        placeholder="Old Password" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" id="newPassword"
                                                        placeholder="New Password" />
                                                </div>
                                                <section className="btn btn-success btn-block" onClick={e => cpswrd(e)}>
                                                    Change password
                                                </section>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePasswordModal