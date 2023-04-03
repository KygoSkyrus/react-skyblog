import React from 'react'

const BlogWrapperRight = (props) => {

    const { data, displayCategory, displayRead } = props
    return (
        <div class="col-12 t-mt-30 t-mb-30" key={data._id}>
            <div class="post post--right">
                <div class="post--right-img t-flex-100 t-mr-16">
                    <img src={data.image} alt="blog" class="img-fluid w-100" />
                </div>
                <div class="post--right-content t-flex-100">
                    <ul class="list d-flex align-items-center">
                        <li className={`t-mr-16 `+displayCategory}>
                            <a target="blank" href="/${catArray[i].url}"
                                class="t-link t-link--light tag tag--skew ${catClr} text-uppercase">
                                <span class="tag__skew-reverse">
                                    {data.category}
                                </span>
                            </a>
                        </li>
                        <li class="d-none d-md-flex">
                            <a target="blank" href="/${catArray[i].url}"
                                class="t-link t-link--secondary ex-sm-text text-capitalize">
                                <span class="las la-calendar-alt m-text"></span>
                                {data.date}
                            </a>
                        </li>
                    </ul>

                    <h5 class="post__title post__title-xmin t-mt-10 t-mb-10">
                        <a target="blank" href="/${catArray[i].url}" class="t-link t-link--secondary">
                            {data.title}
                        </a>
                    </h5>
                    <ul class="list d-none d-md-flex align-items-center">
                        <li className={displayRead}>
                            <a target="blank" href="/${catArray[i].url}"
                                class="t-link t-link--secondary ex-sm-text text-capitalize">
                                <span class="las la-clock sm-text"></span>
                                10 min read
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BlogWrapperRight