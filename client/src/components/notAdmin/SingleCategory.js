/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import OtherBlogsComp from './OtherBlogsComp';
import CategoryList from './CategoryList';
import BlogWrapperRight2 from './BlogWrapperRight2';
import Banner from './Banner';
import Error from './Error';

const SingleCategory = (props) => {

    const { allBlog, allCategory, catAndCount } = props
    const [blogIncat, setBlogIncat] = useState()

    let { state } = useLocation();//this is the state send from Link react router causes the page to rerender as we were having the same props

    let category;
    useEffect(() => {
        console.log('single category', allBlog)
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
                    <Banner text={category} />

                    <div className="t-pt-70 t-pb-70">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 t-mb-30 mb-lg-0">
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
                                        <OtherBlogsComp allBlog={allBlog} />
                                        <div className='t-mt-30'>
                                            <CategoryList catAndCount={catAndCount} allCategory={allCategory} />
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