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


const NotAdmin = () => {

    return (<>
        <Navbar />

        <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/:id" exact element={<SingleBlog />} />
            <Route path="/category/:id" exact element={<SingleCategory />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/post-your-blog" exact element={<PostBlog />} />
            <Route path="*" element={<Error />} />
        </Routes>

        <Footer />
    </>
    )
}

export default NotAdmin