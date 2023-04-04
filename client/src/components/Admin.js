import React from 'react'
import { Route, Routes } from "react-router-dom";

import "../assets/css/admin.css"

import Login from './admin/Login';
import Error from './notAdmin/Error';
import Sidebar from './admin/Sidebar';
import Dashboard from './admin/Dashboard';
import Messages from './admin/Messages';
import BlogsManagement from './admin/BlogsManagement';


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

            <Route path="/blogs-management" exact element={<BlogsManagement />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default Admin