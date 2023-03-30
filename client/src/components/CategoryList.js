import React, { useState } from 'react'

const CategoryList = (props) => {

    const {catAndCount,allCategory}=props



    
      

  return (
    <div class="col-12">
						<ul class="list category-list" id="categoryList">
              {allCategory?.map(x=>{return(
                 <li class="t-mb-15" key={x._id}>
								<a target="blank" href="/category/${data[i]?.category}" class="t-link category-list__link w-100 ${clr[i]?.bg}">
									<span class="t-link t-link--light tag tag--skew ${clr[i]?.skewBg} text-uppercase t-mr-16">
										<span class="tag__skew-reverse">
											{x.category}
										</span>
									</span>
									<span class="category-list__text t-text-light text-capitalize"> {catAndCount[x.category]?catAndCount[x.category]:0} posts</span>
								</a>
			             	</li>
              )})}
                       
						</ul>
	</div>
  )
}

export default CategoryList