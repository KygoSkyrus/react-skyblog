import React from 'react'
import OtherBlogsComp from './OtherBlogsComp';
import CategoryList from './CategoryList';

const SingleCategory = (props) => {

const {allBlog, allCategory, catAndCount}=props
    const link = document.baseURI;
     var category = link.substring(
                link.lastIndexOf("/") + 1,
                link.length
    );

    let blogInSelectCategory=allBlog.filter(x=>x.category===category)


  return (
    <>

{/* <!-- Banner  --> */}
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="t-pt-70 t-pb-70 t-bg-secondary">
                    <h4 class="mt-0 t-text-light text-capitalize text-center" id="catHead">
                        {category}
                    </h4>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Banner End --> */}

    <div class="t-pt-70 t-pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 t-mb-30 mb-lg-0">
                    <div class="row">

                        <div class="col-12 t-mb-60">
                            <div class="row" id="data">
                               {blogInSelectCategory?.map(x=>{
                                return(
                                    <div class="col-md-4 t-mb-30 mb-md-0">
                                    <div class="post post--bottom">
                                        <img src={x.image} alt="kotha" class="img-fluid w-100"/>
                                        <div class="post__tag post__tag-right-top">
                                            <a target="blank" href={"/"+x.url}
                                                class="t-link t-link--light tag tag--skew tag-beta text-uppercase"
                                                tabindex="0">
                                                <span class="tag__skew-reverse">
                                                    {x.category}
                                                </span>
                                            </a>
                                        </div>
                                        <h5 class="post__title t-mt-15">
                                            <a target="blank" href={"/"+x.url} class="t-link t-link--secondary" tabindex="0">
                                                {x.title}
                                            </a>
                                        </h5>
                                        <ul class="list d-flex align-items-center">
                                            <li class="t-mr-16">
                                                <a target="blank" href={"/"+x.url} class="t-link t-link--secondary ex-sm-text text-capitalize"
                                                    tabindex="0">
                                                    <span class="las la-calendar-alt sm-text"></span>
                                                    {x.date}
                                                </a>
                                            </li>
                                            <li>
                                                <a target="blank" href={"/"+x.url} class="t-link t-link--secondary ex-sm-text text-capitalize"
                                                    tabindex="0">
                                                    <span class="las la-clock sm-text"></span>
                                                    10 min read
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                )
                               })}
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="row">   

                    <OtherBlogsComp allBlog={allBlog} />
                    
                    <CategoryList catAndCount={catAndCount} allCategory={allCategory} />                

                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default SingleCategory