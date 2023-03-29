import React from 'react'

const CategoryList = (props) => {

    const {allBlog,allCategory}=props

    
    for (var i = 0; i < allBlog.length; i++) {
        var categoryCount = [];
        for (var j = 0; j < allBlog.length; j++) {
            if (allBlog[j]?.category == allCategory[i]?.category) {
                categoryCount.push(allBlog[j].category);
            }
        }

    }

  return (
    <div class="col-12">
						<ul class="list category-list" id="categoryList">
                        <li class="t-mb-15">
								<a target="blank" href="/category/${data[i]?.category}" class="t-link category-list__link w-100 ${clr[i]?.bg}">
									<span class="t-link t-link--light tag tag--skew ${clr[i]?.skewBg} text-uppercase t-mr-16">
										<span class="tag__skew-reverse">
											${allCategory[i]?.category}
										</span>
									</span>
									<span class="category-list__text t-text-light text-capitalize">${categoryCount.length} posts</span>
								</a>
			             	</li>
						</ul>
	</div>
  )
}

export default CategoryList