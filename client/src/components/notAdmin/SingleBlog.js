/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"

import { BlogContext } from '../../App'
import BlogWrapperBottom from './BlogWrapperBottom'
import OtherBlogsComp from './OtherBlogsComp'
import CategoryList from './CategoryList'
import Error from './Error'

const SingleBlog = () => {

    const { allBlog } = useContext(BlogContext);
    const [thePrev, setThePrev] = useState()
    const [theNext, setTheNext] = useState()
    const [theBlog, setTheBlog] = useState()

    let { state } = useLocation();

    useEffect(() => {
        const link = document.baseURI;
        var blogurl = link.substring(
            link.lastIndexOf("/") + 1,
            link.length
        );
        for (let i = 0; i < allBlog.length; i++) {
            //setting the prev blog
            let thePrev = allBlog[i - 1];
            setThePrev(thePrev)

            //setting the next blog
            let theNext = allBlog[i + 1];
            setTheNext(theNext)

            let theBlog;
            //setting the main blog
            if (allBlog[i].url === blogurl) {
                theBlog = allBlog[i];
                setTheBlog(theBlog)
                break;
            }
        }
    }, [state])

    return (
        <>
            {theBlog ?
                <div className="t-pt-70 t-pb-70">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 t-mb-30 mb-lg-0">
                                <div className="row">
                                    <div className="col-12" id="singleBlog">
                                        <BlogWrapperBottom data={theBlog} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 t-pt-70">
                                        <div className="row justify-content-between">

                                            <div className="col-md-5 t-mb-30 mb-md-0">
                                                {thePrev?.url ?
                                                    <div>
                                                        <h5 className="mt-0">
                                                            <Link to={"/" + thePrev?.url} state={{ url: thePrev?.url }} id="prev-blog" className="t-link t-link--secondary">
                                                                {thePrev?.url}
                                                            </Link>
                                                        </h5>
                                                        <Link to={"/" + thePrev?.url} state={{ url: thePrev?.url }} id="prev-link" className="t-link t-link--secondary text-capitalize">
                                                            <span className="las la-arrow-left"></span>
                                                            previous post
                                                        </Link></div>
                                                    : ""}
                                            </div>

                                            <div className="col-md-5">
                                                {theNext?.url ?
                                                    <div>
                                                        <h5 className="mt-0">
                                                            <Link to={"/" + theNext?.url} state={{ url: theNext?.url }} id="next-blog" className="t-link t-link--secondary">
                                                                {theNext?.url}
                                                            </Link>
                                                        </h5>
                                                        <Link to={"/" + theNext?.url} state={{ url: theNext?.url }} id="next-link" className="t-link t-link--secondary text-capitalize">
                                                            next post
                                                            <span className="las la-arrow-right"></span>
                                                        </Link>
                                                    </div>
                                                    : ""}
                                            </div>
                                        </div>
                                    </div>


                                    {/* <!-- <div className="col-12 t-pt-70">
                            <div id="comments" className="st-comments-area">
                                <h4 className="mt-0">
                                    2 Comments
                                </h4>
                            

                                <ul className="st-comments-list">
                                    <li>
                                        <div className="st-comments">
                                            <div className="st-comments__author ">
                                                <img src="/assets/img/img-68.jpg" alt="SoftTech-IT"
                                                    className="img-fluid st-comments__author-img">
                                            </div>
                                            <div className="st-comments__body">
                                                <ul className="st-comments__info t-mb-16">
                                                    <li>
                                                        <h6 className="st-comments__title mb-0">
                                                            <Link to="#" className="st-comments__title-link">
                                                                jhone doe
                                                            </Link>
                                                        </h6>
                                                    </li>
                                                    <li>
                                                        <span className="st-comments__date sm-text">
                                                            March 06, 2020
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="st-comments__share">
                                                            <span className="fas fa-reply"></span>
                                                        </span>
                                                    </li>
                                                </ul>
                                                <p className="sm-text">
                                                    A wonderful serenity has taken possession of my entire soul, like
                                                    these sweet mornings of spring which I enjoy with my whole heart.
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="st-comments__children">
                                            <li>
                                                <div className="st-comments">
                                                    <div className="st-comments__author">
                                                        <img src="/assets/img/img-69.jpg" alt="SoftTech-IT"
                                                            className="img-fluid st-comments__author-img">
                                                    </div>
                                                    <div className="st-comments__body">
                                                        <ul className="st-comments__info t-mb-16">
                                                            <li>
                                                                <h6 className="st-comments__title mb-0">
                                                                    <Link to="#" className="st-comments__title-link">
                                                                        jhone doe
                                                                    </Link>
                                                                </h6>
                                                            </li>
                                                            <li>
                                                                <span className="st-comments__date sm-text">
                                                                    March 06, 2020
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="st-comments__share">
                                                                    <span className="fas fa-reply"></span>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                        <p className="sm-text mb-0">
                                                            A wonderful serenity has taken possession of my entire soul,
                                                            like these sweet mornings of spring which I enjoy with my
                                                            whole heart.
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="st-comments">
                                            <div className="st-comments__author ">
                                                <img src="/assets/img/img-68.jpg" alt="SoftTech-IT"
                                                    className="img-fluid st-comments__author-img">
                                            </div>
                                            <div className="st-comments__body">
                                                <ul className="st-comments__info t-mb-16">
                                                    <li>
                                                        <h6 className="st-comments__title mb-0">
                                                            <Link to="#" className="st-comments__title-link">
                                                                jhone doe
                                                            </Link>
                                                        </h6>
                                                    </li>
                                                    <li>
                                                        <span className="st-comments__date sm-text">
                                                            March 06, 2020
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="st-comments__share">
                                                            <span className="fas fa-reply"></span>
                                                        </span>
                                                    </li>
                                                </ul>
                                                <p className="sm-text">
                                                    A wonderful serenity has taken possession of my entire soul, like
                                                    these sweet mornings of spring which I enjoy with my whole heart.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div> --> */}



                                    {/* <!-- post a comment --> */}

                                    {/* <!-- <div className="col-12 t-pt-70">
                            <h4 className="mt-0 text-capitalize">
                                leave a reply
                            </h4>
                            <form action="#" className="st-comments__form">
                                <input type="text" name="name" id="name" className="form-control t-mb-15"
                                    placeholder="Enter Your Name">
                                <input type="text" name="mail" id="mail" className="form-control t-mb-15"
                                    placeholder="Enter Your Email">
                                <textarea name="textarea" id="textarea" cols="30" rows="10"
                                    placeholder="Write your text" className="form-control t-mb-15"></textarea>
                                <button className="newsletter__button ">
                                    post a comment
                                    <span className="st-btn-icon">
                                        <span className="las la-arrow-right"></span>
                                    </span>
                                </button>
                            </form>
                        </div> --> */}
                                </div>
                            </div>


                            {/*  right side things  */}

                            <div className="col-lg-3">
                                <div className="row">
                                    <OtherBlogsComp />
                                    <CategoryList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Error />
            }
        </>
    )

}

export default SingleBlog