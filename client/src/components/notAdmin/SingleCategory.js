import React, { useEffect, useState } from 'react'

import OtherBlogsComp from './OtherBlogsComp';
import CategoryList from './CategoryList';
import BlogWrapperRight2 from './BlogWrapperRight2';
import { useLocation } from 'react-router-dom';

const SingleCategory = (props) => {

    const { allBlog, allCategory, catAndCount } = props
    const [blogIncat,setBlogIncat]=useState()

    //on reload its not working as the useeefcts runs very early
    let { state } = useLocation();//this is the state send from Link react router causes the page to rerender as we were having the same props
    console.log('sc',state)
   
    useEffect(()=>{
        console.log('single category',allBlog)

        let category = getCurrentCategory()
     
        let blogInSelectCategory = allBlog.filter(x => x.category === category)
        setBlogIncat(blogInSelectCategory)
    },[state])

    function getCurrentCategory(){
        const link = document.baseURI;
        var category = link.substring(
            link.lastIndexOf("/") + 1,
            link.length
        );
        return category
    }

    return (
        <>

            {/* <!-- Banner  --> */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="t-pt-70 t-pb-70 t-bg-secondary">
                            <h4 className="mt-0 t-text-light text-capitalize text-center" id="catHead">
                                {getCurrentCategory()}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Banner End --> */}

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
    )
}

export default SingleCategory