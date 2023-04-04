import React from 'react'

const BlogsManagement = () => {
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
                                                autocomplete="off" placeholder="Enter Title" onchange="settingUrl()" />
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
                                                    <optgroup label="Select Category" id="optgroup"></optgroup>
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

                                        <div class="form-group">
                                            <label for="image" class="font-weight-600" id="colorRed">File<span
                                                    id="starRed">*</span></label>
                                            <input type="file" name="image" id="image" class="custom-input-file"
                                                data-multiple-caption="{count} files selected" accept="image/*" multiple
                                                required />
                                            <label for="image" id="borderRed">
                                                <i class="fa fa-upload"></i>
                                                <span>Choose a file…</span>
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
                                    <tbody id="tbody"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* <!--Page length options--> */}
                </div>
    </>
  )
}

export default BlogsManagement