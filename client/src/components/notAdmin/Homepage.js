import React from 'react'

import BlogWrapperInside from './BlogWrapperInside';
import BlogWrapperRight from './BlogWrapperRight';
import BlogWrapperBottom from './BlogWrapperBottom';
import OtherBlogsComp from './OtherBlogsComp';
import CategoryList from './CategoryList';
import BlogWrapperRight2 from './BlogWrapperRight2';

const Homepage = (props) => {

    const { allBlog, allCategory, catAndCount, techArray, sportsArray, politicsArray, todaysArray, featuredArray, trendingArray, popularArray } = props

    return (
        <>

            {/* <!-- Hero  --> */}
            <div className="hero t-mt-30 t-pt-30">
                <div className="container">
                    <div className="row whiteAnchor " id="hero">
                        <div className="col-md-6 mb-md-0" >
                            <div className="row">
                                <BlogWrapperInside data={sportsArray[sportsArray.length - 1]} height={"height400"} />
                                <BlogWrapperInside data={techArray[techArray.length - 1]} height={"height300"} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <BlogWrapperInside data={politicsArray[politicsArray.length - 1]} height={"height300"} />
                                <BlogWrapperInside data={allBlog[allBlog.length - 2]} height={"height400"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Hero End --> */}



            {/* looks good ,logic is in place  just need more blog of type -atleast 3*/}
            {/* <!-- News Today  --> */}
            <section className="t-pb-70 t-pt-70 theSection">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 t-mb-30 mb-lg-0">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title t-mb-30">
                                        <div className="tag tag--skew tag-delta d-inline-block">
                                            <h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                                today's blogs
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div id="todays" className="row">
                                    <div className="col-lg-8 t-mb-30 mb-lg-0">
                                        <BlogWrapperBottom data={todaysArray[todaysArray.length - 1]} displayDetail='d-none' />
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="row">
                                            <div className="col-12 t-mb-30">
                                                {todaysArray[todaysArray.length - 2] ? <BlogWrapperBottom data={todaysArray[todaysArray.length - 2]} displayRead='d-none' displayDesc='d-none' displayDetail='d-none' /> : <BlogWrapperBottom data={todaysArray[todaysArray.length - 1]} displayRead='d-none' displayDesc='d-none' displayDetail='d-none' />}
                                            </div>
                                            <div className="col-12">
                                                {todaysArray[todaysArray.length - 3] ? <BlogWrapperBottom data={todaysArray[todaysArray.length - 3]} displayRead='d-none' displayDesc='d-none' displayDetail='d-none' /> : <BlogWrapperBottom data={todaysArray[todaysArray.length - 1]} displayRead='d-none' displayDesc='d-none' displayDetail='d-none' />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 marginTop pxIsZero">
                            <div className="row">
                                <OtherBlogsComp allBlog={allBlog} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- News Today End --> */}



            {/* looks good ,logic is in place  just need more blog of type -atleast 5*/}
            {/* <!-- Popular Blogs Start --> */}
            <section className="t-pt-70 t-pb-70 t-bg-secondary ">
                <div className="container">
                    <div className="row t-mb-30">
                        <div className="col-12">
                            <div className="section-title">
                                <div className="tag tag--skew tag-zeta d-inline-block">
                                    <h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                        popular blogs
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row whiteAnchor">
                        <div className="col-lg-6 mb-lg-0 px-0">
                            <BlogWrapperInside data={popularArray[popularArray.length - 1]} height="height500" />
                        </div>
                        <div className="col-lg-6 px-0">
                            <div className="row whiteTLink pLeftRight15">
                                {
                                    popularArray.slice(popularArray.length - 5, popularArray.length - 1).map(x => {
                                        return (
                                            <div className="col-md-6 t-mb-30" key={x._id}>
                                                <BlogWrapperBottom data={x} displayDetail="d-none" displayDesc="d-none" displayRead="d-none" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* <!-- Popular Blogs Start --> */}



            {/* looks good ,logic is in place  just need more blog of type -atleast 3*/}
            {/* <!-- Featured Blogs Start --> */}
            <section className="t-pt-70 t-pb-70 theSection">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 t-mb-30 mb-lg-0">
                            <div className="col-12 t-mb-30">
                                <div className="section-title">
                                    <div className="tag tag--skew tag-zeta d-inline-block">
                                        <h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                            featured blogs
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {featuredArray.slice(featuredArray.length - 3, featuredArray.length).map(x => {
                                    return (
                                        <BlogWrapperRight2 data={x} key={x._id} />
                                    )
                                })}
                            </div>
                        </div>

                        <div className='col-lg-3'>
                            <div className='row'>

                                <div className="t-mb-30">
                                    {allBlog && allCategory ?
                                        <CategoryList catAndCount={catAndCount} allCategory={allCategory} />
                                        : ""}
                                </div>

                                <div className="newsletter t-mb-70">
                                    <span className="sm-text d-block t-text-light text-capitalize text-center">
                                        get more news
                                    </span>
                                    <h5 className="text-light text-capitalize text-center my-3">
                                        in your email inbox
                                    </h5>
                                    <form action="#" className="newsletter__form">
                                        <input type="email" placeholder="enter your email" className="newsletter__input w-100 t-mb-10" fdprocessedid="u5p3vh" />
                                        <button className="newsletter__button w-100" fdprocessedid="5npyk">
                                            sign up
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Featured Blogs Start --> */}



            {/* looks good ,logic is in place  just need more blog of type -atleast 4*/}
            {/* <!-- Viral Blogs Start --> */}
            <section className="t-bg-secondary t-pt-70 t-pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title">
                                <div className="tag tag--skew tag-delta d-inline-block">
                                    <h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                        trending blogs
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 t-mt-30 whiteAnchor px-0">
                            <div className="row" id="trending">
                                {trendingArray?.slice(trendingArray.length - 3, trendingArray.length).map(x => {
                                    return (
                                        <div className="col-md-6 col-lg-4 t-mb-30 mb-lg-0" key={x._id}>
                                            <BlogWrapperInside data={x} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Viral Blogs Start --> */}



            {/* <!-- Category Based Blogs Start --> */}
            <section className="t-pt-70 t-pb-70 theSection">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 t-mb-30 mb-lg-0">
                            <div className="row threeCat">
                                <div className="col-lg-4 t-mb-30 mb-lg-0">
                                    <div className="row">
                                        <div className="col-12 t-mb-30">
                                            <div className="section-title">
                                                <div className="tag tag--skew tag-delta d-inline-block">
                                                    <h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                                        technology
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tech">
                                            {techArray?.slice(techArray.length - 3, techArray.length).map(x => {
                                                return (
                                                    <BlogWrapperRight data={x} key={x._id} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 t-mb-30 mb-lg-0">
                                    <div className="row">
                                        <div className="col-12 t-mb-30">
                                            <div className="section-title">
                                                <div className="tag tag--skew tag-delta d-inline-block">
                                                    <h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                                        politics
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="politics">
                                            {politicsArray?.slice(politicsArray.length - 3, politicsArray.length).map(x => {
                                                return (
                                                    <BlogWrapperRight data={x} key={x._id} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 t-mb-30 mb-lg-0">
                                    <div className="row">
                                        <div className="col-12 t-mb-30">
                                            <div className="section-title">
                                                <div className="tag tag--skew tag-delta d-inline-block">
                                                    <h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
                                                        sports
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="sports">
                                            {sportsArray?.slice(sportsArray.length - 3, sportsArray.length).map(x => {
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
            {/* <!-- Category Based Blogs End --> */}
        </>
    )
}

export default Homepage