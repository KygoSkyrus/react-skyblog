import React from 'react'

const BlogWrapperBottom = (props) => {
  const {data,displayRead,displayDesc}=props
  return (
    <div class="post">
									<img src={data?.image} alt="blog" class="img-fluid w-100" />

									<div class="post--right-content t-flex-100 t-pt-15">
										<ul class="list d-flex align-items-center">
											<li class="t-mr-16">
												<a target="blank" href="/${data[0].url}"
													class="t-link t-link--light tag tag--skew tag-beta text-uppercase">
													<span class="tag__skew-reverse">
														{data?.category}
													</span>
												</a>
											</li>
											<li class="t-mr-16">
												<a target="blank" href="/${data[0].url}" class="t-link t-link--secondary ex-sm-text text-capitalize">
													<span class="las la-calendar-alt sm-text"></span>
													{data?.date}
												</a>
											</li>
											<li>
												<a target="blank" href="/${data[0].url}" className={"t-link t-link--secondary ex-sm-text text-capitalize "+displayRead} >
													<span class="las la-clock sm-text"></span>
													10 min read
												</a>
											</li>
										</ul>
										<h3 class="post__title t-mt-10">
											<a target="blank" href="/${data[0].url}" class="t-link t-link--secondary">
												{data?.title}
											</a>
										</h3>
										<p className={"mb-0 "+displayDesc}>
											{data?.shortdescription}
										</p>
									</div>
								</div>
  )
}

export default BlogWrapperBottom