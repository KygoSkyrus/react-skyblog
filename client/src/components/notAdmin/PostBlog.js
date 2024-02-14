import React, { useState, useEffect, useContext } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useGoogleLogin } from '@react-oauth/google';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { v4 as uuidv4 } from 'uuid';

import Banner from './Banner';
import LoaderAPI from '../../LoaderAPI';
import { BlogContext } from '../../App';
import { useToast } from '../ToastContext';

const PostBlog = () => {

    const { storage } = useContext(BlogContext);

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [editorContent, setEditorContent] = useState()
    const [showLoader, setShowLoader] = useState(false)
    const [user, setUser] = useState();
    const { showToast } = useToast();


    async function sendData(e) {
        setShowLoader(true)
        e.preventDefault()//this stops page to refresh if the form submission is used with type submit button

        let image = document.getElementById("image")?.files[0];
        let email = document.getElementById("email")?.value;
        let title = document.getElementById("title")?.value;
        let url = document.getElementById("url")?.value;
        let category = document.getElementById("category")?.value;
        let select
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
        let detail = editorContent

        let imageUrl;
        const imageRef = ref(storage, "skyblog/" + uuidv4());
        //uploading image to firebase storage
        await uploadBytes(imageRef, image)
            .then(snapshot => {
                return snapshot.metadata.fullPath;
            })
            .catch(error => {
                console.log(error)
            });

        //getting the image url
        await getDownloadURL(imageRef)
            .then(url => {
                imageUrl = url;
            })
            .catch(error => {
                console.log(error)
            });

        fetch("/adduserblog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
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
                setShowLoader(false)
                showToast(data.message)
                // resetting fields
                document.getElementById("frm").reset();
                setDynamicLabel()
            })
            .catch(err => console.log(err))
    }

    function settingUrl(e) {
        let title = e.target.value;
        let str = title.replace(/\s+/g, "-").toLowerCase();
        document.getElementById("url").value = str;
    }

    function setDynamicLabel(e) {
        let dynamicLabel = document.getElementById("dynamicLabel")
        let displayImg = document.getElementById('displayimg')
        if (document.getElementById("image")?.files[0]?.name) {
            dynamicLabel.innerHTML = document.getElementById("image")?.files[0]?.name;
            const [file] = document.getElementById("image").files;
            displayImg.style.backgroundImage = `url('${URL.createObjectURL(file)}')`
            displayImg.style.display = "block"
        } else {
            dynamicLabel.innerHTML = "Choose a file…";
            displayImg.style.display = "none";
        }
    }

    const onEditorStateChange = function (editorState) {
        setEditorState(editorState);
        //const { blocks } = convertToRaw(editorState.getCurrentContent());
        //gets you the plain text
        // let text = blocks.reduce((acc, item) => {
        //   acc = acc + item.text;
        //   return acc;
        // }, "");
        //let text = editorState.getCurrentContent().getPlainText("\u0001");

        let rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(rawContentState);
        setEditorContent(markup)
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        let userId = '';//Cookies.get('userid')
        if (userId) {
            setUser(true)
            if (document.getElementById('email'))
                document.getElementById('email').value = userId
        } else if (user) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then(response => response.json())
                .then((res) => {
                    // Cookies.set('userid', res.email, { httpOnly: false, expires: 0.5 })
                    document.getElementById('email').value = res.email
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // log out function to log the user out of google 
    // const logOut = () => {
    //     googleLogout();
    // };

    return (
        <>
            {/* <!-- Banner  --> */}
            <Banner text={"post a blog"} />
            {/* <!-- Banner End --> */}

            {!user ?
                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "50vh" }}>
                    <section>You need to sign in first to post your blog to us</section>
                    <button onClick={() => login()} className='d-flex googleLogin mt-3'>
                        <span>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c" style={{ width: "20px" }}><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                        </span>
                        <section>&nbsp;&nbsp;Sign in with Google</section></button>
                </div>
                :

                <div className="t-pt-70 t-pb-70 dnone" id="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 t-mb-30 mb-lg-0">
                                <div className="row">

                                    <div className="col-12">
                                        <div className="row d-flex justify-content-center" id="data">

                                            <div className="col-9  c12">

                                                <div className="row mt-4">
                                                    <div className="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">

                                                        <form id="frm" onSubmit={(e) => sendData(e)}>
                                                            <div className="form-group">
                                                                <label htmlFor="Email" className="font-weight-600">Email</label>
                                                                <input type="email" className="form-control" name="email" id="email"
                                                                    autoComplete="off" placeholder="Enter your email" required readOnly
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="title" className="font-weight-600">Title</label>
                                                                <input type="text" className="form-control" name="title" id="title"
                                                                    autoComplete="off" placeholder="Enter Title"
                                                                    onChange={e => settingUrl(e)} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="url" className="font-weight-600">Blog Url</label>
                                                                <input type="text" className="form-control" name="url" id="url"
                                                                    autoComplete="off" placeholder="Blog URL" required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="category" className="font-weight-600">Category</label>
                                                                <input type="text" className="form-control" name="category"
                                                                    id="category" autoComplete="off" placeholder="Category" required />
                                                            </div>

                                                            <label htmlFor="select" className="font-weight-600">Select type</label>
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
                                                                    <span>&nbsp;Featured</span>
                                                                </label>
                                                                <label htmlFor="option-2" className="option option-2">
                                                                    <div className="dot"></div>
                                                                    <span>&nbsp;Trending</span>
                                                                </label>
                                                                <label htmlFor="option-3" className="option option-3">
                                                                    <div className="dot"></div>
                                                                    <span>&nbsp;Popular</span>
                                                                </label>
                                                                <label htmlFor="option-4" className="option option-4">
                                                                    <div className="dot"></div>
                                                                    <span>&nbsp;Todays</span>
                                                                </label>
                                                                <label htmlFor="option-5" className="option option-5">
                                                                    <div className="dot"></div>
                                                                    <span>&nbsp;None</span>
                                                                </label>
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="summernote" className="font-weight-600">Blog Content</label>
                                                                <Editor
                                                                    editorState={editorState}
                                                                    toolbarClassName="toolbarClassName"
                                                                    wrapperClassName="wrapperClassName"
                                                                    editorClassName="editorClassName"
                                                                    onEditorStateChange={onEditorStateChange}
                                                                    mention={{
                                                                        separator: " ",
                                                                        trigger: "@",
                                                                        suggestions: [
                                                                            { text: "APPLE", value: "apple" },
                                                                            { text: "BANANA", value: "banana", url: "banana" },
                                                                            { text: "CHERRY", value: "cherry", url: "cherry" },
                                                                            { text: "DURIAN", value: "durian", url: "durian" },
                                                                            { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
                                                                            { text: "FIG", value: "fig", url: "fig" },
                                                                            { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
                                                                            { text: "HONEYDEW", value: "honeydew", url: "honeydew" }
                                                                        ]
                                                                    }}
                                                                />
                                                            </div>



                                                            <div className="form-group">
                                                                <label htmlFor="shortdesc" className="font-weight-600">Short
                                                                    Description</label>
                                                                <textarea name="shortdesc" placeholder="" className="form-control"
                                                                    id="shortdesc" rows="3" required></textarea>
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="image" className="font-weight-600 d-block">File</label>
                                                                <input type="file" name="image" id="image" className="custom-input-file"
                                                                    data-multiple-caption="{count} files selected" accept="image/*"
                                                                    multiple required style={{ border: "none" }} onChange={e => setDynamicLabel(e)} />
                                                                <label htmlFor="image" className="form-group customLabel">
                                                                    <i className="fa fa-upload"></i>
                                                                    <span id='dynamicLabel'>Choose a file…</span>
                                                                </label>
                                                                <div id="displayimg"></div>
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="author" className="font-weight-600">Author Name</label>
                                                                <input type="text" className="form-control" name="author" id="author"
                                                                    autoComplete="off" placeholder="Author Name" required />
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="metatitle" className="font-weight-600">Meta Title</label>
                                                                <input type="text" className="form-control" name="metatitle"
                                                                    id="metatitle" autoComplete="off" placeholder="Meta Title" />
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="metakeyword" className="font-weight-600">Meta
                                                                    Keyword</label>
                                                                <input type="text" className="form-control" name="metakeyword"
                                                                    id="metakeyword" autoComplete="off"
                                                                    placeholder="Meta Keyword" />
                                                            </div>

                                                            <div className="form-group">
                                                                <label htmlFor="metadesc" className="font-weight-600">Meta
                                                                    Description</label>
                                                                <input type="text" className="form-control" name="metadesc"
                                                                    id="metadesc" autoComplete="off"
                                                                    placeholder="Meta Description" />
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <button className="newsletter__button " type="submit"
                                                                    style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                                                                    send blog
                                                                    <span className="st-btn-icon">
                                                                        <span className="las la-arrow-right"></span>
                                                                    </span>
                                                                </button>
                                                            </div>

                                                        </form>
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
            }
            <LoaderAPI showLoader={showLoader} />
        </>
    )
}

export default PostBlog