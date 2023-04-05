import React from 'react'

const EditBlog = () => {

  return (
    <>

      <div class="body-content">
        <div class="card mb-4">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="fs-17 font-weight-600 mb-0">Update Blog</h6>
              </div>
              <div class="text-right">
                <div class="actions">
                  <a href="" class="action-item" onClick={(e) => window.location.reload()}><i
                    class="fa fa-refresh fa-sm"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">
                <span id="frm">
                  <input type="number" class="form-control" name="bid" id="bid" placeholder=""
                    style={{ visibility: "hidden", position: "absolute" }} />
                  <div class="form-group">
                    <label for="title" class="font-weight-600">Title</label>
                    <input type="text" class="form-control" name="title" id="title" placeholder="Enter Title"
                      onchange="settingUrl()" />
                  </div>
                  <div class="form-group">
                    <label for="url" class="font-weight-600">Project Url</label>
                    <input type="text" class="form-control" name="url" id="url" placeholder="Project URL" />
                  </div>

                  <div class="form-group ">
                    <label for="category" class="font-weight-600">Category</label>
                    <div class="">
                      <select class="form-control basic-single" name="category" id="category">
                        <optgroup label="Select Category" id="optgroup">
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <label for="select" class="font-weight-600">Select</label>
                  <div class="form-group wrapper11">

                    <input type="radio" name="select" id="option1" value="featured blogs" />
                    <input type="radio" name="select" id="option2" value="trending blogs" />
                    <input type="radio" name="select" id="option3" value="popular blogs" />
                    <input type="radio" name="select" id="option4" value="todays blogs" />
                    <input type="radio" name="select" id="option5" value="none" />

                    <label for="option1" class="option option1">
                      <div class="dot"></div>
                      <span>&nbsp;Featured Blogs</span>
                    </label>
                    <label for="option2" class="option option2">
                      <div class="dot"></div>
                      <span>&nbsp;Trending Blogs</span>
                    </label>
                    <label for="option3" class="option option3">
                      <div class="dot"></div>
                      <span>&nbsp;Popular Blogs</span>
                    </label>
                    <label for="option4" class="option option4">
                      <div class="dot"></div>
                      <span>&nbsp;Todays Blogs</span>
                    </label>
                    <label for="option5" class="option option5">
                      <div class="dot"></div>
                      <span>&nbsp;None</span>
                    </label>
                  </div>

                  <div class="form-group">
                    <label for="summernote" class="font-weight-600">Blog Content</label>
                    <input id="summernote" name="summernote" />
                  </div>

                  <div class="form-group">
                    <label for="shortdesc" class="font-weight-600">Short Description</label>
                    <textarea name="shortdesc" placeholder="" class="form-control" id="shortdesc" rows="3"></textarea>
                  </div>

                  <div class="form-group d-flex flex-column">
                    <label for="image" class="font-weight-600">File</label>
                    <input type="file" name="image" id="image" class="custom-input-file border-0"
                      data-multiple-caption="{count} files selected" accept="image/*" multiple />
                    <label for="image" style={{
                      position: "absolute",
                      left: "0px",
                      background: "#ffffff",
                      borderRadius: "4px",
                      padding: " 5px",
                      paddingLeft: "14px",
                      border: "1px solid rgb(229 229 229)",
                      color: "#6c6c6c",
                      width: "100%",
                      top: "33px"
                    }}>
                      <i class="fa fa-upload"></i>
                      <span>Choose a file…</span>
                    </label>
                    <div id="displayimg" style={{ width: "100px", height: "100px" }}></div>
                  </div>

                  <div class="form-group">
                    <label for="author" class="font-weight-600">Author Name</label>
                    <input type="text" class="form-control" name="author" id="author" placeholder="Author Name" />
                  </div>

                  <div class="form-group">
                    <label for="metatitle" class="font-weight-600">Meta Title</label>
                    <input type="text" class="form-control" name="metatitle" id="metatitle"
                      placeholder="Meta Title" />
                  </div>

                  <div class="form-group">
                    <label for="metakeyword" class="font-weight-600">Meta Keyword</label>
                    <input type="text" class="form-control" name="metakeyword" id="metakeyword"
                      placeholder="Meta Keyword" />
                  </div>

                  <div class="form-group">
                    <label for="metadesc" class="font-weight-600">Meta Description</label>
                    <input type="text" class="form-control" name="metadesc" id="metadesc"
                      placeholder="Meta Description" />
                  </div>
                  <button id="go" className='my-2 mb-3'>UPDATE</button>
                </span>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditBlog