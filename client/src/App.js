import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

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


    const firebaseConfig = {
      apiKey: process.env.apiKey,
      authDomain: "shopp-itt.firebaseapp.com",
      projectId: "shopp-itt",
      storageBucket: "shopp-itt.appspot.com",
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  async function getAllBlogs() {

    const res = await fetch("/show", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const data = await res.json();
    console.log('getALLblogs', data);
    console.table(data)
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
    let catAndCount = Object();//object with category with their count
    let arrAllCatForNav = [];//categot to show in  navbar

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
        if (!arrAllCatForNav.includes(blog.category)) arrAllCatForNav.push(blog.category);

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

        //for setting blogs by category
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

    console.log('arrAllCatForNav', arrAllCatForNav)
    //categories that are in navbar
    let catinnav = ["tech", "lifestyle", "business", "travel"];
    let finalArr = arrAllCatForNav.filter(function (item) {
        return !catinnav.includes(item);
    });


    //NOTE :: Remeber to reverse the arrays to show latest blog first


  //----------------------moving from notadmin so that both admin and notadmin has access to this---------------------------------------






  return (
    <BrowserRouter>

      <Routes>
        <Route path="/*" exact element={<NotAdmin allBlog={allBlog} allCategory={allCategory} featuredArray={featuredArray} techArray={techArray} sportsArray={sportsArray} todaysArray={todaysArray} catAndCount={catAndCount} politicsArray={politicsArray} finalArr={finalArr} trendingArray={trendingArray} popularArray={popularArray} storage={storage} />} />

        <Route path="/admin/*" exact element={<Admin allBlog={allBlog} allCategory={allCategory} catAndCount={catAndCount} storage={storage} />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
