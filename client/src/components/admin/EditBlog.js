import React from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom'


const EditBlog = (props) => {

  const { allBlog, allCategory, storage } = props
  const navigate = useNavigate()
  const link = document.baseURI;
  var blogurl = link.substring(
    link.lastIndexOf("/") + 1,
    link.length
  );
  let theBlog = allBlog.find(x => x.url === blogurl)

  settingFieldsInitially()
  function settingFieldsInitially() {

    //ALL FIELDS
    let blogid = document.getElementById('blogid')
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
        console.log('title is true', detail.innerText)

      blogid.value = theBlog._id
      title.value = theBlog.title
      url.value = theBlog.url
      category.value = theBlog.category
      select.setAttribute("checked", "checked")

      detail.innerHTML = theBlog.detail
      shortdesc.value = theBlog.shortdescription
      author.value = theBlog.authorname

      metatitle.value = theBlog.metatitle
      metakeyword.value = theBlog.metakeywords
      metadesc.value = theBlog.metadescription

      image.style.backgroundImage = `url('${theBlog.image}')`
      image.style.display="block"

    }
  }


  async function sendData(e) {
    e.preventDefault()

    let image = document.getElementById("image")?.files[0];

    let blogid = document.getElementById("blogid")?.value;
    let title = document.getElementById("title")?.value;
    let url = document.getElementById("url")?.value;

    let category = document.getElementById("category")?.value;
    let select;
    if (document.querySelector("input[type=radio][name=select]:checked")) {
      select = document.querySelector("input[type=radio][name=select]:checked")?.value;
    } else {
      select = ''
    }

    let shortdesc = document.getElementById("shortdesc")?.value;
    let author = document.getElementById("author")?.value;
    let metatitle = document.getElementById("metatitle")?.value;
    let metakeyword = document.getElementById("metakeyword")?.value;
    let metadesc = document.getElementById("metadesc")?.value;
    let detail = document.querySelectorAll(".note-editable")[0]?.innerHTML; //summernote
    let allimg = document.querySelectorAll(".note-editable")[0]?.getElementsByTagName('img');

    //check sthe size of the images inside the summernote
    let totalsize = 0;
    for (let i = 0; i < allimg.length; i++) {
      let base64String = allimg[i].getAttribute("src");//base64 data

      let stringLength = base64String.length - 'data:image/png;base64,'.length;
      let sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
      let sizeInKb = sizeInBytes / 1000000;
      totalsize += sizeInKb;
    }

    let imageUrl;
    if (image) {
      const imageRef = ref(storage, "skyblog/" + image.name);
      //uploading image to firebase storage
      await uploadBytes(imageRef, image)
        .then(snapshot => {
          //console.log(snapshot.metadata.fullPath)
          return snapshot.metadata.fullPath;
        })
        .catch(error => {
          console.log(error)
        });

      //getting the image url
      await getDownloadURL(imageRef)
        .then(url => {
          imageUrl = url;
          //console.log(url)
        })
        .catch(error => {
          console.log(error)
        });
    } else {
      imageUrl = theBlog.image
    }


    // console.log(
    //     imageUrl,
    //     blogid,
    //     title,
    //     url,
    //     category,
    //     select,
    //     shortdesc,
    //     author,
    //     metatitle,
    //     metakeyword,
    //     metadesc,
    //     detail
    // );


    if (totalsize > 2) {
      alert("Image size is too big in blog content");
      //document.querySelector('.note-editor').style.border = "2px solid #db0000";
    } else {


      fetch("/blogeditsubmit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogid,
          imageUrl,
          title,
          url,
          category,
          select,
          shortdesc,
          author,
          metatitle,
          metakeyword,
          metadesc,
          detail
        }),
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.isBlogEdited) {
            navigate('/admin/blogs-management')
          } else {
            alert('something went wrong, please reload and try again!!!')
          }
        })
        .catch(err => console.log(err))

    }



  }




  function settingUrl(e) {
    let title = e.target.value;
    let str = title.replace(/\s+/g, "-").toLowerCase();
    document.getElementById("url").value = str;
  }

  function setDynamicLabel(e) {
    // document.getElementById("image").files[0].size
    if (document.getElementById("image")?.files[0]?.name) {
      document.getElementById("dynamicLabel").innerHTML = document.getElementById("image")?.files[0]?.name;
    } else {
      document.getElementById("dynamicLabel").innerHTML = "Choose a file…"
    }
  }
  return (
    <>


      {/* {hasLoaded? */}




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
                <form id="frm" onSubmit={e => sendData(e)}>
                  <input type="text" className="form-control" name="blogid" id="blogid" placeholder=""
                    style={{ visibility: "hidden", position: "absolute" }} />
                  <div className="form-group">
                    <label htmlFor="title" className="font-weight-600">Title</label>
                    <input type="text" className="form-control" name="title" id="title" placeholder="Enter Title"
                      onChange={e => settingUrl(e)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="url" className="font-weight-600">Blog Url</label>
                    <input type="text" className="form-control" name="url" id="url" placeholder="Blog URL" required />
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
                    <textarea name="shortdesc" placeholder="" className="form-control" id="shortdesc" rows="3" required></textarea>
                  </div>

                  <div className="form-group d-flex flex-column">
                    <label htmlFor="image" className="font-weight-600">File</label>
                    <input type="file" name="image" id="image" className="custom-input-file border-0"
                      data-multiple-caption="{count} files selected" accept="image/*" multiple onChange={e => setDynamicLabel(e)} />
                    <label htmlFor="image" className='customLabel'>
                      <i className="fa fa-upload"></i>
                      <span id='dynamicLabel'>Choose a file…</span>
                    </label>
                    <div id="displayimg"></div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="author" className="font-weight-600">Author Name</label>
                    <input type="text" className="form-control" name="author" id="author" placeholder="Author Name" required />
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
                  <button id="go" type='submit' className='my-2 mb-3' >UPDATE</button>
                </form>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
            </div>
          </div>
        </div>
      </div>
      {/* :""} */}

    </>
  )
}

export default EditBlog