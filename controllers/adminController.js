const mongoose = require("mongoose")
const { dummyUserSubmittedBlogs, dummyMessages } = require("./../dummyData")

//Document Schema
const ADMIN = require("../schema/admin")
const BLOG = require("../schema/blog")
const CONTACT = require("../schema/contact")
const CATEGORY = require("../schema/category")
const USERBLOG = require("../schema/userblog");


const login = async (req, res) => {
    const credentials = req.body;

    try {
        const result = await ADMIN.findOne({ username: credentials.username, password: credentials.password })
        if (result) {
            if (credentials.username === result.username && credentials.password === result.password) {
                req.session.isAuthenticated = credentials.username;
                console.log('setting session',req.session)
                res.send({ matched: true });
            }
        } else {
            res.send({ matched: false });
        }
    } catch (err) {
        console.log(err);
        res.send({ message: "Internal server error" });
    }
}

const changePassword = async (req, res) => {
    const details = req.body;

    try {
        let result = await ADMIN.findOneAndUpdate({ username: details.uname, password: details.password }, { password: details.newPassword }, { new: true })
        // If `new` isn't true, `findOneAndUpdate()` will return the document as it was _before_ it was updated.
        if (result) {
            res.send({ isChanged: true, message: "Password changed successfully" });
        } else {
            res.send({ isChanged: false, message: "Incorrect username/password, Try again" });
        }
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.send({ message: "Logged out successfully!", isLoggedOut: true });
    } catch (err) {
        console.log(err);
        res.send({ message: "Something went wrong", isLoggedOut: false });
    }
}



