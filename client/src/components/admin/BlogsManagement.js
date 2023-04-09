import React, { useEffect, useState } from 'react'


import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes ,getDownloadURL} from "firebase/storage";

const BlogsManagement = (props) => {


    //NOTE: reloading this page bcz the summernote does not initialize without reloading
    const { allCategory } = props

    const [everyBlog, setEveryBlog] = useState()
    const [checkedOrNot, setCheckedOrNot] = useState()

    useEffect(() => {
        console.log('00000000000000')
        getAllBlogs()

    }, [])


    
    function image(e) {
        
        const firebaseConfig = {
            apiKey: "AIzaSyD356cys4X2N0DHboL4T8MZCDR1BuN2n88",
            authDomain: "shopp-itt.firebaseapp.com",
            projectId: "shopp-itt",
            storageBucket: "shopp-itt.appspot.com",
            messagingSenderId: "500784370915",
            appId: "1:500784370915:web:5433a992ab3e3229daa1d6",
            measurementId: "G-DVFRLB25DQ"
        };
        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);


        let file = document.getElementById("image").files[0];
        console.log('image',file)
        
        //to upload image
        // const storageRef = ref(storage, file.name);
        // uploadBytes(storageRef, file).then((snapshot) => {
        //     console.log('Uploaded image successfully!',snapshot);
        // });


        const pathReference = ref(storage, 'sky.jpg');

        getDownloadURL(ref(storage, 'sky.jpg'))
  .then((url) => {
console.log('url',url)
//store this url to data base

   


  })
  .catch((error) => {
    // Handle any errors
  });


    }

    //this is same as show api but not filtered
    async function getAllBlogs() {
        console.log('111111111111111111')
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

        // let detail = document.querySelectorAll(".note-editable")[0].html(); //summernote
        let detail = document.querySelectorAll(".note-editable")[0].innerHTML; //summernote



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

        console.log("image,".image);


        // console.log(
        //     image,
        //     title,
        //     url,
        //     category,
        //     select,
        //     shortdesc,
        //     author,
        //     metatitle,
        //     metakeyword,
        //     metadesc
        // );
        //console.log(detail);



        let formdata = new FormData();
        formdata.append("summernote", detail);
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
        formdata1.append("summernote", detail);

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


            // fetch("/blogdata", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         image,
            //         title,
            //         url,
            //         category,
            //         select,
            //         shortdesc,
            //         author,
            //         metatitle,
            //         metakeyword,
            //         metadesc,
            //         detail
            //     }),
            // }).then(response=>response.json())
            // .then(data=>console.log(data))
            // .catch(err=>console.log(err))


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


    async function blogVisibility(id, e) {
        console.log(id, e.target.getAttribute('data-status'));

        //checked attribute means its on and 1 or data="false" means its off
        let checkbox = document.getElementById('checkbox');

        let val;

        if (e.target.hasAttribute('checked')) {

            console.log('it has checked')
            document.getElementById(`checkbox` + id).removeAttribute('checked')
            //document.getElementById(`checkbox`+id).setAttribute('datacheck','false')
            val = '1';//final value of the checkbox
        } else if (e.target.getAttribute('data-status') === "1") {
            console.log('it has 1')
            document.getElementById(`checkbox` + id).removeAttribute('1')
            //document.getElementById(`checkbox`+id).removeAttribute('datacheck')
            document.getElementById(`checkbox` + id).setAttribute('checked', 'checked')
            val = 'checked';//final value of the checkbox
        }




        console.log(val)

        const res = await fetch("/blogVisibility", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id, val
            }),
        });

        const data = await res.json();
        console.log(data);
    }

    return (
        <>
            <div className="body-content">
                <div className="card mb-4">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fs-17 font-weight-600 mb-0">Post a Blog</h6>
                            </div>
                            <div className="text-right">
                                <div className="actions">
                                    <a href="" className="action-item" ><i
                                        className="fas fa-refresh"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">
                                <span id="frm">
                                    <div className="form-group">
                                        <label htmlFor="title" className="font-weight-600">Title</label>
                                        <input type="text" className="form-control" name="title" id="title"
                                            autoComplete="off" placeholder="Enter Title" onChange={e => settingUrl(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="url" className="font-weight-600">Project Url</label>
                                        <input type="text" className="form-control" name="url" id="url"
                                            autoComplete="off" placeholder="Project URL" />
                                    </div>

                                    <div className="form-group">
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
                                        <textarea id="summernote" name="summernote"></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="shortdesc" className="font-weight-600">Short Description</label>
                                        <textarea name="shortdesc" placeholder="" className="form-control"
                                            id="shortdesc" rows="3"></textarea>
                                    </div>

                                    <div className="form-group d-flex flex-column">
                                        <label htmlFor="image" className="font-weight-600" id="colorRed">File<span
                                            id="starRed">*</span></label>
                                        <input type="file" name="image" id="image" className="custom-input-file border-0"
                                            data-multiple-caption="{count} files selected" accept="image/*" multiple
                                            required onChange={e => setDynamicLabel(e)} />
                                        <label htmlFor="image" id="borderRed" style={{
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
                                            <span id='dynamicLabel'>Choose a file…</span>
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="author" className="font-weight-600">Author Name</label>
                                        <input type="text" className="form-control" name="author" id="author"
                                            autoComplete="off" placeholder="Author Name" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="metatitle" className="font-weight-600">Meta Title</label>
                                        <input type="text" className="form-control" name="metatitle" id="metatitle"
                                            autoComplete="off" placeholder="Meta Title" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="metakeyword" className="font-weight-600">Meta Keyword</label>
                                        <input type="text" className="form-control" name="metakeyword" id="metakeyword"
                                            autoComplete="off" placeholder="Meta Keyword" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="metadesc" className="font-weight-600">Meta Description</label>
                                        <input type="text" className="form-control" name="metadesc" id="metadesc"
                                            autoComplete="off" placeholder="Meta Description" />
                                    </div>
                                    <button id="go" onClick={e => image(e)} >
                                        POST
                                    </button>
                                </span>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
                        </div>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="fs-17 font-weight-600 mb-0">Posted Blogs</h6>
                            </div>
                            <div className="text-right">
                                <div className="actions">
                                    <a href="" className="action-item"><i className="fas fa-refresh"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table display table-bordered table-striped table-hover column-rendering">
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
                                                <td><label className="switch"><input onClick={e => blogVisibility(x._id, e)} id={"checkbox" + x._id} type="checkbox" defaultChecked={x.status === "checked" ? "defaultChecked" : false} data-status={x.status} /><span className="slider round"></span></label>
                                                </td>
                                                <td style={{ display: "flex", border: "none", justifyContent: "center" }}><a href={"/admin/edit-blog/" + x.url} target="blank" ><button style={{ background: "#09660c" }}><i className="fa fa-pen"></i></button></a><button onClick={e => deleteBlog(x._id, e)} style={{ background: "#d50606" }}><i className="fa fa-trash" ></i></button></td>
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