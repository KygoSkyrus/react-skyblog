import React, { useEffect, useState } from 'react'

import CategoryList from './CategoryList';
import Navbar from './Navbar';
import Footer from './Footer';
import BlogWrapperInside from './BlogWrapperInside';
import BlogWrapperRight from './BlogWrapperRight';
import BlogWrapperBottom from './BlogWrapperBottom';

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

        {/* <!-- Hero  --> */}
		<div class="hero t-mt-30">
			<div class="container">
				<div class="row" id="hero">
                    <div class="col-md-6 t-mb-30 mb-md-0">
						<div class="row">
                            <BlogWrapperInside data={featuredArray[featuredArray.length-1]} />
                            <BlogWrapperInside data={featuredArray[featuredArray.length-1]} />							
						</div>
					</div>
					<div class="col-md-6">
						<div class="row">
                        <BlogWrapperInside data={featuredArray[featuredArray.length-1]} />	
                        <BlogWrapperInside data={featuredArray[featuredArray.length-1]} />
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* <!-- Hero End --> */}


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



            {/* <!-- News Today  --> */}
	<section class="t-pb-70 t-pt-70">
		<div class="container">
			<div class="row">
				<div class="col-lg-9 t-mb-30 mb-lg-0">
					<div class="row">
						<div class="col-12">
							<div class="section-title t-mb-30">
								<div class="tag tag--skew tag-delta d-inline-block">
									<h5 class="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
										today's news
									</h5>
								</div>
							</div>
						</div>
						<div id="todays" class="row">



                        <div class="col-lg-8 t-mb-30 mb-lg-0">
								<BlogWrapperBottom data={todaysArray[todaysArray.length-1]} />
							</div>

							<div class="col-lg-4">
								<div class="row">
									<div class="col-12 t-mb-30">
                                     {todaysArray[todaysArray.length-2]?<BlogWrapperBottom data={todaysArray[todaysArray.length-2]} displayRead='d-none' displayDesc='d-none' />:<BlogWrapperBottom data={todaysArray[todaysArray.length-1]} displayRead='d-none' displayDesc='d-none' />}  
									</div>
									<div class="col-12">
                                    {todaysArray[todaysArray.length-3]?<BlogWrapperBottom data={todaysArray[todaysArray.length-3]} displayRead='d-none' displayDesc='d-none' />:<BlogWrapperBottom data={todaysArray[todaysArray.length-1]} displayRead='d-none' displayDesc='d-none' />}  	
    								</div>
								</div>
							</div>



						</div>
					</div>
				</div>
				<div class="col-lg-3">
					<div class="row">
						<div class="col-12">
							<div class="section-title">
								<div class="tag tag--skew tag-delta d-inline-block">
									<h5 class="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
										other news
									</h5>
								</div>
							</div>
						</div>
						<div class="col-12 t-mt-30">
							
                            {allBlog?.slice(allBlog.length-4, allBlog.length).map(x => {
                                                return (
                                                    <BlogWrapperRight data={x} key={x._id} displayCategory='d-none' displayRead='d-none' />
                                                )
                                            })}
						</div>
						<div class="col-12 t-mt-30">
							<a href="/" class="t-link">
								<img src="https://picsum.photos/300/300" alt="blog" class="img-fluid w-100" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	{/* <!-- News Today End --> */}


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
                                            {techArray?.slice(techArray.length-3, techArray.length).map(x => {
                                                return (
                                                    <BlogWrapperRight data={x} key={x._id} />
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
                                            {politicsArray?.slice(politicsArray.length-3, politicsArray.length).map(x => {
                                                return (
                                                    <BlogWrapperRight data={x} key={x._id} />
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
                                            {sportsArray?.slice(sportsArray.length-3, sportsArray.length).map(x => {
                                                return (
                                                    <BlogWrapperRight data={x} key={x._id} />
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