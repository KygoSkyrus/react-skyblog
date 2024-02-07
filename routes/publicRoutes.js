const express = require("express");
const router = express("router");
var session = require('express-session')
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//Document Schema
const ADMIN = require("./../schema/admin")
const BLOG = require("./../schema/blog")
const CONTACT = require("./../schema/contact")
const CATEGORY = require("./../schema/category")
const USERBLOG = require("./../schema/userblog")

router.use(session({
    // name: "keyboardcat",
    secret: 'of9578awo49y7rt9afyta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7200000,
        httpOnly: true,
        secure: false
    },
    store: MongoStore.create({
        mongoUrl: process.env.dbURI,
        // mongoOptions: advancedOptions // See below for details
    })
}))
// add secure : true for prod

// ExpressJS implements sessions using in-memory storage. Consequently, resetting your application will also reset the in-memory sessions. thats why mongodb is used as session storage

// middleware to test if authenticated
function isAuthenticated(req, res, next) {
    console.log('isAuthenticated----req.session.', req.session)
    if (req.session.isAuthenticated) {
        next();
    } else {
        // res.redirect('/admin/login');
        res.send({ matched: false });
        //    next('route')
    }
}


router.post("/admin/authenticate", isAuthenticated, async (req, res) => {
    console.log('admin authhdjkdjksda')
    res.send({ matched: true });

})


//blog data[creates a new blog from admin side]
router.post("/blogdata", isAuthenticated, async (req, res) => {
    const details = req.body;
    var date = new Date().toLocaleDateString();
    try {
        let blog = await new BLOG({
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
});


//deleting blog record
router.post("/deleteblog", async (req, res) => {
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
});


//seeting blogs visibility
router.post("/blogVisibility", async (req, res) => {
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
});


//for showing single detailed blog records
router.post("/singleblog", async (req, res) => {
    const details = req.body;

    try {
        let result = await BLOG.find({ url: details.blogurl })
        res.send(result);
    } catch (err) {
        console.log("error", err);
    }
});


//edited blog submission [this is the admin blog][updates the changes in the blog]
router.post("/blogeditsubmit", async (req, res) => {
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

});



//deleting messages records (contact form)
router.post("/deleteMessage", async (req, res) => {
    const details = req.body;

    try {
        let result = await CONTACT.deleteOne({ _id: details.id })
        res.send({ deletedCount: result.deletedCount });
    } catch (err) {
        console.log(err);
    }
});



//------------------------USERBLOG-----------------------------
//usersblog form data[this adds the new blog from user]
router.post("/userblog", async (req, res) => {
    const details = req.body;

    var date = new Date().toLocaleDateString();
    try {
        let userblog = await new USERBLOG({
            email: details.email,
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
        })
        userblog.save().
            then(response => {
                res.send({ blog_received: true });
            })
            .catch(err => {
                console.log(err)
                res.send({ blog_received: false });
            })
    } catch (err) {
        console.log(err);
    }
});

//gets all the blogs submitted by users
router.post("/usersubmittedblogs", async (req, res) => {
    try {
        let ret = await USERBLOG.find({})
        res.send(ret);
    } catch (err) {
        console.log(err);
    }
})

//deletes the user submitted blogs
router.post("/deleteuserblog", async (req, res) => {
    const details = req.body;

    try {
        let resp = await USERBLOG.deleteOne({ _id: details.id })
        res.send({ deletedCount: resp.deletedCount })
    } catch (err) {
        console.log(err);
    }
});
//------------------------USERBLOG-----------------------------



//------------------------CATEGORY-----------------------------
//for showing category records
router.post("/showCategory", async (req, res) => {
    try {
        let ret = await CATEGORY.find({})
        res.send(ret);
    } catch (err) {
        console.log(err);
    }
});

//for adding category records
router.post("/addCategory", async (req, res) => {
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
});

//for deleting category records
router.post("/deleteCategory", async (req, res) => {
    const details = req.body;
    try {
        let resp = await CATEGORY.deleteOne({ _id: details.id })
        //console.log("Number of records deleted: " + resp.deletedCount);
        res.send({ affectedRows: resp.deletedCount, message: "deleted" });
    } catch (err) {
        console.log(err);
    }
});
//------------------------CATEGORY-----------------------------



//search blog (from search bar) -- Not in use
// this uses regex to get documents containing a specific word in db
// router.post("/searchblog", async (req, res) => {
//   const value = req.body;
//   try {
//     if (value.val == "") {
//       res.send({}); //an empty data object is sent
//     } else {
//       let result = await BLOG.find({ "title": { "$regex": value.val, "$options": "i" } })
//       res.send(result);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });



//------------------------------- ADMIN -------------------------------
router.post("/admin/login", urlencodedParser, async (req, res) => {
    const credentials = req.body;
    console.log('login api', credentials)

    try {
        const result = await ADMIN.findOne({ username: credentials.username, password: credentials.password })
        if (result) {
            if (credentials.username === result.username && credentials.password === result.password) {
                console.log('innn---', req.session)

                req.session.isAuthenticated = credentials.username;

                // req.session.regenerate(function (err) {
                //     if (err) next(err)

                //     // store user information in session, typically a user id
                //     req.session.admin = credentials.username //req.body.admin

                //     // save the session before redirection to ensure page
                //     // load does not happen before session is saved
                //     req.session.save(function (err) {
                //         if (err) return next(err)

                //         res.send({ matched: true });
                //     })
                // })

                res.send({ matched: true });
            }
        } else {
            res.send({ matched: false });
        }
    } catch (err) {
        console.log(err);
    }
});

//needs to be attended, return on both if and else
//change password
router.post("/cpswrd", async (req, res) => {
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
});

//ADMIN LOGOUT
router.post("/admin/logout", async (req, res) => {

    try{
    console.log('logout')
    req.session.destroy();
    res.send({ message: "Logged out successfully!", isLoggedOut: true });

    // req.session.isAuthenticated = false;


    // req.session.admin = null
    // req.session.save(function (err) {
    //     if (err) next(err)

    //     res.redirect('/admin/login')

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    //   req.session.regenerate(function (err) {
    //     if (err) next(err)
    //     res.redirect('/')
    //   })
    // })

    // res.clearCookie("admin");
    } catch (err) {
        console.log(err);
        res.send({ message: "something went wrong", isLoggedOut: false });
    }
});


module.exports = router;