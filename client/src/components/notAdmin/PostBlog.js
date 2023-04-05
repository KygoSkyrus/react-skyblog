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
            <div id="google" class="">
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>




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
                                                                onChange={e => settingUrl(e)} />
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="url" class="font-weight-600">Project Url</label>
                                                            <input type="text" class="form-control" name="url" id="url"
                                                                autocomplete="off" placeholder="Project URL" />
                                                        </div>



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
                                                                multiple required="required" style={{ border: "none" }} onChange={e => setDynamicLabel(e)} />
                                                            <label for="image" class="form-group" style={{
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
                                                                style={{ paddingLeft: "30px", paddingRight: "30px" }} onClick={(e) => sendData(e)}>
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