const addBlog = async (req, res) => {
    const details = req.body;
    var date = new Date().toLocaleDateString();
    try {
        let blog = new BLOG({
            _id: new mongoose.Types.ObjectId(),
            title: details.title,
            url: details.url,
            category: details.category,
            type: details.select,
            shortdescription: details.shortdesc,
            authorname: details.author,
            image: details.imageUrl,
            metatitle: details.metatitle,
            metakeywords: details.metakeyword,
            metadescription: details.metadesc,
            detail: details.detail,
            date: date,
            status: "checked"
        })
        blog.save().then(response => {
            res.send({ isSubmitted: true, message: "Blog added successfully" });
        })
            .catch(err => {
                console.log(err)
                res.send({ isSubmitted: false, message: "Something went wrong, Try again" });
            })

    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}

const editBlog = async (req, res) => {
    const details = req.body;
    try {
        const result = await BLOG.findOneAndUpdate({ _id: details.blogid }, { title: details.title, url: details.url, category: details.category, type: details.select, detail: details.detail, shortdescription: details.shortdesc, image: details.imageUrl, authorname: details.author, metatitle: details.metatitle, metakeywords: details.metakeyword, metadescription: details.metadesc }, { new: true })
        if (result) {
            res.send({ isSubmitted: true, message: "Blog edited successfully" })
        } else {
            res.send({ isSubmitted: false, message: "Something went wrong" })
        }
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}

const deleteBlog = async (req, res) => {
    const details = req.body;

    try {
        let result = await BLOG.deleteOne({ _id: details.id })
        if (result.deletedCount > 0) {
            //if the blog is a user submitted blog then unpublish that
            await USERBLOG.findOneAndUpdate({ _id: details.id }, { status: "1" }, { new: true })
            res.send({ isDeleted: true, message: "Blog deleted successfully" });
        } else {
            res.send({ isDeleted: false, message: "Something went wrong, Try again" })
        }
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}

const blogsVisibility = async (req, res) => {
    const details = req.body;

    try {
        //findByIdAndUpdate: is the alternatice to directly use id
        let result = await BLOG.findOneAndUpdate({ _id: details.id }, { status: details.val }, { new: true })
        if (result) {
            res.send({ isSet: true, message: `Blog visibility has been turned ${details.val === 'checked' ? 'On' : 'Off'}` });
        } else {
            res.send({ isSet: false, message: "Something went wrong, Try again" })
        }
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}



const getMessages = async (req, res) => {
    try {
        if (req.session.isAuthenticated === process.env.GUEST_ID) {
            res.send(dummyMessages);
        } else {
            let ret = await CONTACT.find({})
            res.send(ret)
        }
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}

const deleteMessage = async (req, res) => {
    const details = req.body;

    try {
        let result = await CONTACT.deleteOne({ _id: details.id })
        res.send({ deletedCount: result.deletedCount, message: "Message deleted successfully" });
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}



const getUserSubmittedBlogs = async (req, res) => {
    try {
        if (req.session.isAuthenticated === process.env.GUEST_ID) {
            res.send(dummyUserSubmittedBlogs);
        } else {
            let ret = await USERBLOG.find({})
            res.send(ret);
        }

    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}

const publistUserSubmittedBlogs = async (req, res) => {
    try {
        const details = req.body;

        try {
            let result = await USERBLOG.findOneAndUpdate({ _id: details.id }, { status: details.val }, { new: true })
            if (result) {

                if (details.val === "checked") {
                    // add the is blog to blogs collection with status 1\
                    let newData = new BLOG({
                        _id: new mongoose.Types.ObjectId(details.id),
                        title: result.title,
                        url: result.url,
                        category: result.category,
                        type: result.type,
                        shortdescription: result.shortdescription,
                        authorname: result.authorname,
                        image: result.image,
                        metatitle: result.metatitle,
                        metakeywords: result.metakeywords,
                        metadescription: result.metadescription,
                        detail: result.detail,
                        date: result.date,
                        status: "1"
                    });
                    newData.save()
                } else {
                    await BLOG.deleteOne({ _id: details.id })
                }

                res.send({ isSet: true, message: `Blog has been ${details?.val === 'checked' ? 'published' : 'unpublished'}` });
            } else {
                res.send({ isSet: false, message: "Something went wrong, Try again" })
            }
        } catch (err) {
            console.log('err', err)
            res.send({ message: "Internal server error" });
        }


    } catch (err) {
        console.log('err', err)
        res.send({ message: "Internal server error" });
    }
}

const deleteUserSubmittedBlog = async (req, res) => {
    const details = req.body;

    try {
        let resp = await USERBLOG.deleteOne({ _id: details.id })
        res.send({ deletedCount: resp.deletedCount })
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}



const addCategory = async (req, res) => {
    const details = req.body;

    try {
        let result = await CATEGORY.find({})
        if (result.length === 0) {
            let category = new CATEGORY({ category: details.cat.toLowerCase() })
            category.save();
            res.send({ isAdded: true, message: "Category added successfully" });
        } else {
            let answer = "";
            for (var i = 0; i < result.length; i++) {
                if (result[i].category == details.cat.toLowerCase()) {
                    answer += "exist";
                    res.send({ isAdded: false, message: "Category already exists" });
                    break; //so that it stop right there instead of looping till the end
                }
            }

            if (answer !== "exist") {
                let category = new CATEGORY({ category: details.cat.toLowerCase() })
                category.save();
                res.send({ isAdded: true, message: "Category added successfully" });
            }
        }
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}

const deleteCategory = async (req, res) => {
    const details = req.body;
    try {
        let resp = await CATEGORY.deleteOne({ _id: details.id })
        if (resp.deletedCount >= 0) {
            res.send({ isDeleted: true, message: "Category deleted successfully" });
        } else {
            res.send({ isDeleted: false, message: "Something went wrong, Try again" });
        }
    } catch (err) {
        res.send({ message: "Internal server error" });
    }
}


module.exports = { addBlog, deleteBlog, editBlog, blogsVisibility, deleteMessage, getUserSubmittedBlogs, publistUserSubmittedBlogs, deleteUserSubmittedBlog, addCategory, deleteCategory, login, changePassword, logout, getMessages };