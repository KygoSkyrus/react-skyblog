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


  //---------------------moving from notadmin so that both admin and notadmin has access to this---------------------------------------
  console.log('allBlofgs in homepge porops', allBlog)
    let catAndCount = new Object;//object with category with their count
    let arrAllCatForNva = [];//categot to show in  navbar

    //blogs sorted by their type
    let featuredArray = [];
    let popularArray = [];
    let trendingArray = [];
    let todaysArray = [];
    //blogs sorted by their categories
    var techArray = [];
    var politicsArray = [];
    var sportsArray = [];


    //looping over the array of blogs [only loop here]
    allBlog?.forEach(blog => {

        //calculating all category and their count
        if (catAndCount[blog.category]) {
            catAndCount[blog.category] = ++catAndCount[blog.category]
        } else {
            catAndCount[blog.category] = 1
        }

        //category to show in  navbar
        if (!arrAllCatForNva.includes(blog.category)) arrAllCatForNva.push(blog.category);

        //footer categories are same as navbar's

        //for setting blogs by their type
        switch (blog.type) {
            case "featured blogs": featuredArray.push(blog)
                break;
            case "popular blogs": popularArray.push(blog)
                break;
            case "trending blogs": trendingArray.push(blog)
                break;
            case "todays blogs": todaysArray.push(blog)
                break;
            default:
                break;
        }

        //for setting blogs by categiry
        switch (blog.category) {
            case "tech": techArray.push(blog)
                break;
            case "sports": sportsArray.push(blog)
                break;
            case "politics": politicsArray.push(blog)
                break;
            default:
                break;
        }
    });

    console.log('arrAllCatForNva', arrAllCatForNva)
    //categories that are in navbar
    let catinnav = ["tech", "lifestyle", "business", "travel"];
    let finalArr = arrAllCatForNva.filter(function (item) {
        return !catinnav.includes(item);
    });


    //remeber to reverse the arrays to show latest blog first

    //for setting blogs in different categories and show on homepage
    var hero = ""; //(banner)//hero element will have one of each categories [rememner not tp repeat blogs on homepage];;try picking every blogs by type arry and its be like poplararr[populararr.length-1]

  //----------------------moving from notadmin so that both admin and notadmin has access to this---------------------------------------






  return (
    <BrowserRouter>


      <Routes>
        <Route path="/*" exact element={<NotAdmin allBlog={allBlog} allCategory={allCategory} featuredArray={featuredArray} techArray={techArray} sportsArray={sportsArray} todaysArray={todaysArray} catAndCount={catAndCount} politicsArray={politicsArray} finalArr={finalArr} />} />
        <Route path="/admin/*" exact element={<Admin allBlog={allBlog} allCategory={allCategory} catAndCount={catAndCount} />} />
      </Routes>
      
      {/* <Route path="/" exact children={<Homepage allBlog={allBlog} allCategory={allCategory} />} /> */}
      {/* <Route path="/:id" exact component={SingleBlog} /> */}


    </BrowserRouter>
  );
}

export default App;
