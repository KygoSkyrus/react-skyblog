const express = require("express");
const router = express("router");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const { login } = require("../controllers/adminController");
const { getTheBlog,
    userSubmittedBlog,
    getAllCategory,
    getAllBlogs,
    addMessage
} = require("../controllers/publicController");


//each and every blogs
router.post("/getallblogs", getAllBlogs);

//for showing single detailed blog records
router.post("/gettheblog", getTheBlog);

// add a message
router.post("/addmessage", urlencodedParser, addMessage);

//user's blog
router.post("/adduserblog", userSubmittedBlog);

//for showing category records
router.post("/getallcategory", getAllCategory);


router.post("/admin/login", urlencodedParser, login);


module.exports = router;