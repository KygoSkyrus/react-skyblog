import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../ToastContext';
import { BlogContext } from '../../App';
import LoaderAPI from '../../LoaderAPI';
import AdminTemplate from './withAdminTemplate';

const Dashboard = ({ state }) => {

    const { isGuest } = state;
    const { showToast } = useToast();
    const { unFilteredBlogs, allCategory, catAndCount } = useContext(BlogContext);
    const [showLoader, setShowLoader] = useState(false)

    async function blogVisibility(id, e) {
        setShowLoader(true)
        //checked attribute means its on and 1 or data="false" means its off
        let val;

        if (e.target.hasAttribute('checked')) {
            document.getElementById(`checkbox` + id).removeAttribute('checked')
            val = '1';
        } else if (e.target.getAttribute('data-status') === "1") {
            document.getElementById(`checkbox` + id).removeAttribute('1')
            document.getElementById(`checkbox` + id).setAttribute('checked', 'checked')
            val = 'checked';
        }

        fetch("/admin/setBlogVisibility", {
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
                if (data.isSet) {
                    window.location.reload();
                }
            })
    }

    async function deleteBlog(id) {
        setShowLoader(true)
        fetch("/admin/deleteblog", {
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
                if (data.isDeleted) {
                    window.location.reload();
                }
            })
    }


    return (
        <>
            <AdminTemplate isGuest={isGuest} >
                <div className="body-content">

                    {/* Category Starts */}
                    <div className="card-header mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fs-17 font-weight-600 mb-0 cursor-pointer dropdown-toggle" data-toggle="collapse" href="#boxesHolder" role="button" aria-expanded="false" aria-controls="boxesHolder">CATEGORIES</h6>
                            </div>
                            <div className="text-right">
                                <div className="actions">
                                    <Link to="" className="action-item" onClick={e => window.location.reload()} title='reload' ><i className="fas fa-refresh"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row collapse mb-4" id="boxesHolder" >
                        {
                            allCategory?.map(x => {
                                return (
                                    <div className="col-md-6 col-lg-3" key={x._id}>
                                        <div className="d-flex flex-column p-3 mb-3 bg-white shadow-sm rounded">
                                            <div className="header-pretitle text-muted fs-11 font-weight-bold text-uppercase mb-2">{x.category}</div>
                                            <div className="d-flex align-items-center text-size-3">
                                                <div className="text-monospace">
                                                    <span className="text-size-2 fw-bolder me-2">{catAndCount[x.category] ? catAndCount[x.category] : 0}</span>
                                                </div>
                                                <span className=" text-danger ml-2">Blogs</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* Category Ends */}

                    {/* Blogs Starts */}
                    <div className='card mb-4'>
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="fs-17 font-weight-600 mb-0 cursor-pointer dropdown-toggle" data-toggle="collapse" href="#blogBody" role="button" aria-expanded="false" aria-controls="blogBody">Blogs</h6>
                                </div>
                                <div className="text-right">
                                    <div className="actions">
                                        <span onClick={e => window.location.reload()} title='reload' className="action-item cursor-pointer"><i className="fas fa-refresh"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-body collapse" id='blogBody'>
                            <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover column-rendering">
                                    <thead>
                                        <tr>
                                            <th>S. No.</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Type</th>
                                            <th>Image</th>
                                            <th>Visibility</th>
                                            <th>Edit/Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">

                                        {unFilteredBlogs?.map((x, index) => {

                                            return (
                                                <tr key={x._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{x.title}</td>
                                                    <td>{x.category}</td>
                                                    <td>{x.type}</td>
                                                    <td>
                                                        <img src={x.image} className='rounded-sm' width="80px" alt='' />
                                                    </td>
                                                    <td><label className="switch"><input onClick={e => blogVisibility(x._id, e)} id={"checkbox" + x._id} type="checkbox" defaultChecked={x.status === "checked" ? "defaultChecked" : false} data-status={x.status} /><span className="slider round"></span></label>
                                                    </td>
                                                    <td style={{ display: "flex", border: "none", justifyContent: "center" }}><Link to={"/admin/edit-blog/" + x.url} ><button style={{ background: "#09660c" }}><i className="fa fa-pen"></i></button></Link><button onClick={e => deleteBlog(x._id, e)} style={{ background: "#d50606" }}><i className="fa fa-trash" ></i></button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Blogs Ends */}

                </div>
            </AdminTemplate>
            <LoaderAPI showLoader={showLoader} />
        </>
    )
}

export default Dashboard