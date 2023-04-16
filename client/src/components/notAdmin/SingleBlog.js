import React from 'react'
import { Link } from "react-router-dom"

import OtherBlogsComp from './OtherBlogsComp'
import BlogWrapperBottom from './BlogWrapperBottom'
import CategoryList from './CategoryList'


const SingleBlog = (props) => {

    const { allBlog, allCategory, catAndCount } = props

    const link = document.baseURI;
    var blogurl = link.substring(
        link.lastIndexOf("/") + 1,
        link.length
    );

    let theBlog = [];
    let theNext;
    let thePrev;



    for (let i = 0; i < allBlog.length; i++) {
        console.log('loop')
        //setting the prev blog
        thePrev = allBlog[i - 1];

        //setting the next blog
        theNext = allBlog[i + 1];

        //setting the main blog
        if (allBlog[i].url === blogurl) {
            theBlog = allBlog[i];
            break;
        }
    }


    //note:this problem maybe solved after incorporating redux
    //to navigate to erro page
    // if(allBlog.length>0){
    // if(!theBlog){
    //     // console.log('theblog is not true in singtle blog')
    //     // navigate("/page-not-found")
    // }else{
    //     //console.log('theblog is not true in singtle blog-oposite')
    // }


    return (
        <>

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
                                                        <Link to={"/" + thePrev?.url} id="prev-blog" className="t-link t-link--secondary">
                                                            {thePrev?.url}
                                                        </Link>
                                                    </h5>
                                                    <Link to={"/" + thePrev?.url} id="prev-link" className="t-link t-link--secondary text-capitalize">
                                                        <span className="las la-arrow-left"></span>
                                                        previous post
                                                    </Link></div>
                                                : ""}
                                        </div>

                                        <div className="col-md-5">
                                            {theNext?.url ?
                                                <div>
                                                    <h5 className="mt-0">
                                                        <Link to={"/" + theNext?.url} id="next-blog" className="t-link t-link--secondary">
                                                            {theNext?.url}
                                                        </Link>
                                                    </h5>
                                                    <Link to={"/" + theNext?.url} id="next-link" className="t-link t-link--secondary text-capitalize">
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
                                <OtherBlogsComp allBlog={allBlog} />
                                <CategoryList catAndCount={catAndCount} allCategory={allCategory} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default SingleBlog