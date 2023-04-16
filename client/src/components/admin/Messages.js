import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Messages = () => {

    const [messages, setMessages] = useState()

    useEffect(() => {
        getMessages();
    }, [])


    async function getMessages() {

        const res = await fetch("/showMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        const data = await res.json();
        setMessages(data)
        console.log("messages", data);
    }

    async function deleteMessage(id) {
        console.log('deletemesg', id);
        const res = await fetch("/deleteMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
            }),
        });

        const data = await res.json();
        console.log(data);
    }

    return (
        <>
            <div className="body-content">

                <div className="card mb-4">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fs-17 font-weight-600 mb-0">Messages</h6>
                            </div>
                            <div className="text-right">
                                <div className="actions">
                                    <Link to="" className="action-item"><i className="fas fa-refresh"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover column-rendering">
                                <thead>
                                    <tr>
                                        <th>S. No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">
                                    {
                                        messages?.map((x, index) => {
                                            return (
                                                <tr key={x._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{x.name}</td>
                                                    <td>{x.email}</td>
                                                    <td>{x.phone}</td>
                                                    <td>{x.note}</td>
                                                    <td style={{ display: "flex", border: "none", justifyContent: "center" }}><button onClick={e => deleteMessage(x._id, e)} style={{ background: "#d50606" }}><i className="fa fa-trash" ></i></button></td>
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <!--Page length options--> */}
            </div>
        </>
    )
}

export default Messages