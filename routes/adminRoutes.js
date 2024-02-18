const express = require("express");
const router = express("router");
const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });

const { addBlog,
    deleteBlog,
    blogsVisibility,
    editBlog, deleteMessage,
    getUserSubmittedBlogs,
    publistUserSubmittedBlogs,
    deleteUserSubmittedBlog,
    addCategory,
    deleteCategory,
    changePassword,
    logout,
    getMessages
} = require("../controllers/adminController");


// session middleware
function isAuthenticated(req, res, next) {
    console.log("session-",req.session)
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.send({ matched: false, error: "Session expired" });
    }
}

// access rights middleware (for guest admin)
function hasAccessRights(req, res, next) {
    if (req.session.isAuthenticated === process.env.GUEST_ID && req.url !== "/getMessage" && req.url !== "/getUserSubmittedBlogs" && req.url !== "/logout") {
        res.send({ matched: true, message: "Guest user does not have rights to perform this action", isGuest: true })
    } else {
        next();
    }
}


router.use(isAuthenticated);
router.use(hasAccessRights);


router.post("/authenticate", async (req, res) => {
    let isGuest = req.session.isAuthenticated === process.env.GUEST_ID ? true : false;
    res.send({ matched: true, isGuest });
})


// ----------- Admin rights ----------------
router.post("/addBlog", addBlog);
router.post("/editblog", editBlog);
router.post("/deleteblog", deleteBlog);
router.post("/setBlogVisibility", blogsVisibility);


//----------- User Feedback ----------------
// (recieved via contact form)
router.post("/deleteMessage", deleteMessage);
router.post("/getMessage", getMessages); // gets all messages


//----------- User submitted Blogs ----------------
router.post("/getUserSubmittedBlogs", getUserSubmittedBlogs)
router.post("/publishBlog", publistUserSubmittedBlogs); // publish the user submitted blog [admin only]
router.post("/deleteUserSubmittedBlog", deleteUserSubmittedBlog);


//----------- Category ----------------
router.post("/addCategory", addCategory);
router.post("/deleteCategory", deleteCategory);


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