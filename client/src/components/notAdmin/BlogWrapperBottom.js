import React from 'react'
import { Link } from 'react-router-dom'

const BlogWrapperBottom = (props) => {

	const { data, displayRead, displayDesc, displayDetail } = props

	return (
		<div className="post">
			<img src={data?.image} alt="blog" className="img-fluid w-100" />

			<div className="post--right-content t-flex-100 t-pt-15">
				<ul className="list d-flex align-items-center">
					<li className="t-mr-16">
						<Link to={data?.url}
							className="t-link t-link--light tag tag--skew tag-beta text-uppercase">
							<span className="tag__skew-reverse">
								{data?.category}
							</span>
						</Link>
					</li>
					<li className="t-mr-16">
						<Link  to={data?.url} className="t-link t-link--secondary ex-sm-text text-capitalize">
							<span className="las la-calendar-alt sm-text"></span>
							{data?.date}
						</Link>
					</li>
					<li>
						<Link  to={data?.url} className={"t-link t-link--secondary ex-sm-text text-capitalize " + displayRead} >
							<span className="las la-clock sm-text"></span>
							10 min read
						</Link>
					</li>
				</ul>
				<h3 className="post__title t-mt-10">
					<Link  to={data?.url} className="t-link t-link--secondary">
						{data?.title}
					</Link>
				</h3>
				<p className={"mb-0 " + displayDesc}>
					{data?.shortdescription}
				</p>
				<div className={'detailContent ' + displayDetail} dangerouslySetInnerHTML={{ __html: data?.detail }}></div>

			</div>
		</div>
	)
}

export default BlogWrapperBottom