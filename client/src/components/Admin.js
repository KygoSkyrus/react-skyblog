import React, { useEffect } from 'react'
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

  useEffect(()=>{
    showTime()
  },[])

  function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h === 0){
        h = 12;
    }
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    if(h === 12){
      session = "PM";
  }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}
  return (
    <>

      <div id='adminView'>

        <Sidebar allCategory={allCategory} />

        <div className='dynamicAdminContent'>

          <main className="dashboard d-flex justify-content-between align-items-center">
            <h1 className="title">Dashboard</h1>
            <div id="MyClockDisplay" className="clock" onload="showTime()"></div>
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