import React, { useEffect, useState } from 'react'
import CategoryList from './CategoryList';
import Footer from './Footer';
import Navbar from './Navbar';

const Homepage = (props) => {

    const { allBlog, allCategory } = props
console.log('allBlofgs in homepge porops',allBlog)
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

    //remeber to reverse the arrays to show latest blog first

    //for setting blogs in different categories and show on homepage
    var hero = ""; //(banner)//hero element will have one of each categories [rememner not tp repeat blogs on homepage];;try picking every blogs by type arry and its be like poplararr[populararr.length-1]

    console.log(featuredArray);
    console.log(popularArray);
    console.log(trendingArray);
    console.log(todaysArray);
    console.log(techArray, politicsArray, sportsArray);


    return (
        <>
            {arrAllCatForNva ? <Navbar arrAllCatForNva={arrAllCatForNva} /> : ""}

            <div>
                {allBlog?.map(x => {
                    return (
                        <div key={x._id} className="bg-dark m-2 text-light">
                            <a href={"/" + x.url}>
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

            <section class="t-pt-70 t-pb-70">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 t-mb-30 mb-lg-0">
                            <div class="row">
                                <div class="col-lg-4 t-mb-30 mb-lg-0">
                                    <div class="row">
                                        <div class="col-12 t-mb-30">
                                            <div class="section-title">
                                                <div class="tag tag--skew tag-delta d-inline-block">
                                                    <h5 class="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                                        technology
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tech">
                                            {techArray?.map(x => {
                                                return (
                                                    <div class="col-12 t-mt-30 t-mb-30" key={x._id}>
                                                        <div class="post post--right">
                                                            <div class="post--right-img t-flex-100 t-mr-16">
                                                                <img src={x.image} alt="blog" class="img-fluid w-100" />
                                                            </div>
                                                            <div class="post--right-content t-flex-100">
                                                                <ul class="list d-flex align-items-center">
                                                                    <li class="t-mr-16">
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--light tag tag--skew ${catClr} text-uppercase">
                                                                            <span class="tag__skew-reverse">
                                                                                {x.category}
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                    <li class="d-none d-md-flex">
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--secondary ex-sm-text text-capitalize">
                                                                            <span class="las la-calendar-alt m-text"></span>
                                                                            {x.date}
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <h5 class="post__title post__title-xmin t-mt-10 t-mb-10">
                                                                    <a target="blank" href="/${catArray[i].url}" class="t-link t-link--secondary">
                                                                        {x.title}
                                                                    </a>
                                                                </h5>
                                                                <ul class="list d-none d-md-flex align-items-center">
                                                                    <li>
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--secondary ex-sm-text text-capitalize">
                                                                            <span class="las la-clock sm-text"></span>
                                                                            10 min read
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 t-mb-30 mb-lg-0">
                                    <div class="row">
                                        <div class="col-12 t-mb-30">
                                            <div class="section-title">
                                                <div class="tag tag--skew tag-delta d-inline-block">
                                                    <h5 class="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                                        politics
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="politics">
                                            {politicsArray?.map(x => {
                                                return (
                                                    <div class="col-12 t-mt-30 t-mb-30" key={x._id}>
                                                        <div class="post post--right">
                                                            <div class="post--right-img t-flex-100 t-mr-16">
                                                                <img src={x.image} alt="blog" class="img-fluid w-100" />
                                                            </div>
                                                            <div class="post--right-content t-flex-100">
                                                                <ul class="list d-flex align-items-center">
                                                                    <li class="t-mr-16">
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--light tag tag--skew ${catClr} text-uppercase">
                                                                            <span class="tag__skew-reverse">
                                                                                {x.category}
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                    <li class="d-none d-md-flex">
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--secondary ex-sm-text text-capitalize">
                                                                            <span class="las la-calendar-alt m-text"></span>
                                                                            {x.date}
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <h5 class="post__title post__title-xmin t-mt-10 t-mb-10">
                                                                    <a target="blank" href="/${catArray[i].url}" class="t-link t-link--secondary">
                                                                        {x.title}
                                                                    </a>
                                                                </h5>
                                                                <ul class="list d-none d-md-flex align-items-center">
                                                                    <li>
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--secondary ex-sm-text text-capitalize">
                                                                            <span class="las la-clock sm-text"></span>
                                                                            10 min read
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-4 t-mb-30 mb-lg-0">
                                    <div class="row">
                                        <div class="col-12 t-mb-30">
                                            <div class="section-title">
                                                <div class="tag tag--skew tag-delta d-inline-block">
                                                    <h5 class="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                                        sports
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="sports">
                                            {sportsArray?.map(x => {
                                                return (
                                                    <div class="col-12 t-mt-30 t-mb-30" key={x._id}>
                                                        <div class="post post--right">
                                                            <div class="post--right-img t-flex-100 t-mr-16">
                                                                <img src={x.image} alt="blog" class="img-fluid w-100" />
                                                            </div>
                                                            <div class="post--right-content t-flex-100">
                                                                <ul class="list d-flex align-items-center">
                                                                    <li class="t-mr-16">
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--light tag tag--skew ${catClr} text-uppercase">
                                                                            <span class="tag__skew-reverse">
                                                                                {x.category}
                                                                            </span>
                                                                        </a>
                                                                    </li>
                                                                    <li class="d-none d-md-flex">
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--secondary ex-sm-text text-capitalize">
                                                                            <span class="las la-calendar-alt m-text"></span>
                                                                            {x.date}
                                                                        </a>
                                                                    </li>
                                                                </ul>

                                                                <h5 class="post__title post__title-xmin t-mt-10 t-mb-10">
                                                                    <a target="blank" href="/${catArray[i].url}" class="t-link t-link--secondary">
                                                                        {x.title}
                                                                    </a>
                                                                </h5>
                                                                <ul class="list d-none d-md-flex align-items-center">
                                                                    <li>
                                                                        <a target="blank" href="/${catArray[i].url}"
                                                                            class="t-link t-link--secondary ex-sm-text text-capitalize">
                                                                            <span class="las la-clock sm-text"></span>
                                                                            10 min read
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    )
}

export default Homepage