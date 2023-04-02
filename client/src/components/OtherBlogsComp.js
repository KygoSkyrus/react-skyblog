import React from 'react'
import BlogWrapperRight from './BlogWrapperRight'

const OtherBlogsComp = (props) => {
 
    const {allBlog}=props;

  return (
    <>
    
{/* <div class="col-lg-3">
					<div class="row"> */}
						<div class="col-12">
							<div class="section-title">
								<div class="tag tag--skew tag-delta d-inline-block">
									<h5 class="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
										other news
									</h5>
								</div>
							</div>
						</div>
						<div class="col-12 t-mt-30">
							
                            {allBlog?.slice(allBlog.length-4, allBlog.length).map(x => {
                                                return (
                                                    <BlogWrapperRight data={x} key={x._id} displayCategory='d-none' displayRead='d-none' />
                                                )
                                            })}
						</div>
						<div class="col-12 t-mt-30">
							<a href="/" class="t-link">
								<img src="https://picsum.photos/300/300" alt="blog" class="img-fluid w-100" />
							</a>
						</div>
					{/* </div>
				</div> */}
    
    </>
  )
}

export default OtherBlogsComp