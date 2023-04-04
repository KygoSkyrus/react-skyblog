import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Homepage from './notAdmin/Homepage';
import Navbar from './notAdmin/Navbar';
import SingleBlog from './notAdmin/SingleBlog';
import Footer from './notAdmin/Footer';
import SingleCategory from './notAdmin/SingleCategory';
import Contact from './notAdmin/Contact';
import Error from './notAdmin/Error';
import PostBlog from './notAdmin/PostBlog';

const NotAdmin = (props) => {

    const { allBlog, allCategory ,featuredArray, techArray,sportsArray, todaysArray, catAndCount, politicsArray, finalArr} = props

    

    // console.log('allBlofgs in homepge porops', allBlog)
    // let catAndCount = new Object;//object with category with their count
    // let arrAllCatForNva = [];//categot to show in  navbar

    // //blogs sorted by their type
    // let featuredArray = [];
    // let popularArray = [];
    // let trendingArray = [];
    // let todaysArray = [];
    // //blogs sorted by their categories
    // var techArray = [];
    // var politicsArray = [];
    // var sportsArray = [];



    // //looping over the array of blogs [only loop here]
    // allBlog?.forEach(blog => {

    //     //calculating all category and their count
    //     if (catAndCount[blog.category]) {
    //         catAndCount[blog.category] = ++catAndCount[blog.category]
    //     } else {
    //         catAndCount[blog.category] = 1
    //     }

    //     //category to show in  navbar
    //     if (!arrAllCatForNva.includes(blog.category)) arrAllCatForNva.push(blog.category);

    //     //footer categories are same as navbar's

    //     //for setting blogs by their type
    //     switch (blog.type) {
    //         case "featured blogs": featuredArray.push(blog)
    //             break;
    //         case "popular blogs": popularArray.push(blog)
    //             break;
    //         case "trending blogs": trendingArray.push(blog)
    //             break;
    //         case "todays blogs": todaysArray.push(blog)
    //             break;
    //         default:
    //             break;
    //     }

    //     //for setting blogs by categiry
    //     switch (blog.category) {
    //         case "tech": techArray.push(blog)
    //             break;
    //         case "sports": sportsArray.push(blog)
    //             break;
    //         case "politics": politicsArray.push(blog)
    //             break;
    //         default:
    //             break;
    //     }
    // });

    // console.log('arrAllCatForNva', arrAllCatForNva)
    // //categories that are in navbar
    // let catinnav = ["tech", "lifestyle", "business", "travel"];
    // let finalArr = arrAllCatForNva.filter(function (item) {
    //     return !catinnav.includes(item);
    // });


   

    // //remeber to reverse the arrays to show latest blog first

    // //for setting blogs in different categories and show on homepage
    // var hero = ""; //(banner)//hero element will have one of each categories [rememner not tp repeat blogs on homepage];;try picking every blogs by type arry and its be like poplararr[populararr.length-1]

    // console.log(featuredArray);
    // console.log(popularArray);
    // console.log(trendingArray);
    // console.log(todaysArray);
    // console.log(techArray, politicsArray, sportsArray);

 function setDateOnNav() {
        var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let mm = months[month - 1];
        let newdate = mm + " " + day + ", " + year;
        document.getElementById("date").innerText = newdate;
    }


    return (<>
        {/* {arrAllCatForNva ? <Navbar arrAllCatForNva={arrAllCatForNva} /> : ""} */}
        <Navbar finalArr={finalArr} />

        <Routes>
            <Route path="/" exact element={<Homepage featuredArray={featuredArray} techArray={techArray} sportsArray={sportsArray} allBlog={allBlog} allCategory={allCategory} todaysArray={todaysArray} catAndCount={catAndCount} politicsArray={politicsArray} />} />
           
            <Route path="/:id" exact element={<SingleBlog allBlog={allBlog} catAndCount={catAndCount} allCategory={allCategory} />} />

            <Route path="/category/:id" exact element={<SingleCategory allBlog={allBlog} catAndCount={catAndCount} allCategory={allCategory} />} />

            <Route path="/contact" exact element={<Contact />} />

            <Route path="/post-your-blog" exact element={<PostBlog />} />

            <Route path="/not-found" exact element={<Error />} />

        </Routes>

        <Footer finalArr={finalArr} />
    </>
    )
}

export default NotAdmin