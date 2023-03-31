import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
// import { Toast, ToastContainer } from 'react-bootstrap'

import './App.css';



import Homepage from './components/Homepage';
import SingleBlog from "./components/SingleBlog"
function App() {


  const [allBlog, setAllBlog] = useState([]);
  const [allCategory,setAllCategory]=useState();

  useEffect(() => {
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
      console.log('getALLblogs',data);
      setAllBlog(data)
  }

  async function getAllCategory() {
      const res = await fetch("/showCategory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
      });
      const data = await res.json();
      console.log('getALLcategory',data);
      setAllCategory(data)
  }

  

  return (
    <Router>
      <div className="App">
      
  
    




<Route path="/" exact children={<Homepage allBlog={allBlog} allCategory={allCategory} />} />

<Route path="/:id" component={SingleBlog} />



     

      </div>
    </Router>
  );
}

export default App;
