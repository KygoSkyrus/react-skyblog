import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

import './App.css';
import Admin from './components/Admin';
import NotAdmin from './components/NotAdmin';
import Loader from './Loader';
import ScrollToTop from './ScrollToTop';//deals with the Link to restore scroll
import Toast from './components/Toast';

import { ToastProvider } from './components/ToastContext';

export const BlogContext = createContext()

function App() {
  const [allBlog, setAllBlog] = useState();//remove this to show loader
  const [allCategory, setAllCategory] = useState();
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    document.getElementById('root').classList.add('overflow')
    setIsLoaded(true)
    getAllBlogs()
    getAllCategory()
  }, [])

  //-------------------- FIREBASE INITIALIZE -----------------------
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
  //-------------------- FIREBASE INITIALIZE -----------------------

  async function getAllBlogs() {
    const res = await fetch("/getallblogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const data = await res.json();
    setAllBlog(data)
    setIsLoaded(false)
    document.getElementById('root').classList.remove('overflow')
  }

  async function getAllCategory() {
    const res = await fetch("/getallcategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    setAllCategory(data)
  }

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


  let filteredBlogs = [];
  //looping over the array of blogs [only loop here]
  allBlog?.forEach(blog => {

    if (blog.status !== '1') filteredBlogs.push(blog);//collecting blogs that are marked visible only

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

  //categories that are in navbar
  let catinnav = ["tech", "lifestyle", "business", "travel"];
  let finalArr = arrAllCatForNav.filter(function (item) {
    return !catinnav.includes(item);
  });

  //NOTE :: Remeber to reverse the arrays to show latest blog first

  return (
    <>
      {allBlog ?
        <BlogContext.Provider value={{
          allBlog: filteredBlogs,
          unFilteredBlogs: allBlog,
          allCategory: allCategory,
          featuredArray: featuredArray,
          techArray: techArray,
          sportsArray: sportsArray,
          todaysArray: todaysArray,
          catAndCount: catAndCount,
          politicsArray: politicsArray,
          finalArr: finalArr,
          trendingArray: trendingArray,
          popularArray: popularArray,
          storage: storage,
          isLoaded: isLoaded,
        }}>
          <ToastProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/*" exact element={<NotAdmin
                // allBlog={filteredBlogs} allCategory={allCategory} featuredArray={featuredArray} techArray={techArray} sportsArray={sportsArray} todaysArray={todaysArray} catAndCount={catAndCount} politicsArray={politicsArray} finalArr={finalArr} trendingArray={trendingArray} popularArray={popularArray} storage={storage} 
                />} />

                <Route path="/admin/*" exact element={<Admin 
                // allBlog={allBlog} allCategory={allCategory} catAndCount={catAndCount} storage={storage} isLoaded={isLoaded} 
                />} />
              </Routes>
            </BrowserRouter>
            <Toast />
          </ToastProvider>
        </BlogContext.Provider>
        :
        <Loader isLoaded={isLoaded} />}

    </>
  )
}

export default App;
