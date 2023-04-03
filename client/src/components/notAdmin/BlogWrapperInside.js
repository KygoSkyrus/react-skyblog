import React from 'react'

const BlogWrapperInside = (props) => {

    const {data}=props

  return (
    <div class="col-12 t-mb-30">
								<div class="post-slider">
									<div class="post-slider__item">
										<div class="post post--in">
											<img src={data?.image} alt="blog" class="img-fluid w-100" />
											<a href="/${featuredArray[0].url}" class="post__overlay t-link"></a>
											<div class="post--in-content post--in-content-gap">
												<ul class="list d-flex align-items-center">
													<li class="t-mr-16">
														<a href="/${featuredArray[0].url}"
															class="t-link t-link--light tag tag--skew tag-delta text-uppercase">
															<span class="tag__skew-reverse">
																{data?.category}
															</span>
														</a>
													</li>
													<li class="t-mr-16">
														<a href="/${featuredArray[0].url}" class="t-link t-link--light ex-sm-text">
															<span class="las la-calendar-alt sm-text"></span>
															{data?.date}
														</a>
													</li>
													<li class="d-none d-lg-block">
														<a href="/${featuredArray[0].url}" class="t-link t-link--light ex-sm-text">
															<span class="las la-clock sm-text"></span>
															8 min read
														</a>
													</li>
												</ul>
												<h4 class="post__title mb-0 t-mt-10">
													<a href="/${featuredArray[0].url}" class="t-link t-link--light">
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