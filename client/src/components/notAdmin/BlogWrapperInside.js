import React from 'react'

const BlogWrapperInside = (props) => {

    const {data,height}=props

  return (
    <div className="col-12 t-mb-30">
								<div className="post-slider">
									<div className="post-slider__item">
										<div className="post post--in">
											<img src={data?.image} alt="blog" className="img-fluid w-100" style={{height:height}} />
											<a href="/${featuredArray[0].url}" className="post__overlay t-link"></a>
											<div className="post--in-content post--in-content-gap">
												<ul className="list d-flex align-items-center">
													<li className="t-mr-16">
														<a href="/${featuredArray[0].url}"
															className="t-link t-link--light tag tag--skew tag-delta text-uppercase">
															<span className="tag__skew-reverse">
																{data?.category}
															</span>
														</a>
													</li>
													<li className="t-mr-16">
														<a href="/${featuredArray[0].url}" className="t-link t-link--light ex-sm-text">
															<span className="las la-calendar-alt sm-text"></span>
															{data?.date}
														</a>
													</li>
													<li className="d-none d-lg-block">
														<a href="/${featuredArray[0].url}" className="t-link t-link--light ex-sm-text">
															<span className="las la-clock sm-text"></span>
															8 min read
														</a>
													</li>
												</ul>
												<h4 className="post__title mb-0 t-mt-10">
													<a href="/${featuredArray[0].url}" className="t-link t-link--light">
														{data?.title}
													</a>
												</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
  )
}

export default BlogWrapperInside