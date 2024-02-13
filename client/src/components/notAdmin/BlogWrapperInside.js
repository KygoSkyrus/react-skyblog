import React from 'react'
import { Link } from 'react-router-dom'

const BlogWrapperInside = (props) => {

	const { data, height } = props;

	return (
		<div className="col-12 t-mb-30">
			<div className="post-slider">
				<div className="post-slider__item">
					<div className="post post--in">
						<img src={data?.image} alt="blog" className={"img-fluid w-100 "+height } />
						<Link to={"/"+data?.url} state={{url:data?.url}} className="post__overlay t-link"></Link>
						<div className="post--in-content post--in-content-gap">
							<ul className="list d-flex align-items-center">
								<li className="t-mr-16">
									<Link to={"category/"+data?.category} state={{ category: data?.category }}
										className="t-link t-link--light tag tag--skew tag-delta text-uppercase">
										<span className="tag__skew-reverse">
											{data?.category}
										</span>
									</Link>
								</li>
								<li className="t-mr-16">
									<span className="t-link t-link--light ex-sm-text">
										<span className="las la-calendar-alt sm-text"></span>
										{data?.date}
									</span>
								</li>
								<li className="d-none d-lg-block">
									<Link to={"/"+data?.url} state={{url:data?.url}} className="t-link t-link--light ex-sm-text">
										<span className="las la-clock sm-text"></span>
										8 min read
									</Link>
								</li>
							</ul>
							<h4 className="post__title mb-0 t-mt-10">
								<Link to={"/"+data?.url} state={{url:data?.url}} className="t-link t-link--light">
									{data?.title}
								</Link>
							</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogWrapperInside