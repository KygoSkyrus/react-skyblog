import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList';
import Navbar from './Navbar';

const Homepage = (props) => {

    const { allBlog, allCategory } = props

    let catAndCount = new Object;//object with category with their count
    let arrAllCatForNva = [];//categot to show in  navbar


    //looping over the array of blogs [only loop here]
    allBlog.forEach(blog => {


        //calculating all category and their count
        if (catAndCount[blog.category]) {
            catAndCount[blog.category] = ++catAndCount[blog.category]
        } else {
            catAndCount[blog.category] = 1
        }

        //category to show in  navbar
        arrAllCatForNva.push(blog.category);

        //fotter categories are same as navbar's
    });


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









    return (
        <>
            {arrAllCatForNva ? <Navbar arrAllCatForNva={arrAllCatForNva} /> : ""}

            <div>
                {allBlog?.map(x => {
                    return (
                        <div key={x._id} className="bg-dark m-2 text-light">
                            <a href={"/" + x.title}>
                                <img src={x.image} alt={x.title} />
                                <span>{x.title}</span>
                                <section>{x.shortdescription}</section>
                                <span>{x.authorname}</span>
                                <span>{x.detail}</span>
                                <span>{x.date}</span>
                            </a>
                        </div>
                    )
                })}
            </div>

            {allBlog && allCategory ? <CategoryList catAndCount={catAndCount} allCategory={allCategory} /> : ""}

            <div>
                <p>Composite</p>
                <div></div>
            </div>

        </>
    )
}

export default Homepage