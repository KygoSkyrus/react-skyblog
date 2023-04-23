import React from 'react'
import BlogWrapperRight from './BlogWrapperRight'
import { Link } from 'react-router-dom'

const OtherBlogsComp = (props) => {

	const { allBlog } = props;

	return (
		<>
			<div className="col-12">
				<div className="section-title">
					<div className="tag tag--skew tag-delta d-inline-block">
						<h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
							related blogs
						</h5>
					</div>
				</div>
			</div>
			<div className="col-12 t-mt-30 px-0">

				{allBlog?.slice(allBlog.length - 6, allBlog.length-2).map(x => {
					return (
						<BlogWrapperRight data={x} key={x._id} displayRead='d-none' fontSM="fontSM" tagSM="tagSM" />
					)
				})}
			</div>
			<div className="col-12 t-mt-30">
				<Link to="/" className="t-link">
					<img src="https://firebasestorage.googleapis.com/v0/b/shopp-itt.appspot.com/o/skyblog%2Fpexels-adil-2726478.jpg?alt=media&token=c726054a-f45f-4d2f-b200-a9b123a6c9a5" alt="blog" className="img-fluid w-100" />
				</Link>
			</div>
		</>
	)
}

export default OtherBlogsComp