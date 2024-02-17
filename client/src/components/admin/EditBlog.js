import React, { useState } from 'react'

import BlogForm from './BlogForm';
import LoaderAPI from '../../LoaderAPI';
import AdminTemplate from './withAdminTemplate';

const EditBlog = ({ state }) => {

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
                  <h6 className="fs-17 font-weight-600 mb-0">Update Blog</h6>
                </div>
                <div className="text-right">
                  <div className="actions">
                    <a href="/" className="action-item" onClick={(e) => window.location.reload()}><i
                      className="fas fa-refresh fa-sm"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <BlogForm
              componentName="edit"
              isGuest={isGuest}
              setShowLoader={setShowLoader}
              apiEndpoint="/admin/editblog"
            />
          </div>
        </div>
      </AdminTemplate>
      <LoaderAPI showLoader={showLoader} />
    </>
  )
}

export default EditBlog