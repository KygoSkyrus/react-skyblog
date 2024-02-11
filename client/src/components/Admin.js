/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";

import "../assets/css/admin.css"
import Login from './admin/Login';
import Error from './notAdmin/Error';

import ProtectedRoute from './admin/ProtectedRoute';

const Admin = (props) => {

  const { allBlog, allCategory, catAndCount, storage } = props
  let navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isGuest, setIsGuest] = useState(null);

  useEffect(() => {
    authenticateUser()
    // showTime()
  }, [isAuthenticated])

  async function authenticateUser() {
    fetch("/admin/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then(response => response.json())
      .then(data => {
        console.log('authenticateUser,', data)
        if (data.matched === true) {
          setIsAuthenticated(true)
          setIsGuest(data?.isGuest)
          // navigate("/admin/dashboard")
        } else if (data.matched === false) {
          setIsAuthenticated(false)
          setIsGuest(null)
          // navigate("/admin/login")
        }
      })
      .catch(err => console.log(err))
  }



  return (
    <>
      {/* moving login route out of the all admin things as it was showing sidebar on login */}
      {/* <Routes>
        <Route path="/login" exact element={<Login isAuthenticated={isAuthenticated} />} />
      </Routes> */}

      {/* <div id='adminView'>

        <Sidebar allCategory={allCategory} />

        <div className='dynamicAdminContent'>

          <main className="dashboard justify-content-between align-items-center">
            <h1 className="title">Dashboard</h1>
            <div id="MyClockDisplay" className="clock" ></div>
          </main> */}

      <Routes>
        <Route path="/login" exact element={<Login isAuthenticated={isAuthenticated} />} />

        <Route path="/dashboard" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="dashboard" state={{ isGuest, allCategory, allBlog, catAndCount }} />} />

        <Route path="/messages" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="messages" state={{ isGuest, allCategory }}></ProtectedRoute>} />

        <Route path="/blogs-management" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="blogs-management" state={{ isGuest, allCategory, storage }} />} />

        <Route path="/user-submitted-blogs" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="user-submitted-blogs" state={{ isGuest, allCategory }} />} />

        <Route path="/edit-blog/:id" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="edit-blog" state={{ isGuest, allBlog, allCategory, storage }} />} />

        <Route path="*" element={<Error />} />
      </Routes>
      {/* </div>
      </div> */}
    </>
  )
}

export default Admin