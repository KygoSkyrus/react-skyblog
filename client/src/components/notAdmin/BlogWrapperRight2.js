import React from 'react'
import { Link } from 'react-router-dom'

const BlogWrapperRight2 = (props) => {

  const { data } = props;

  return (
    <>
      <div className="row t-mb-30">
        <div className="col-md-4">
          <div className="post--right-img t-flex-100 t-mb-30 mb-md-0">
            <img src={data.image} alt="kotha" className="img-fluid w-100 t-minw-215" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="post--right-content t-flex-100">
            <ul className="list d-flex align-items-center">
              <li className="t-mr-16">
                <Link to={data?.url} className="t-link t-link--light tag tag--skew tag-epsilon text-uppercase">
                  <span className="tag__skew-reverse">
                    {data.category}
                  </span>
                </Link>
              </li>
              <li className="t-mr-16">
                <Link to={data?.url} className="t-link t-link--secondary ex-sm-text text-capitalize">
                  <span className="las la-clock sm-text"></span>
                  10 min read
                </Link>
              </li>
              <li>
                <Link to={data?.url} className="t-link t-link--secondary ex-sm-text text-capitalize">
                  <span className="las la-calendar-alt ex-sm-text"></span>
                  {data.date}
                </Link>
              </li>
            </ul>
            <h4 className="post__title t-mt-10 t-md-34-lg-1875">
              <Link to="blog-details.html" className="t-link t-link--secondary">
                {data.title}
              </Link>
            </h4>
            <p className="mb-0 d-none d-lg-block">
              {data.shortdescription}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogWrapperRight2