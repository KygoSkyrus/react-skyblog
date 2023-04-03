import React from 'react'
import OtherBlogsComp from './OtherBlogsComp'
import BlogWrapperBottom from './BlogWrapperBottom'
import CategoryList from './CategoryList'
const SingleBlog = (props) => {
  
  const {allBlog,allCategory, catAndCount}=props

  const link = document.baseURI;
  var blogurl = link.substring(
      link.lastIndexOf("/") + 1,
      link.length
  );

  let theBlog;
  let theNext;
  let thePrev;

  for (let i = 0; i < allBlog.length; i++) {

    //setting the prev blog
    thePrev=allBlog[i-1];

   //setting the next blog
   theNext=allBlog[i+1];

    //setting the main blog
    if (allBlog[i].url === blogurl) {
       theBlog=allBlog[i];
       break;
    }
}

  return (
  <>
       
       <div class="t-pt-70 t-pb-70">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 t-mb-30 mb-lg-0">
                    <div class="row">
                        <div class="col-12" id="singleBlog">
                          <BlogWrapperBottom data={theBlog}  />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 t-pt-70">
                            <div class="row justify-content-between">
                            
                                <div class="col-md-5 t-mb-30 mb-md-0">{thePrev?.url? <div>
                                    <h5 class="mt-0">
                                        <a href={thePrev?.url} id="prev-blog" class="t-link t-link--secondary">
                                        {thePrev?.url}
                                        </a>
                                    </h5>
                                    <a href={thePrev?.url} id="prev-link" class="t-link t-link--secondary text-capitalize">
                                        <span class="las la-arrow-left"></span>
                                        previous post
                                    </a></div>:""}
                                </div> 
                                
                                <div class="col-md-5">{theNext?.url?<div>
                                    <h5 class="mt-0">
                                        <a href={theNext?.url} id="next-blog" class="t-link t-link--secondary">
                                        {theNext?.url}
                                        </a>
                                    </h5>
                                    <a href={theNext?.url} id="next-link" class="t-link t-link--secondary text-capitalize">
                                        next post
                                        <span class="las la-arrow-right"></span>
                                    </a></div>:""}
                                </div>
                            </div>
                        </div>

                        
                        {/* <!-- <div class="col-12 t-pt-70">
                            <div id="comments" class="st-comments-area">
                                <h4 class="mt-0">
                                    2 Comments
                                </h4>
                            

                                <ul class="st-comments-list">
                                    <li>
                                        <div class="st-comments">
                                            <div class="st-comments__author ">
                                                <img src="/assets/img/img-68.jpg" alt="SoftTech-IT"
                                                    class="img-fluid st-comments__author-img">
                                            </div>
                                            <div class="st-comments__body">
                                                <ul class="st-comments__info t-mb-16">
                                                    <li>
                                                        <h6 class="st-comments__title mb-0">
                                                            <a href="#" class="st-comments__title-link">
                                                                jhone doe
                                                            </a>
                                                        </h6>
                                                    </li>
                                                    <li>
                                                        <span class="st-comments__date sm-text">
                                                            March 06, 2020
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span class="st-comments__share">
                                                            <span class="fas fa-reply"></span>
                                                        </span>
                                                    </li>
                                                </ul>
                                                <p class="sm-text">
                                                    A wonderful serenity has taken possession of my entire soul, like
                                                    these sweet mornings of spring which I enjoy with my whole heart.
                                                </p>
                                            </div>
                                        </div>
                                        <ul class="st-comments__children">
                                            <li>
                                                <div class="st-comments">
                                                    <div class="st-comments__author">
                                                        <img src="/assets/img/img-69.jpg" alt="SoftTech-IT"
                                                            class="img-fluid st-comments__author-img">
                                                    </div>
                                                    <div class="st-comments__body">
                                                        <ul class="st-comments__info t-mb-16">
                                                            <li>
                                                                <h6 class="st-comments__title mb-0">
                                                                    <a href="#" class="st-comments__title-link">
                                                                        jhone doe
                                                                    </a>
                                                                </h6>
                                                            </li>
                                                            <li>
                                                                <span class="st-comments__date sm-text">
                                                                    March 06, 2020
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span class="st-comments__share">
                                                                    <span class="fas fa-reply"></span>
                                                                </span>
                                                            </li>
                                                        </ul>
                                                        <p class="sm-text mb-0">
                                                            A wonderful serenity has taken possession of my entire soul,
                                                            like these sweet mornings of spring which I enjoy with my
                                                            whole heart.
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <div class="st-comments">
                                            <div class="st-comments__author ">
                                                <img src="/assets/img/img-68.jpg" alt="SoftTech-IT"
                                                    class="img-fluid st-comments__author-img">
                                            </div>
                                            <div class="st-comments__body">
                                                <ul class="st-comments__info t-mb-16">
                                                    <li>
                                                        <h6 class="st-comments__title mb-0">
                                                            <a href="#" class="st-comments__title-link">
                                                                jhone doe
                                                            </a>
                                                        </h6>
                                                    </li>
                                                    <li>
                                                        <span class="st-comments__date sm-text">
                                                            March 06, 2020
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span class="st-comments__share">
                                                            <span class="fas fa-reply"></span>
                                                        </span>
                                                    </li>
                                                </ul>
                                                <p class="sm-text">
                                                    A wonderful serenity has taken possession of my entire soul, like
                                                    these sweet mornings of spring which I enjoy with my whole heart.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div> --> */}



                        {/* <!-- post a comment --> */}

                        {/* <!-- <div class="col-12 t-pt-70">
                            <h4 class="mt-0 text-capitalize">
                                leave a reply
                            </h4>
                            <form action="#" class="st-comments__form">
                                <input type="text" name="name" id="name" class="form-control t-mb-15"
                                    placeholder="Enter Your Name">
                                <input type="text" name="mail" id="mail" class="form-control t-mb-15"
                                    placeholder="Enter Your Email">
                                <textarea name="textarea" id="textarea" cols="30" rows="10"
                                    placeholder="Write your text" class="form-control t-mb-15"></textarea>
                                <button class="newsletter__button ">
                                    post a comment
                                    <span class="st-btn-icon">
                                        <span class="las la-arrow-right"></span>
                                    </span>
                                </button>
                            </form>
                        </div> --> */}
                    </div>
                </div>


                {/*  right side things  */ }

                

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

export default SingleBlog