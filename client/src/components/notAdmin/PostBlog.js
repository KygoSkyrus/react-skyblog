import React, { useEffect } from 'react'

const PostBlog = () => {

 //google login is not working bcz in the firrebase you have to setup the origin,,do it when u host it
//summernote is working fine
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

        let email = document.getElementById("email").value;
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
            email,
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
        formdata.append("email", email);
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

        formdata1.append("email", email);
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




    return (
        <>

            {/* <!-- google login  --> */}
            <div id="google" className="">
                <div className="g-signin2" data-onsuccess="onSignIn"></div>
            </div>




            {/* <!-- Banner  --> */}
            <div className="container dnone" id="head">
                <div className="row">
                    <div className="col-12">
                        <div className="t-pt-70 t-pb-70 t-bg-secondary">
                            <h4 className="mt-0 t-text-light text-capitalize text-center" >Post a Blog</h4>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Banner End --> */}



            <div className="t-pt-70 t-pb-70 dnone" id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 t-mb-30 mb-lg-0">
                            <div className="row">

                                <div className="col-12">
                                    <div className="row d-flex justify-content-center" id="data">

                                        <div className="col-9  c12">
                                            <h4 className="mt-0 text-capitalize text-center">
                                                write a blog
                                            </h4>


                                            <div className="row mt-4">
                                                <div className="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">
                                                    <span id="frm">
                                                        <div className="form-group">
                                                            <label htmlFor="Email" className="font-weight-600">Email</label>
                                                            <input type="email" className="form-control" name="email" id="email"
                                                                autocomplete="off" placeholder="Enter your email"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="title" className="font-weight-600">Title</label>
                                                            <input type="text" className="form-control" name="title" id="title"
                                                                autocomplete="off" placeholder="Enter Title"
                                                                onChange={e => settingUrl(e)} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="url" className="font-weight-600">Project Url</label>
                                                            <input type="text" className="form-control" name="url" id="url"
                                                                autocomplete="off" placeholder="Project URL" />
                                                        </div>



                                                        <div className="form-group">
                                                            <label htmlFor="category" className="font-weight-600">Category</label>
                                                            <input type="text" className="form-control" name="category"
                                                                id="category" autocomplete="off" placeholder="Category" />
                                                        </div>

                                                        <label htmlFor="select" className="font-weight-600">Select</label>
                                                        <div className="form-group wrapper11">
                                                            <input type="radio" name="select" id="option-1"
                                                                value="featured blogs" />
                                                            <input type="radio" name="select" id="option-2"
                                                                value="trending blogs" />
                                                            <input type="radio" name="select" id="option-3"
                                                                value="popular blogs" />
                                                            <input type="radio" name="select" id="option-4"
                                                                value="todays blogs" />
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
                                                            <label htmlFor="shortdesc" className="font-weight-600">Short
                                                                Description</label>
                                                            <textarea name="shortdesc" placeholder="" className="form-control"
                                                                id="shortdesc" rows="3"></textarea>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="image" className="font-weight-600 d-block">File</label>
                                                            <input type="file" name="image" id="image" className="custom-input-file"
                                                                data-multiple-caption="{count} files selected" accept="image/*"
                                                                multiple required="required" style={{ border: "none" }} onChange={e => setDynamicLabel(e)} />
                                                            <label htmlFor="image" className="form-group" style={{
                                                                position: "absolute",
                                                                left: "0px",
                                                                background: "#ffffff",
                                                                borderRadius: "4px",
                                                                padding: " 5px",
                                                                paddingLeft: "14px",
                                                                border: "1px solid #ced4da",
                                                                color: "#6c6c6c",
                                                                width: "100%",
                                                            }}>
                                                                <i className="fa fa-upload"></i>
                                                                <span id='dynamicLabel'>Choose a file…</span>
                                                            </label>

                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="author" className="font-weight-600">Author Name</label>
                                                            <input type="text" className="form-control" name="author" id="author"
                                                                autocomplete="off" placeholder="Author Name" />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="metatitle" className="font-weight-600">Meta Title</label>
                                                            <input type="text" className="form-control" name="metatitle"
                                                                id="metatitle" autocomplete="off" placeholder="Meta Title" />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="metakeyword" className="font-weight-600">Meta
                                                                Keyword</label>
                                                            <input type="text" className="form-control" name="metakeyword"
                                                                id="metakeyword" autocomplete="off"
                                                                placeholder="Meta Keyword" />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="metadesc" className="font-weight-600">Meta
                                                                Description</label>
                                                            <input type="text" className="form-control" name="metadesc"
                                                                id="metadesc" autocomplete="off"
                                                                placeholder="Meta Description" />
                                                        </div>
                                                        <div className="d-flex justify-content-center">
                                                            <button id="go" className="newsletter__button " type="submit"
                                                                style={{ paddingLeft: "30px", paddingRight: "30px" }} onClick={(e) => sendData(e)}>
                                                                send blog
                                                                <span className="st-btn-icon">
                                                                    <span className="las la-arrow-right"></span>
                                                                </span>
                                                            </button>
                                                        </div>

                                                    </span>
                                                </div>
                                                <div className="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
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