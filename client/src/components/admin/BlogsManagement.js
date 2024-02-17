import React, { useState } from 'react'

import BlogForm from './BlogForm';
import LoaderAPI from '../../LoaderAPI';
import AdminTemplate from './withAdminTemplate';

const BlogsManagement = ({ state }) => {

    const { isGuest } = state;
    const [showLoader, setShowLoader] = useState(false)

    return (
        <>
            <AdminTemplate isGuest={isGuest} >
                <div className="body-content">
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="fs-17 font-weight-600 mb-0">Post a Blog</h6>
                                </div>
                                <div className="text-right">
                                    <div className="actions">
                                        <span onClick={e => window.location.reload()} className="action-item cursor-pointer" >
                                            <i className="fas fa-refresh"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BlogForm
                            apiEndpoint="/admin/addBlog"
                            setShowLoader={setShowLoader}
                            componentName="add"
                            isGuest={isGuest}
                        />
                    </div>
                </div>
            </AdminTemplate>
            <LoaderAPI showLoader={showLoader} />
        </>
    )
}

export default BlogsManagement