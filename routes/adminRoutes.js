const express = require("express");
const router = express("router");
// const session = require('express-session')
// const MongoStore = require('connect-mongo');
// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });

const { addBlog, deleteBlog, blogsVisibility, editBlog, deleteMessage, getUserSubmittedBlogs, deleteUserSubmittedBlog, addCategory, deleteCategory, login, changePassword, logout, getMessages } = require("../controllers/adminController");






// session middleware
function isAuthenticated(req, res, next) {
    console.log('isAuthenticated----req.session.', req.session)
    if (req.session.isAuthenticated) {
        next();
    } else {
        // res.redirect('/admin/login');
        res.send({ matched: false, error: "Session expired" });
        // next('route')
    }
}

//not working for messages and user blogs 
function hasAccessRights(req, res, next) {
    console.log('hasAccessRights----req.session.', req.session, req.url)
    if (req.session.isAuthenticated === process.env.GUEST_ID && req.url !== "/getMessage" && req.url !== "/getUserSubmittedBlogs" && req.url !== "/logout") {
        res.send({ matched: true, message: "Guest user does not have rights to perform this action", isGuest: true })
    } else {
        next();
        // res.send({ matched: false, error: "Session expired" });
    }
}


router.use(isAuthenticated);
router.use(hasAccessRights);

//add to check if the guest is making change,
// NOTE: usersubmittedblog and message should be dummy

router.post("/authenticate", async (req, res) => {
    console.log('admin authhdjkdjksda')
    let isGuest= req.session.isAuthenticated===process.env.GUEST_ID ? true : false;
    res.send({ matched: true, isGuest });
})


//blog data[creates a new blog from admin side]
router.post("/addBlog", addBlog);

//edited blog submission [this is the admin blog][updates the changes in the blog]
router.post("/editblog", editBlog);

router.post("/deleteblog", deleteBlog);

router.post("/setBlogVisibility", blogsVisibility);








//----------------------------- USER MESSAGES-----------------------------------------------
//deleting messages records (contact form)
router.post("/deleteMessage", deleteMessage);

//for showing database messages records
router.post("/getMessage", getMessages);
//the api endpoint(route) for deleting these msgs is in server.js
//----------------------------- USER MESSAGES-----------------------------------------------




//------------------------USERBLOG-----------------------------

//gets all the blogs submitted by users [chnage name to getusersubmittedblogs]
router.post("/getUserSubmittedBlogs", getUserSubmittedBlogs)

//deletes the user submitted blogs
router.post("/deleteUserSubmittedBlog", deleteUserSubmittedBlog);
//------------------------USERBLOG-----------------------------



//------------------------CATEGORY-----------------------------
router.post("/addCategory", addCategory);

router.post("/deleteCategory", deleteCategory);
//------------------------CATEGORY-----------------------------




//------------------------------- ADMIN -------------------------------
// router.post("/login", urlencodedParser, login);

//needs to be attended, return on both if and else
router.post("/changepassword", changePassword);

router.post("/logout", logout);


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


module.exports = router;