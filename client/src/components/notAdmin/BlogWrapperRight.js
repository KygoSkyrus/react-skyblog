import React from 'react'
import { Link } from 'react-router-dom'

const BlogWrapperRight = (props) => {

    const { data, displayCategory, displayRead, fontSM, tagSM } = props;

    return (
        <div className="col-12 t-mt-30 t-mb-30" key={data._id}>
            <div className="post post--right">
                <div className="post--right-img t-flex-100 t-mr-16">
                    <Link to={"/" + data?.url} state={{ url: data?.url }} >
                        <img src={data.image} alt="blog" className="img-fluid w-100" />
                    </Link>
                </div>
                <div className="post--right-content t-flex-100">
                    <ul className="list d-flex align-items-center">
                        <li className={`t-mr-16 ` + displayCategory}>
                            <Link to={"/category/" + data?.category} state={{ category: data?.category }}
                                className={"t-link t-link--light tag tag--skew text-uppercase " + tagSM}>
                                <span className="tag__skew-reverse">
                                    {data.category}
                                </span>
                            </Link>
                        </li>
                        {/* <li className={`t-mr-16 `+displayAuthor}>
                            <span 
                                className="t-link t-link--light tag tag--skew text-uppercase">
                                <span className="tag__skew-reverse">
                                    {data?.authorname}
                                </span>
                            </span>
                        </li> */}
                        <li className={"d-none " + fontSM}>
                            <span
                                className="t-link text-capitalize">
                                <span className="fa fa-calendar-alt m-text"></span> {data.date}
                            </span>
                        </li>
                    </ul>

                    <h5 className={"post__title t-mt-10 t-mb-10 " + fontSM}>
                        <Link to={"/" + data?.url} state={{ url: data?.url }} className="t-link t-link--secondary">
                            {data.title}
                        </Link>
                    </h5>
                    <ul className="list d-none d-md-flex align-items-center">
                        <li>
                            <span
                                className={"t-link t-link--secondary ex-sm-text text-capitalize " + fontSM}>
                                <span className="fa fa-calendar-alt m-text"></span>&nbsp;{data.date}
                                {/* <span className="fa fa-clock sm-text"></span>&nbsp;10 min read */}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BlogWrapperRight