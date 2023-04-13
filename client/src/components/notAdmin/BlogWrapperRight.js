import React from 'react'
import { Link } from 'react-router-dom'

const BlogWrapperRight = (props) => {

    const { data, displayCategory, displayRead } = props
    return (
        <div className="col-12 t-mt-30 t-mb-30" key={data._id}>
            <div className="post post--right">
                <div className="post--right-img t-flex-100 t-mr-16">
                    <img src={data.image} alt="blog" className="img-fluid w-100" />
                </div>
                <div className="post--right-content t-flex-100">
                    <ul className="list d-flex align-items-center">
                        <li className={`t-mr-16 `+displayCategory}>
                            <Link  to={data?.url}
                                className="t-link t-link--light tag tag--skew ${catClr} text-uppercase">
                                <span className="tag__skew-reverse">
                                    {data.category}
                                </span>
                            </Link>
                        </li>
                        <li className="d-none d-md-flex">
                            <Link  to={data?.url}
                                className="t-link t-link--secondary ex-sm-text text-capitalize">
                                <span className="las la-calendar-alt m-text"></span>
                                {data.date}
                            </Link>
                        </li>
                    </ul>

                    <h5 className="post__title post__title-xmin t-mt-10 t-mb-10">
                        <Link  to={data?.url} className="t-link t-link--secondary">
                            {data.title}
                        </Link>
                    </h5>
                    <ul className="list d-none d-md-flex align-items-center">
                        <li className={displayRead}>
                            <Link  to={data?.url}
                                className="t-link t-link--secondary ex-sm-text text-capitalize">
                                <span className="las la-clock sm-text"></span>
                                10 min read
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BlogWrapperRight