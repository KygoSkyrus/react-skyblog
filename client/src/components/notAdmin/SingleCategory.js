import React from 'react'

import OtherBlogsComp from './OtherBlogsComp';
import CategoryList from './CategoryList';
import BlogWrapperRight2 from './BlogWrapperRight2';

const SingleCategory = (props) => {

    const { allBlog, allCategory, catAndCount } = props
    const link = document.baseURI;
    var category = link.substring(
        link.lastIndexOf("/") + 1,
        link.length
    );

    let blogInSelectCategory = allBlog.filter(x => x.category === category)


    return (
        <>

            {/* <!-- Banner  --> */}
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="t-pt-70 t-pb-70 t-bg-secondary">
                            <h4 className="mt-0 t-text-light text-capitalize text-center" id="catHead">
                                {category}
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
                                        {blogInSelectCategory?.map(x => {
                                            return (
                                                <BlogWrapperRight2 data={x} />
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