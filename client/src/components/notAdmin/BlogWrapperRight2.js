import React from 'react'

const BlogWrapperRight2 = (props) => {

  const { data } = props;

  return (
    <>
      <div class="row t-mb-30">
        <div class="col-md-4">
          <div class="post--right-img t-flex-100 t-mb-30 mb-md-0">
            <img src={data.image} alt="kotha" class="img-fluid w-100 t-minw-215" />
          </div>
        </div>
        <div class="col-md-8">
          <div class="post--right-content t-flex-100">
            <ul class="list d-flex align-items-center">
              <li class="t-mr-16">
                <a href="#" class="t-link t-link--light tag tag--skew tag-epsilon text-uppercase">
                  <span class="tag__skew-reverse">
                    {data.category}
                  </span>
                </a>
              </li>
              <li class="t-mr-16">
                <a href="#" class="t-link t-link--secondary ex-sm-text text-capitalize">
                  <span class="las la-clock sm-text"></span>
                  10 min read
                </a>
              </li>
              <li>
                <a href="" class="t-link t-link--secondary ex-sm-text text-capitalize">
                  <span class="las la-calendar-alt ex-sm-text"></span>
                  {data.date}
                </a>
              </li>
            </ul>
            <h4 class="post__title t-mt-10 t-md-34-lg-1875">
              <a href="blog-details.html" class="t-link t-link--secondary">
                {data.title}
              </a>
            </h4>
            <p class="mb-0 d-none d-lg-block">
              {data.shortdescription}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogWrapperRight2