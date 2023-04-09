import React, { useState } from 'react'

const CategoryList = (props) => {

	const { catAndCount, allCategory } = props






	return (<>


		<div className="col-12 t-mb-30 ">
			<div className="section-title d-flex justify-content-between align-items-center">
				<div className="tag tag--skew tag-delta d-inline-block">
					<h5 className="tag__skew-reverse t-text-light text-capitalize mt-0 mb-0">
						categories
					</h5>
				</div>
			</div>
		</div>
		<div className="col-12">
			<ul className="list category-list" id="categoryList">
				{allCategory?.map(x => {
					return (
						<li className="t-mb-15" key={x._id}>
							<a target="blank" href={"/category/" + x.category} className="t-link category-list__link w-100 ${clr[i]?.bg}">
								<span className="t-link t-link--light tag tag--skew bg-dark text-uppercase t-mr-16">
									<span className="tag__skew-reverse">
										{x.category}
									</span>
								</span>
								<span className="category-list__text t-text-light text-capitalize"> {catAndCount[x.category] ? catAndCount[x.category] : 0} posts</span>
							</a>
						</li>
					)
				})}

			</ul>
		</div>
	</>
	)
}

export default CategoryList