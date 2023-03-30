import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Toast, ToastContainer } from 'react-bootstrap'

import './App.css';



import Homepage from './components/Homepage';

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
      
  
     <Homepage allBlog={allBlog} allCategory={allCategory} />
        


        {/* <Route path="/success" component={Success}>
          <Success />
        </Route>

        <Route path="/failed" component={Failed}>
          <Failed />
        </Route> */}

      </div>
    </Router>
  );
}

export default App;
