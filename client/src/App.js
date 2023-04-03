import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toast, ToastContainer } from 'react-bootstrap'

import './App.css';


import Admin from './components/Admin';
import NotAdmin from './components/NotAdmin';


function App() {


  const [allBlog, setAllBlog] = useState([]);
  const [allCategory, setAllCategory] = useState();

  useEffect(() => {
    //move these two function to notadmin if none of these are called in admin secetion
    getAllBlogs()
    getAllCategory()
  }, [])


  async function getAllBlogs() {

    const res = await fetch("/show", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const data = await res.json();
    console.log('getALLblogs', data);
    setAllBlog(data)
  }

  async function getAllCategory() {
    const res = await fetch("/showCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    console.log('getALLcategory', data);
    setAllCategory(data)
  }



  return (
    <BrowserRouter>


      <Routes>
        <Route path="/*" exact element={<NotAdmin allBlog={allBlog} allCategory={allCategory} />} />
        <Route path="/admin/*" exact element={<Admin allBlog={allBlog} allCategory={allCategory} />} />
      </Routes>
      
      {/* <Route path="/" exact children={<Homepage allBlog={allBlog} allCategory={allCategory} />} /> */}
      {/* <Route path="/:id" exact component={SingleBlog} /> */}


    </BrowserRouter>
  );
}

export default App;
