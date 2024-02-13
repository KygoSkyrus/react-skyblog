/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";

import "../assets/css/admin.css"
import Login from './admin/Login';
import Error from './notAdmin/Error';
import ProtectedRoute from './admin/ProtectedRoute';

const Admin = () => {

  let navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isGuest, setIsGuest] = useState(null);

  useEffect(() => {
    authenticateUser()
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
      <Routes>
        <Route path="/login" exact element={<Login isAuthenticated={isAuthenticated} />} />

        <Route path="/dashboard" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="dashboard"
          state={{ isGuest }} />} />

        <Route path="/messages" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="messages" state={{ isGuest }}></ProtectedRoute>} />

        <Route path="/blogs-management" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="blogs-management" state={{ isGuest }} />} />

        <Route path="/user-submitted-blogs" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="user-submitted-blogs" state={{ isGuest }} />} />

        <Route path="/edit-blog/:id" exact element={<ProtectedRoute isAuthenticated={isAuthenticated} route="edit-blog" state={{ isGuest }} />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default Admin