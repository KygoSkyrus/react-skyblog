//Document Schema
const ADMIN = require("../schema/admin")
const BLOG = require("../schema/blog")
const CONTACT = require("../schema/contact")
const CATEGORY = require("../schema/category")
const USERBLOG = require("../schema/userblog");

const {dummyUserSubmittedBlogs, dummyMessages} = require("./../dummyData")

const login = async (req, res) => {
    const credentials = req.body;
    console.log('login api', credentials)

    try {
        const result = await ADMIN.findOne({ username: credentials.username, password: credentials.password })
        if (result) {
            if (credentials.username === result.username && credentials.password === result.password) {
                console.log('innn---', req.session)

                req.session.isAuthenticated = credentials.username;

                res.send({ matched: true });
            }
        } else {
            res.send({ matched: false });
        }
    } catch (err) {
        console.log(err);
    }
}

const changePassword = async (req, res) => {
    const details = req.body;

    try {
        let result = await ADMIN.findOneAndUpdate({ username: details.uname, password: details.password }, { password: details.newPassword }, { new: true })
        // If `new` isn't true, `findOneAndUpdate()` will return the document as it was _before_ it was updated.
        if (result) {
            console.log("password changed!!!");
            res.send({ message: "changed" });
        } else {
            console.log("something went wrong");
        }
    } catch (err) {
        console.log(err);
    }
}

const logout = async (req, res) => {
    try {
        console.log('logout')
        req.session.destroy();
        res.send({ message: "Logged out successfully!", isLoggedOut: true });
    } catch (err) {
        console.log(err);
        res.send({ message: "something went wrong", isLoggedOut: false });
    }
}



const addBlog = async (req, res) => {
    const details = req.body;
    var date = new Date().toLocaleDateString();
    try {
        let blog = new BLOG({
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
            res.send({ blog_added: true });
        })
            .catch(err => {
                console.log(err)
                res.send({ blog_added: false });
            })

    } catch (err) {
        console.log(err);
    }
}

const editBlog = async (req, res) => {
    const details = req.body;
    try {
        const result = await BLOG.findOneAndUpdate({ _id: details.blogid }, { title: details.title, url: details.url, category: details.category, type: details.select, detail: details.detail, shortdescription: details.shortdesc, image: details.imageUrl, authorname: details.author, metatitle: details.metatitle, metakeywords: details.metakeyword, metadescription: details.metadesc }, { new: true })
        if (result) {
            res.send({ isBlogEdited: true })
        } else {
            res.send({ isBlogEdited: false })
        }
    } catch (err) {
        console.log(err);
    }

}

const deleteBlog = async (req, res) => {
    const details = req.body;

    try {
        let result = await BLOG.deleteOne({ _id: details.id })
        if (result.deletedCount > 0) {
            res.send({ isDeleted: true });
            console.log('result', result)
        }
    } catch (err) {
        console.log(err);
    }
}

const blogsVisibility = async (req, res) => {
    const details = req.body;

    try {
        //findByIdAndUpdate: is the alternatice to directly use id
        let result = await BLOG.findOneAndUpdate({ _id: details.id }, { status: details.val }, { new: true })
        if (result) {
            res.send({ isSet: true })
        } else {
            res.send({ isSet: false })
        }
    } catch (err) {
        console.log(err);
    }
}



const getMessages = async (req, res) => {
    try {
        if(req.session.isAuthenticated === process.env.GUEST_ID){
            res.send(dummyMessages);
        }else{
            let ret = await CONTACT.find({})
            res.send(ret)
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteMessage = async (req, res) => {
    const details = req.body;

    try {
        let result = await CONTACT.deleteOne({ _id: details.id })
        res.send({ deletedCount: result.deletedCount });
    } catch (err) {
        console.log(err);
    }
}



const getUserSubmittedBlogs = async (req, res) => {
    try {
        // console.log('req.ssjsjs',dummyUserSubmittedBlogs)
        if(req.session.isAuthenticated === process.env.GUEST_ID){
            res.send(dummyUserSubmittedBlogs);
        }else{
            let ret = await USERBLOG.find({})
            res.send(ret);
        }
          
    } catch (err) {
        console.log(err);
    }
}

const deleteUserSubmittedBlog = async (req, res) => {
    const details = req.body;

    try {
        let resp = await USERBLOG.deleteOne({ _id: details.id })
        res.send({ deletedCount: resp.deletedCount })
    } catch (err) {
        console.log(err);
    }
}



const addCategory = async (req, res) => {
    const details = req.body;

    try {
        let result = await CATEGORY.find({})
        if (result.length === 0) {
            let category = new CATEGORY({ category: details.cat.toLowerCase() })
            category.save()//saving category in db
            res.send({ message: "categoryAdded" });
        } else {
            let answer = "";
            for (var i = 0; i < result.length; i++) {
                if (result[i].category == details.cat.toLowerCase()) {
                    answer += "exist";
                    res.send({ message: "alreadyExists" }); //putting this will give error that cannoit set header after they are snet ,this might be bcz of the loop,,so whne the it loops for the first time and and its not the same ,,they are counting it asthe first time that res.send has apppear
                    break; //so that it stop right there instead of looping till the end
                }
            }

            if (answer !== "exist") {
                let category = new CATEGORY({ category: details.cat.toLowerCase() })
                category.save()//saving category in db
                res.send({ message: "categoryAdded" });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteCategory = async (req, res) => {
    const details = req.body;
    try {
        let resp = await CATEGORY.deleteOne({ _id: details.id })
        //console.log("Number of records deleted: " + resp.deletedCount);
        res.send({ affectedRows: resp.deletedCount, message: "deleted" });
    } catch (err) {
        console.log(err);
    }
}


module.exports = { addBlog, deleteBlog, editBlog, blogsVisibility, deleteMessage, getUserSubmittedBlogs, deleteUserSubmittedBlog, addCategory, deleteCategory, login, changePassword, logout, getMessages };