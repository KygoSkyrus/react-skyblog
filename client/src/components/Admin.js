import React from 'react'
import { Route, Routes } from "react-router-dom";

import "../assets/css/admin.css"

import Login from './admin/Login';
import Error from './notAdmin/Error';
import Sidebar from './admin/Sidebar';
import Dashboard from './admin/Dashboard';
import Messages from './admin/Messages';
import BlogsManagement from './admin/BlogsManagement';
import UserSubmittedBlogs from './admin/UserSubmittedBlogs';
import EditBlog from './admin/EditBlog';


const Admin = (props) => {

  const { allBlog, allCategory, catAndCount } = props
  return (
    <>

      <div id='adminView'>
        
        <Sidebar allCategory={allCategory} />

        <div className='dynamicAdminContent'>

          <main className="dashboard">
            <h1 className="title">Dashboard</h1>
          </main>




          <Routes>
            <Route path="/login" exact element={<Login />} />

            <Route path="/dashboard" exact element={<Dashboard allCategory={allCategory} catAndCount={catAndCount} />} />

            <Route path="/messages" exact element={<Messages />} />

            <Route path="/blogs-management" exact element={<BlogsManagement allBlog={allBlog} allCategory={allCategory} />} />

            <Route path="/user-submitted-blogs" exact element={<UserSubmittedBlogs />} />

            <Route path="/edit-blog/:id" exact element={<EditBlog />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Admin