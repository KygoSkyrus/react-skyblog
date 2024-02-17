import React, { useEffect, useState } from 'react'

import { useToast } from '../ToastContext';
import AdminTemplate from './withAdminTemplate';
import LoaderAPI from '../../LoaderAPI';

const UserSubmittedBlogs = ({ state }) => {

    const { isGuest } = state;
    const { showToast } = useToast();
    const [userBlogs, setUserBlogs] = useState()
    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        getUserBlogs();
    }, [])

    async function getUserBlogs() {
        const res = await fetch("/admin/getUserSubmittedBlogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        const data = await res.json();
        setUserBlogs(data)
    }

    async function deleteBlog(id) {
        setShowLoader(true)
        await fetch("/admin/deleteUserSubmittedBlog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                setShowLoader(false)
                showToast(data.message)
                if (data.deletedCount > 0) {
                    window.location.reload()
                }
            })

    }

    async function publishBlog(id, e) {
        setShowLoader(true)
        let val;

        if (e.target.hasAttribute('checked')) {
            document.getElementById(`checkbox` + id).removeAttribute('checked')
            val = '1';
        } else if (e.target.getAttribute('data-status') === "1") {
            document.getElementById(`checkbox` + id).removeAttribute('1')
            document.getElementById(`checkbox` + id).setAttribute('checked', 'checked')
            val = 'checked';
        }
        
        fetch("/admin/publishBlog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id, val
            }),
        })
            .then(res => res.json())
            .then(data => {
                setShowLoader(false)
                showToast(data.message)
                if(data.isSet){
                    window.location.reload();
                }
            })
    }

    return (
        <>
            <AdminTemplate isGuest={isGuest} >
                <div className='body-content'>
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="fs-17 font-weight-600 mb-0">User Submitted Blogs</h6>
                                </div>
                                <div className="text-right">
                                    <div className="actions">
                                        <span onClick={e => window.location.reload()} className="action-item cursor-pointer"><i className="fas fa-refresh"></i></span>
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
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Type</th>
                                            <th>Image</th>
                                            <th>Description</th>
                                            <th>Content</th>
                                            <th>Author</th>
                                            <th>Date</th>
                                            <th>Publish</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">
                                        {userBlogs?.map((x, index) => {
                                            return (
                                                <tr key={x._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{x.title}</td>
                                                    <td>{x.category}</td>
                                                    <td>{x.type}</td>
                                                    <td>
                                                        <img src={x.image} className='rounded-sm' width="80px" alt='' />
                                                    </td>
                                                    <td>{x.shortdescription}</td>
                                                    <td>
                                                        <div style={{ height: "150px", overflow: "auto" }} dangerouslySetInnerHTML={{ __html: x?.detail }}></div>
                                                    </td>
                                                    <td>{x.authorname}</td>
                                                    <td>{x.date}</td>

                                                    <td><label className="switch"><input onClick={e => publishBlog(x._id, e)} id={"checkbox" + x._id} type="checkbox" defaultChecked={x.status === "checked" ? "defaultChecked" : false} data-status={x.status} /><span className="slider round"></span></label>
                                                    </td>
                                                    
                                                    <td style={{ display: "flex", border: "none", justifyContent: "center" }}><button onClick={e => deleteBlog(x._id, e)} style={{ background: "#d50606" }}><i className="fa fa-trash" ></i></button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminTemplate>
            <LoaderAPI showLoader={showLoader} />
        </>
    )
}

export default UserSubmittedBlogs