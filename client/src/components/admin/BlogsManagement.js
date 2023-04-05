import React, { useEffect, useState } from 'react'

const BlogsManagement = (props) => {

    const { allCategory}=props

    const [everyBlog,setEveryBlog]=useState()

    useEffect(()=>{
      getAllBlogs()
    },[])

    //this is same as show api but not filtered
    async function getAllBlogs(){
        const res = await fetch("/show2", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        const data = await res.json();
        setEveryBlog(data)
        console.log("data", data);
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


    async function sendData(e) {


        //console.log("go");

        // let image = document.getElementById("image")[0].files[0];
        let image = document.getElementById("image").files[0];

        let title = document.getElementById("title").value;
        let url = document.getElementById("url").value;

        let category = document.getElementById("category").value;
        let select = document.querySelector("input[type=radio][name=select]:checked").value;

        let shortdesc = document.getElementById("shortdesc").value;
        let author = document.getElementById("author").value;

        let metatitle = document.getElementById("metatitle").value;
        let metakeyword = document.getElementById("metakeyword").value;
        let metadesc = document.getElementById("metadesc").value;

        // let hvalue = document.querySelectorAll(".note-editable")[0].html(); //summernote
        let hvalue = document.querySelectorAll(".note-editable")[0].innerHTML; //summernote



        let allimg = document.querySelectorAll(".note-editable")[0].getElementsByTagName('img');
        //   console.log('allimng', allimg)

        let totalsize = 0;

        for (let i = 0; i < allimg.length; i++) {
            let base64String = allimg[i].getAttribute("src");//base64 data

            let stringLength = base64String.length - 'data:image/png;base64,'.length;
            let sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            let sizeInKb = sizeInBytes / 1000000;
            totalsize += sizeInKb;
        }



        console.log(
            image,
            title,
            url,
            category,
            select,
            shortdesc,
            author,
            metatitle,
            metakeyword,
            metadesc
        );
        console.log(hvalue);



        let formdata = new FormData();
        formdata.append("image", image);
        formdata.append("title", title);
        formdata.append("url", url);
        formdata.append("category", category);
        formdata.append("select", select);
        formdata.append("shortdesc", shortdesc);
        formdata.append("author", author);
        formdata.append("metatitle", metatitle);
        formdata.append("metakeyword", metakeyword);
        formdata.append("metadesc", metadesc);



        let formdata1 = new FormData();
        formdata1.append("summernote", hvalue);

        formdata1.append("title", title);
        formdata1.append("url", url);
        formdata1.append("category", category);
        formdata1.append("select", select);
        formdata1.append("shortdesc", shortdesc);
        formdata1.append("author", author);
        formdata1.append("metatitle", metatitle);
        formdata1.append("metakeyword", metakeyword);
        formdata1.append("metadesc", metadesc);

        //  console.log(formdata1);



        if (totalsize > 2) {
            alert("Image size is too big!");
            //document.querySelector('.note-editor').style.border = "2px solid #db0000";
        } else {

            //   $.ajax({
            //           url: "/usersblogdata",
            //           data: formdata,
            //           contentType: false,
            //           processData: false,
            //           type: "POST",
            //           success: function (data) {
            //               location.reload();
            //           },
            //       });

            //   setTimeout(function () {

            //       $.ajax({
            //           url: "/usersblogdataEditor",
            //           data: formdata1,
            //           contentType: false,
            //           processData: false,
            //           type: "POST",
            //           success: function (data) {
            //               location.reload();
            //           },
            //       });
            //   }, 4000);
        }



    }


    async function deleteBlog(id) {
        console.log(id);
        const res = await fetch("/deleteblog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
            }),
        });

        const data = await res.json();
        console.log(data);
    }


    async function blogVisibility(id,e) {
         console.log(id);

        //checked attribute means its on and 1 or data="false" means its off
         let checkbox = document.getElementById('checkbox');

         let val;

         if(e.target.hasAttribute('checked')){
         
             console.log('it has checked')
             document.getElementById(`checkbox`+id).removeAttribute('checked')
             document.getElementById(`checkbox`+id).setAttribute('data','false')
             val='1';//final value of the checkbox
         }else if(e.target.hasAttribute('1') || e.target.hasAttribute('data')){
            console.log('it has 1')
            document.getElementById(`checkbox`+id).removeAttribute('1')
            document.getElementById(`checkbox`+id).removeAttribute('data')
            document.getElementById(`checkbox`+id).setAttribute('checked','checked')
             val='checked';//final value of the checkbox
         }

     
         
       
        console.log( val)

        const res = await fetch("/blogVisibility", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,val
            }),
        });

        const data = await res.json();
        console.log(data);
    }

  return (
    <>
    <div class="body-content">
                    <div class="card mb-4">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="fs-17 font-weight-600 mb-0">Post a Blog</h6>
                                </div>
                                <div class="text-right">
                                    <div class="actions">
                                        <a href="" class="action-item" onclick="function fun(){location.reload()}"><i
                                                class="ti-reload"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">
                                    <span id="frm">
                                        <div class="form-group">
                                            <label for="title" class="font-weight-600">Title</label>
                                            <input type="text" class="form-control" name="title" id="title"
                                                autocomplete="off" placeholder="Enter Title"  onChange={e => settingUrl(e)} />
                                        </div>
                                        <div class="form-group">
                                            <label for="url" class="font-weight-600">Project Url</label>
                                            <input type="text" class="form-control" name="url" id="url"
                                                autocomplete="off" placeholder="Project URL" />
                                        </div>

                                        <div class="form-group">
                                            <label for="category" class="font-weight-600">Category</label>
                                            <div class="">
                                                <select class="form-control basic-single" name="category" id="category">
                                                    <optgroup label="Select Category" id="optgroup">
                                                        {allCategory?.map(x=>{
                                                            return(<option value={x.category} >{x.category}</option>)
                                                        })}
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>

                                        <label for="select" class="font-weight-600">Select</label>
                                        <div class="form-group wrapper11">
                                            <input type="radio" name="select" id="option-1" value="featured blogs" />
                                            <input type="radio" name="select" id="option-2" value="trending blogs" />
                                            <input type="radio" name="select" id="option-3" value="popular blogs" />
                                            <input type="radio" name="select" id="option-4" value="todays blogs" />
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
                                            <label for="shortdesc" class="font-weight-600">Short Description</label>
                                            <textarea name="shortdesc" placeholder="" class="form-control"
                                                id="shortdesc" rows="3"></textarea>
                                        </div>

                                        <div class="form-group d-flex flex-column">
                                            <label for="image" class="font-weight-600" id="colorRed">File<span
                                                    id="starRed">*</span></label>
                                            <input type="file" name="image" id="image" class="custom-input-file border-0"
                                                data-multiple-caption="{count} files selected" accept="image/*" multiple
                                                required onChange={e => setDynamicLabel(e)} />
                                            <label for="image" id="borderRed" style={{
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
                                                <span id='dynamicLabel'>Choose a file…</span>
                                            </label>
                                        </div>

                                        <div class="form-group">
                                            <label for="author" class="font-weight-600">Author Name</label>
                                            <input type="text" class="form-control" name="author" id="author"
                                                autocomplete="off" placeholder="Author Name" />
                                        </div>

                                        <div class="form-group">
                                            <label for="metatitle" class="font-weight-600">Meta Title</label>
                                            <input type="text" class="form-control" name="metatitle" id="metatitle"
                                                autocomplete="off" placeholder="Meta Title" />
                                        </div>

                                        <div class="form-group">
                                            <label for="metakeyword" class="font-weight-600">Meta Keyword</label>
                                            <input type="text" class="form-control" name="metakeyword" id="metakeyword"
                                                autocomplete="off" placeholder="Meta Keyword" />
                                        </div>

                                        <div class="form-group">
                                            <label for="metadesc" class="font-weight-600">Meta Description</label>
                                            <input type="text" class="form-control" name="metadesc" id="metadesc"
                                                autocomplete="off" placeholder="Meta Description" />
                                        </div>
                                        <button id="go" >
                                            POST
                                        </button>
                                    </span>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-4">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 class="fs-17 font-weight-600 mb-0">Posted Blogs</h6>
                                </div>
                                <div class="text-right">
                                    <div class="actions">
                                        <a href="" class="action-item"><i class="ti-reload"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                       

                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table display table-bordered table-striped table-hover column-rendering">
                                    <thead>
                                        <tr>
                                            <th>S. No.</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Type</th>
                                            <th>Image</th>
                                            <th>Visibility</th>
                                            <th>Edit/Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody">

                                    {everyBlog?.map((x, index) => {
                                        return (
                                            <tr key={x._id}>
                                                <td>{index + 1}</td>
                                                <td>{x.title}</td>
                                                <td>{x.category}</td>
                                                <td>{x.type}</td>
                                                <td>{x.image}</td>
                                                <td><label class="switch"><input onClick={e=>blogVisibility(x._id,e)} id={"checkbox"+x._id} type="checkbox" checked={x.status} /><span class="slider round"></span></label>
                                                </td>
                                                <td style={{display: "flex",border: "none",justifyContent: "center"}}><a href={"/admin/blog-edit/"+x.url} target="blank" ><button style={{background: "#09660c"}}><i class="fa fa-pen"></i></button></a><button onClick={e=>deleteBlog(x._id,e)} style={{background: "#d50606"}}><i class="fa fa-trash" ></i></button></td>
                                            </tr>
                                        )
                                    })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default BlogsManagement