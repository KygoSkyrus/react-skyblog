import React from 'react'
import {  Route, Routes } from "react-router-dom";

import "../assets/css/admin.css"

import Login from './admin/Login';
import Error from './notAdmin/Error';
import Sidebar from './admin/Sidebar';
import Dashboard from './admin/Dashboard';


const Admin = () => {


  return (
    <>

<Sidebar/>

    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/dashboard" exact element={<Dashboard />} />

      <Route path="*"  element={<Error />} />
    </Routes>
    
    </>
  )
}

export default Admin