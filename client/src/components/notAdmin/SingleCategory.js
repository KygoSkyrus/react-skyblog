/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import OtherBlogsComp from './OtherBlogsComp';
import CategoryList from './CategoryList';
import BlogWrapperRight2 from './BlogWrapperRight2';
import Banner from './Banner';
import Error from './Error';
import { BlogContext } from '../../App';

const SingleCategory = () => {

    const { allBlog } = useContext(BlogContext);
    const [blogIncat, setBlogIncat] = useState()

    let { state } = useLocation();//this is the state passed while redirecting with "Link" react router (causes the page to rerender as we were having the same props)

    let category;
    useEffect(() => {
        const link = document.baseURI;
        category = link.substring(
            link.lastIndexOf("/") + 1,
            link.length
        );
        let blogInSelectCategory = allBlog.filter(x => x.category === category)
        setBlogIncat(blogInSelectCategory)
    }, [state])

    return (
        <>
            {blogIncat?.length > 0 ?
                <>
                    <Banner text={document.baseURI.substring(document.baseURI.lastIndexOf("/") + 1, document.baseURI.length)} />

                    <div className="t-pt-70 t-pb-70">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 t-mb-30 mb-lg-0 theSection">
                                    <div className="row">

                                        <div className="col-12 t-mb-60">
                                            <div className="row" id="data">
                                                {blogIncat?.map(x => {
                                                    return (
                                                        <BlogWrapperRight2 data={x} key={x._id} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="row">
                                        <OtherBlogsComp />
                                        <div className='t-mt-30'>
                                            <CategoryList />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <Error />}
        </>
    )
}

export default SingleCategory