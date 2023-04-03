import React, { useEffect, useState } from 'react'

import CategoryList from './CategoryList';
import Navbar from './Navbar';
import Footer from './Footer';
import BlogWrapperInside from './BlogWrapperInside';
import BlogWrapperRight from './BlogWrapperRight';
import BlogWrapperBottom from './BlogWrapperBottom';
import OtherBlogsComp from './OtherBlogsComp';

const Homepage = (props) => {

const {featuredArray, techArray,sportsArray,allBlog,allCategory,todaysArray,catAndCount,politicsArray}=props

    return (
        <>
            {/* {arrAllCatForNva ? <Navbar arrAllCatForNva={arrAllCatForNva} /> : ""} */}

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
				<OtherBlogsComp allBlog={allBlog} />
                </div>
                </div>
			</div>
		</div>
	</section>
	{/* <!-- News Today End --> */}


<div className='col-lg-3'>
    <div className='row'>{allBlog && allCategory ? <CategoryList catAndCount={catAndCount} allCategory={allCategory} /> : ""}</div></div>
            

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

            

        </>
    )
}

export default Homepage