import React from 'react'

const EditBlog = (props) => {

const {allBlog}=props

console.log('edit allBlog',allBlog)


const link = document.baseURI;
var blogurl = link.substring(
    link.lastIndexOf("/") + 1,
    link.length
);

  function settingUrl(e) {
    let title = e.target.value;
    let str = title.replace(/\s+/g, "-").toLowerCase();
    document.getElementById("url").value = str;
}

  return (
    <>

      <div className="body-content">
        <div className="card mb-4">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fs-17 font-weight-600 mb-0">Update Blog</h6>
              </div>
              <div className="text-right">
                <div className="actions">
                  <a href="" className="action-item" onClick={(e) => window.location.reload()}><i
                    className="fas fa-refresh fa-sm"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">
                <span id="frm">
                  <input type="number" className="form-control" name="bid" id="bid" placeholder=""
                    style={{ visibility: "hidden", position: "absolute" }} />
                  <div className="form-group">
                    <label htmlFor="title" className="font-weight-600">Title</label>
                    <input type="text" className="form-control" name="title" id="title" placeholder="Enter Title"
                      onChange={e=>settingUrl(e)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="url" className="font-weight-600">Project Url</label>
                    <input type="text" className="form-control" name="url" id="url" placeholder="Project URL" />
                  </div>

                  <div className="form-group ">
                    <label htmlFor="category" className="font-weight-600">Category</label>
                    <div className="">
                      <select className="form-control basic-single" name="category" id="category">
                        <optgroup label="Select Category" id="optgroup">
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <label htmlFor="select" className="font-weight-600">Select</label>
                  <div className="form-group wrapper11">

                    <input type="radio" name="select" id="option1" value="featured blogs" />
                    <input type="radio" name="select" id="option2" value="trending blogs" />
                    <input type="radio" name="select" id="option3" value="popular blogs" />
                    <input type="radio" name="select" id="option4" value="todays blogs" />
                    <input type="radio" name="select" id="option5" value="none" />

                    <label htmlFor="option1" className="option option1">
                      <div className="dot"></div>
                      <span>&nbsp;Featured Blogs</span>
                    </label>
                    <label htmlFor="option2" className="option option2">
                      <div className="dot"></div>
                      <span>&nbsp;Trending Blogs</span>
                    </label>
                    <label htmlFor="option3" className="option option3">
                      <div className="dot"></div>
                      <span>&nbsp;Popular Blogs</span>
                    </label>
                    <label htmlFor="option4" className="option option4">
                      <div className="dot"></div>
                      <span>&nbsp;Todays Blogs</span>
                    </label>
                    <label htmlFor="option5" className="option option5">
                      <div className="dot"></div>
                      <span>&nbsp;None</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label htmlFor="summernote" className="font-weight-600">Blog Content</label>
                    <input id="summernote" name="summernote" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="shortdesc" className="font-weight-600">Short Description</label>
                    <textarea name="shortdesc" placeholder="" className="form-control" id="shortdesc" rows="3"></textarea>
                  </div>

                  <div className="form-group d-flex flex-column">
                    <label htmlFor="image" className="font-weight-600">File</label>
                    <input type="file" name="image" id="image" className="custom-input-file border-0"
                      data-multiple-caption="{count} files selected" accept="image/*" multiple />
                    <label htmlFor="image" style={{
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
                      <i className="fa fa-upload"></i>
                      <span>Choose a file…</span>
                    </label>
                    <div id="displayimg" style={{ width: "100px", height: "100px" }}></div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="author" className="font-weight-600">Author Name</label>
                    <input type="text" className="form-control" name="author" id="author" placeholder="Author Name" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="metatitle" className="font-weight-600">Meta Title</label>
                    <input type="text" className="form-control" name="metatitle" id="metatitle"
                      placeholder="Meta Title" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="metakeyword" className="font-weight-600">Meta Keyword</label>
                    <input type="text" className="form-control" name="metakeyword" id="metakeyword"
                      placeholder="Meta Keyword" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="metadesc" className="font-weight-600">Meta Description</label>
                    <input type="text" className="form-control" name="metadesc" id="metadesc"
                      placeholder="Meta Description" />
                  </div>
                  <button id="go" className='my-2 mb-3'>UPDATE</button>
                </span>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditBlog