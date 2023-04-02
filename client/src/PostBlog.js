import React from 'react'

const PostBlog = () => {
  return (
    <>
    {/* <!-- Banner  --> */}
    <div class="container dnone" id="head">
        <div class="row">
            <div class="col-12">
                <div class="t-pt-70 t-pb-70 t-bg-secondary">
                    <h4 class="mt-0 t-text-light text-capitalize text-center" >Post a Blog</h4>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Banner End --> */}



    <div class="t-pt-70 t-pb-70 dnone" id="content">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 t-mb-30 mb-lg-0">
                    <div class="row">

                        <div class="col-12">
                            <div class="row d-flex justify-content-center" id="data">

                                <div class="col-9  c12">
                                    <h4 class="mt-0 text-capitalize text-center">
                                        write a blog
                                    </h4>


                                    <div class="row mt-4">
                                        <div class="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">
                                            <span id="frm">
                                                <div class="form-group">
                                                    <label for="Email" class="font-weight-600">Email</label>
                                                    <input type="email" class="form-control" name="email" id="email"
                                                        autocomplete="off" placeholder="Enter your email"
                                                       />
                                                </div>
                                                <div class="form-group">
                                                    <label for="title" class="font-weight-600">Title</label>
                                                    <input type="text" class="form-control" name="title" id="title"
                                                        autocomplete="off" placeholder="Enter Title"
                                                        onchange="settingUrl()" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="url" class="font-weight-600">Project Url</label>
                                                    <input type="text" class="form-control" name="url" id="url"
                                                        autocomplete="off" placeholder="Project URL" />
                                                </div>


                                              

                                                {/* <!-- <div class="form-group">
                                                    <label for="category" class="font-weight-600">Category</label>
                                                    <div class="">
                                                      <select class="form-select " aria-label="Default select example">
                                                        <option selected>Category</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option><option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                      </select>
                                                    </div>
                                                </div> --> */}

                                                <div class="form-group">
                                                    <label for="category" class="font-weight-600">Category</label>
                                                    <input type="text" class="form-control" name="category"
                                                        id="category" autocomplete="off" placeholder="Category" />
                                                </div>

                                                <label for="select" class="font-weight-600">Select</label>
                                                <div class="form-group wrapper11">
                                                    <input type="radio" name="select" id="option-1"
                                                        value="featured blogs" />
                                                    <input type="radio" name="select" id="option-2"
                                                        value="trending blogs" />
                                                    <input type="radio" name="select" id="option-3"
                                                        value="popular blogs" />
                                                    <input type="radio" name="select" id="option-4"
                                                        value="todays blogs" />
                                                    <input type="radio" name="select" id="option-5" value="none" />

                                                    <label for="option-1" class="option option-1">
                                                        <div class="dot"></div>
                                                        <span>&nbsp;Featured Blogs</span>
                                                    </label>
                                                    <label for="option-2" class="option option-2">
                                                        <div class="dot"></div>
                                                        <span>&nbsp;Trending Blogs</span>
                                                    </label>
                                                    <label for="option-3" class="option option-3">
                                                        <div class="dot"></div>
                                                        <span>&nbsp;Popular Blogs</span>
                                                    </label>
                                                    <label for="option-4" class="option option-4">
                                                        <div class="dot"></div>
                                                        <span>&nbsp;Todays Blogs</span>
                                                    </label>
                                                    <label for="option-5" class="option option-5">
                                                        <div class="dot"></div>
                                                        <span>&nbsp;None</span>
                                                    </label>
                                                </div>

                                                <div class="form-group">
                                                    <label for="summernote" class="font-weight-600">Blog Content</label>
                                                    <textarea id="summernote" name="summernote"></textarea>
                                                </div>

                                                <div class="form-group">
                                                    <label for="shortdesc" class="font-weight-600">Short
                                                        Description</label>
                                                    <textarea name="shortdesc" placeholder="" class="form-control"
                                                        id="shortdesc" rows="3"></textarea>
                                                </div>

                                                <div class="form-group">
                                                    <label for="image" class="font-weight-600 d-block">File</label>
                                                    <input type="file" name="image" id="image" class="custom-input-file"
                                                        data-multiple-caption="{count} files selected" accept="image/*"
                                                        multiple required="required" />
                                                    <label for="image" class="form-group" style={{position: "absolute",
                                                    left: "15px",
                                                    background: "#ffffff",
                                                    borderRadius: "4px",
                                                    width: "calc(100% - 30px)",
                                                    padding:" 5px",
                                                    paddingLeft:"14px",
                                                    border: "1px solid #ced4da",
                                                    color: "#6c6c6c",}}>
                                                        <i class="fa fa-upload"></i>
                                                        <span>Choose a file…</span>
                                                    </label>

                                                </div>

                                                <div class="form-group">
                                                    <label for="author" class="font-weight-600">Author Name</label>
                                                    <input type="text" class="form-control" name="author" id="author"
                                                        autocomplete="off" placeholder="Author Name" />
                                                </div>

                                                <div class="form-group">
                                                    <label for="metatitle" class="font-weight-600">Meta Title</label>
                                                    <input type="text" class="form-control" name="metatitle"
                                                        id="metatitle" autocomplete="off" placeholder="Meta Title" />
                                                </div>

                                                <div class="form-group">
                                                    <label for="metakeyword" class="font-weight-600">Meta
                                                        Keyword</label>
                                                    <input type="text" class="form-control" name="metakeyword"
                                                        id="metakeyword" autocomplete="off"
                                                        placeholder="Meta Keyword" />
                                                </div>

                                                <div class="form-group">
                                                    <label for="metadesc" class="font-weight-600">Meta
                                                        Description</label>
                                                    <input type="text" class="form-control" name="metadesc"
                                                        id="metadesc" autocomplete="off"
                                                        placeholder="Meta Description" />
                                                </div>
                                                <div class="d-flex justify-content-center">
                                                    <button id="go" class="newsletter__button " type="submit"
                                                        style={{paddingLeft: "30px", paddingRight: "30px"}}>
                                                        send blog
                                                        <span class="st-btn-icon">
                                                            <span class="las la-arrow-right"></span>
                                                        </span>
                                                    </button>
                                                </div>

                                            </span>
                                        </div>
                                        <div class="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
                                    </div>


                                </div>



                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    
    </>
  )
}

export default PostBlog