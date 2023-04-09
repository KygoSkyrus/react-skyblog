import React, { useEffect, useState } from 'react'

const UserSubmittedBlogs = () => {


    //in this add a add button for blogs,,it will be like visiblity switch,,,when ne it means it will be added to the adminb blogs
    //add the deleted and add api to backend and think about edit,,,not a good idea to edit the blog,,,leave it

    const [userBlogs, setUserBlogs] = useState()

    useEffect(() => {
        getUserBlogs();
    }, [])


    async function getUserBlogs() {

        const res = await fetch("/usersubmittedblogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        const data = await res.json();
        setUserBlogs(data)
        console.log("messages", data);
    }


    return (
        <>

            <div className='body-content'>

                <div className="card mb-4">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fs-17 font-weight-600 mb-0">Posted Blogs</h6>
                            </div>
                            <div className="text-right">
                                <div className="actions">
                                    <a href="" className="action-item"><i className="fas fa-refresh"></i></a>
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
                                        <th>Visibility</th>
                                        <th>Edit/Delete</th>
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
                                                <td>{x.image}</td>
                                                <td><label className="switch"><input onClick="blogVisibility('${data[i]._id}',event)" id="checkbox${data[i]._id}" type="checkbox" checked={x.status} /><span className="slider round"></span></label>
                                                </td>
                                                <td style={{display: "flex",border: "none",justifyContent: "center"}}><a href="/admin/blog-edit/${data[i].url
                    }" target="blank" ><button style={{background: "#09660c"}}><i className="fa fa-pen"></i></button></a><button onClick='deleteBlog("${data[i]._id}")' style={{background: "#d50606"}}><i className="fa fa-trash" ></i></button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default UserSubmittedBlogs