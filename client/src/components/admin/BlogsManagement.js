import React, { useContext, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import LoaderAPI from '../../LoaderAPI';
import Sidebar from './Sidebar';
import Header from './Header';
import { BlogContext } from '../../App';
import { useToast } from '../ToastContext';

const BlogsManagement = ({ state }) => {

    const { isGuest } = state;
    const { allCategory, storage } = useContext(BlogContext);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [editorContent, setEditorContent] = useState()
    const [showLoader, setShowLoader] = useState(false)
    const { showToast } = useToast();


    async function sendData(e) {
        e.preventDefault()//this stops page to refresh if the form submission is used with type submit button
        setShowLoader(true)//start showing loader

        let image = document.getElementById("image")?.files[0];
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
        //let detail = document.querySelectorAll(".note-editable")[0]?.innerHTML; //summernote
        let detail = editorContent

        /*
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
        */

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

        fetch("/admin/addBlog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
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
                //resetting the fields
                document.getElementById("frm").reset();
                setDynamicLabel()
            })
            .catch(err => console.log(err))
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

    function settingUrl(e) {
        let title = e.target.value;
        let str = title.replace(/\s+/g, "-").toLowerCase();
        document.getElementById("url").value = str;
    }

    function setDynamicLabel(e) {
        if (document.getElementById("image")?.files[0]?.name) {
            document.getElementById("dynamicLabel").innerHTML = document.getElementById("image")?.files[0]?.name;
            const [file] = document.getElementById("image").files;
            let displayImg = document.getElementById('displayimg')
            displayImg.style.backgroundImage = `url('${URL.createObjectURL(file)}')`
            displayImg.style.display = "block"
        } else {
            document.getElementById("dynamicLabel").innerHTML = "Choose a file…"
        }
    }

    return (
        <>
            <div id='adminView'>
                <Sidebar />
                <div className='dynamicAdminContent'>
                    <Header isGuest={isGuest} />
                    <div className="body-content">
                        <div className="card mb-4">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="fs-17 font-weight-600 mb-0">Post a Blog</h6>
                                    </div>
                                    <div className="text-right">
                                        <div className="actions">
                                            <span onClick={e => window.location.reload()} className="action-item cursor-pointer" >
                                                <i
                                                    className="fas fa-refresh"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 p-l-30 p-r-30">
                                        <form id="frm" onSubmit={e => sendData(e)}>
                                            <div className="form-group">
                                                <label htmlFor="title" className="font-weight-600">Title</label>
                                                <input type="text" className="form-control" name="title" id="title"
                                                    autoComplete="off" placeholder="Enter Title" onChange={e => settingUrl(e)} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="url" className="font-weight-600">Blog Url</label>
                                                <input type="text" className="form-control" name="url" id="url"
                                                    autoComplete="off" placeholder="Blog URL" required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="category" className="font-weight-600">Category</label>
                                                <div className="">
                                                    <select className="form-control basic-single" name="category" id="category" >
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
                                                />                                    </div>

                                            <div className="form-group">
                                                <label htmlFor="shortdesc" className="font-weight-600">Short Description</label>
                                                <textarea name="shortdesc" placeholder="" className="form-control"
                                                    id="shortdesc" rows="3" required></textarea>
                                            </div>

                                            <div className="form-group d-flex flex-column">
                                                <label htmlFor="image" className="font-weight-600" id="colorRed">File<span
                                                    id="starRed">*</span></label>
                                                <input type="file" name="image" id="image" className="custom-input-file border-0"
                                                    data-multiple-caption="{count} files selected" accept="image/*" multiple
                                                    required onChange={e => setDynamicLabel(e)} />
                                                <label htmlFor="image" id="borderRed" className='customLabel' >
                                                    <i className="fa fa-upload"></i>
                                                    <span id='dynamicLabel'>Choose a file…</span>
                                                </label>
                                                <div id="displayimg"></div>
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
                                            <button id="go" type='submit' >
                                                POST
                                            </button>
                                        </form>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-6 p-l-30 p-r-30"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <LoaderAPI showLoader={showLoader} />
        </>
    )
}

export default BlogsManagement