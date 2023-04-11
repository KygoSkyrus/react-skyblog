import React, { useEffect, useState } from 'react'



const EditBlog = (props) => {

  const { allBlog, allCategory } = props
  // const [theBlog,setTheBlog]=useState()

  const link = document.baseURI;
  var blogurl = link.substring(
    link.lastIndexOf("/") + 1,
    link.length
  );

  if(allBlog.length>0){
    console.log('allblog in edit blog poage',allBlog)
  }


  useEffect(() => {
   // settingFieldsInitially()
  }, [])




  function settingFieldsInitially() {

    let theBlog = allBlog.find(x => x.url === blogurl)
    console.log('theBlog', theBlog)


    //ALL FIELDS
    let title = document.getElementById('title')
    let url = document.getElementById("url")
    let category = document.getElementById("category")

    let select = document.querySelector(`[value="${theBlog?.type}"]`)


    let shortdesc = document.getElementById("shortdesc");
    let image = document.getElementById("displayimg");
    let author = document.getElementById("author");

    let metatitle = document.getElementById("metatitle");
    let metakeyword = document.getElementById("metakeyword");
    let metadesc = document.getElementById("metadesc");

    let detail = document.querySelectorAll(".note-editable")[0]; //summernote

  




    //if the certain blog is found
    if (theBlog) {

      //if the fields are loaded
      if (title && url && category && select && detail && shortdesc && author && metatitle && metakeyword && metadesc && image)
        console.log('title is true', detail)

      title.value = theBlog.title
      url.value = theBlog.url
      category.value = theBlog.category
      select.setAttribute("checked","checked")

      //detail.innerHTML = theBlog.detail
      shortdesc.value = theBlog.shortdescription
      author.value = theBlog.authorname

      metatitle.value = theBlog.metatitle
      metakeyword.value = theBlog.metakeywords
      metadesc.value = theBlog.metadescription

      image.style.backgroundImage=`url('${theBlog.image}')`
      // .value = theBlog.
      // .value = theBlog.



    }
  }


  function getFieldValues() {
    if (document.querySelector("input[type=radio][name=select]:checked")) {
      console.log('the test', document.querySelector("input[type=radio][name=select]:checked"))
    }
  }




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
                  <a href="/" className="action-item" onClick={(e) => window.location.reload()}><i
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
                      onChange={e => settingUrl(e)} />
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
                          {allCategory?.map(x => {
                            return (<option value={x.category} key={x._id} >{x.category}</option>)
                          })}
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <label htmlFor="select" className="font-weight-600">Select</label>
                  <div className="form-group wrapper11">
                    <input type="radio" name="select" id="option-1" value="featured blogs" />
                    <input type="radio" name="select" id="option-2" value="trending blogs" />
                    <input type="radio" name="select" id="option-3" value="popular blogs" />
                    <input type="radio" name="select" id="option-4" value="todays blogs" />
                    <input type="radio" name="select" id="option-5" value="none" />

                    <label htmlFor="option-1" className="option option-1">
                      <div className="dot"></div>
                      <span>&nbsp;Featured Blogs</span>
                    </label>
                    <label htmlFor="option-2" className="option option-2">
                      <div className="dot"></div>
                      <span>&nbsp;Trending Blogs</span>
                    </label>
                    <label htmlFor="option-3" className="option option-3">
                      <div className="dot"></div>
                      <span>&nbsp;Popular Blogs</span>
                    </label>
                    <label htmlFor="option-4" className="option option-4">
                      <div className="dot"></div>
                      <span>&nbsp;Todays Blogs</span>
                    </label>
                    <label htmlFor="option-5" className="option option-5">
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
                      left: "-1px",
                      background: "#ffffff",
                      borderRadius: "4px",
                      padding: " 5px",
                      paddingLeft: "14px",
                      border: "1px solid rgb(229 229 229)",
                      color: "#6c6c6c",
                      width: "100%",
                      top: "31px"
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
                  <button id="go" className='my-2 mb-3' onClick={e => getFieldValues(e)}>UPDATE</button>
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