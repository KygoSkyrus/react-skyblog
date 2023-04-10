import React from 'react'
import { Route, Routes } from "react-router-dom";


import Homepage from './notAdmin/Homepage';
import Navbar from './notAdmin/Navbar';
import SingleBlog from './notAdmin/SingleBlog';
import Footer from './notAdmin/Footer';
import SingleCategory from './notAdmin/SingleCategory';
import Contact from './notAdmin/Contact';
import Error from './notAdmin/Error';
import PostBlog from './notAdmin/PostBlog';


const NotAdmin = (props) => {

    const { allBlog, allCategory ,featuredArray, techArray,sportsArray, todaysArray, catAndCount, politicsArray, finalArr, trendingArray, popularArray} = props

    return (<>
        <Navbar finalArr={finalArr} allBlog={allBlog} />

        <Routes>
            <Route path="/" exact element={<Homepage featuredArray={featuredArray} techArray={techArray} sportsArray={sportsArray} allBlog={allBlog} allCategory={allCategory} todaysArray={todaysArray} catAndCount={catAndCount} politicsArray={politicsArray} trendingArray={trendingArray} popularArray={popularArray} />} />
           
            <Route path="/:id" exact element={<SingleBlog allBlog={allBlog} catAndCount={catAndCount} allCategory={allCategory} />} />

            <Route path="/category/:id" exact element={<SingleCategory allBlog={allBlog} catAndCount={catAndCount} allCategory={allCategory} />} />

            <Route path="/contact" exact element={<Contact />} />

            <Route path="/post-your-blog" exact element={<PostBlog />} />

            <Route path="*" element={<Error />} />
            <Route path="/page-not-found" element={<Error />} />
        </Routes>

        <Footer finalArr={finalArr} />
    </>
    )
}

export default NotAdmin