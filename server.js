const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const articles = require("./routes/articles");
const blogEdit = require("./routes/edit");
const categorySingle = require("./routes/category");
const admin = require("./routes/admin");

const ADMIN = require("./schema/admin")
const BLOG = require("./schema/blog")
const CONTACT = require("./schema/contact")
const CATEGORY = require("./schema/category")
const USERBLOG = require("./schema/userblog")

dotenv.config({ path: './env/config.env' });
app.set("view engine", "ejs");
app.use(cookieParser());

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(require("./routes/route"));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/views/panel"));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};



const db = process.env.dbURI;
//useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
//useUnifiedTopology: Set to true to opt in to using the MongoDB driver's new connection management engine. 
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('db connected');
}).catch((err) => console.log(err));


// const upload = multer({
//   dest: "./views/upload",
// });
//setting it to empty bcz with destination defined it will upload the files at that destination and also set the path of the file to that
//const upload = multer({});


app.use("/category", categorySingle); //for all category routes
app.use("/", articles); //every route from the blogrouter will be added as suffuc of the /blogs

app.use("/admin", admin); //for all admin related routes
app.use("/admin/blog-edit", blogEdit); //for blog-edit route

//for homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//this is the admin blog edit,,[it is just to update the summernote]
//this recive the note editor content 4sec after the rest of the form data submits
app.post("/blogdataEditor", async (req, res) => {
  const details = req.body;
  console.log("editor", details);

  if (details.summernote !== "<p><br></p>") {
    console.log("yes", details.summernote.length);

    try {
      let result = await BLOG.findOneAndUpdate({ title: details.title, url: details.url, shortdescription: details.shortdesc, authorname: details.author, metatitle: details.metatitle, metakeywords: details.metakeyword, metadescription: details.metadesc, }, { detail: details.summernote }, { new: true })


      console.log("summernote added", result);
      res.redirect("/admin/blogs-management");
      //});
    } catch (err) {
      console.log(err);
    }
  }
});




//blog data[creates a new blog from admin side]
app.post("/blogdata", async (req, res) => {
  const details = req.body;
  console.log("DD", details);

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
      console.log('res', response)
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

//https://picsum.photos/400/300

//deleting blog record
app.post("/deleteblog", async (req, res) => {
  const details = req.body;
  console.log(details);

  try {


    let resp = await BLOG.deleteOne({ _id: details.id })
    console.log(resp)
    console.log("Number of records deleted: " + resp.deletedCount);


    //for deleting image from cloud
    //  let resp1=await cloudinary.uploader.destroy("WhatsApp Image 2023-03-09 at 12.43.24 PM", function(error,result) {
    //   console.log(result, error) 
    // }) 



    //res.redirect("/blogs-management");
    //res.redirect(req.originalUrl)
    //});
  } catch (err) {
    console.log(err);
  }
});

//seeting blogs visibility
app.post("/blogVisibility", async (req, res) => {
  const details = req.body;
  console.log('visibilityyyyy', details);

  try {
    // var sql = `UPDATE blog SET status = '${details.val}' WHERE id = '${details.id}'`;
    // con.query(sql, function (err, result) {
    //   if (err) throw err;
    //console.log(result);
    //findByIdAndUpdate: is the alternatice to directly use id
    let result = await BLOG.findOneAndUpdate({ _id: details.id }, { status: details.val }, { new: true })
    console.log("result in visibility", result);
    //res.redirect("/blogs-management");
    // res.redirect(req.originalUrl)
    // });
  } catch (err) {
    console.log(err);
  }
});




//for showing single detailed blog records
app.post("/singleblog", async (req, res) => {
  const details = req.body;
  //console.log("single blog", details);

  try {
    let result = await BLOG.find({ url: details.blogurl })
    //console.log('sb res',result)
    res.send(result);
    //   }
    // );
  } catch (err) {
    console.log("error", err);
  }
});



//also use the common allblog state tp get the blog
//[admin blog] send the slected blog to edit page
//for editing a  blog( this send back the data related to a specific blog to the blog edit page)
app.post("/blogedit", async (req, res) => {
  const details = req.body;
  console.log("bid", details);

  try {
    let result = await BLOG.find({ url: details.blogurl })
    //console.log('url',result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

//not working
//edited blog submission [this is the admin blog][updates the chnages in the blog]
app.post("/blogeditsubmit", async (req, res) => {
  const details = req.body;
  console.log("blogeditsubmit", details);

  if (req.file === undefined) {
    console.log("req.file is undefined / no image");

    var date = new Date().toLocaleDateString();

    try {

      let result = await BLOG.findOneAndUpdate({ title: details.title, url: details.url, category: details.category, type: details.select, shortdescription: details.shortdesc, image: details.image, authorname: details.author, metatitle: details.metatitle, metakeywords: details.metakeyword, metadescription: details.metadesc, date: date }, { _id: details.bid }, { new: true })


      //var sql = `UPDATE blog SET title = '${details.title}', url = '${details.url}', category = '${details.category}', type = '${details.select}', shortdescription = '${details.shortdesc}', authorname = '${details.author}', metatitle = '${details.metatitle}', metakeywords = '${details.metakeyword}', metadescription = '${details.metadesc}',date = '${date}' WHERE id = '${details.bid}' `;

      // con.query(sql, function (err, result) {
      //if (err) throw err;
      console.log("blog edited!!!", result);
      //res.redirect("/admin/blogs-management");
      //});
    } catch (err) {
      console.log(err);
    }
  } else {
    const tempPath = req.file.path;
    const targetPath = path.join(
      __dirname,
      `./views/upload/${req.file.originalname}`
    ); //destination folder

    //for uploading image  file in the folder(only the .png etc files will be saved)
    if (
      path.extname(req.file.originalname).toLowerCase() === ".png" ||
      path.extname(req.file.originalname).toLowerCase() === ".jpg" ||
      path.extname(req.file.originalname).toLowerCase() === ".jpeg" ||
      path.extname(req.file.originalname).toUpperCase() === ".PNG" ||
      path.extname(req.file.originalname).toUpperCase() === ".JPG" ||
      path.extname(req.file.originalname).toUpperCase() === ".JPEG"
    ) {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
        console.log("image uploaded");
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);
        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png .jpg .jpeg files are allowed!");
      });
    }

    var date = new Date().toLocaleDateString();

    try {

      let result = await BLOG.findOneAndUpdate({ title: details.title, url: details.url, category: details.category, type: details.select, shortdescription: details.shortdesc, image: req.file.originalname, authorname: details.author, metatitle: details.metatitle, metakeywords: details.metakeyword, metadescription: details.metadesc, date: date }, { _id: details.bid }, { new: true })

      //var sql = `UPDATE blog SET title = '${details.title}', url = '${details.url}', category = '${details.category}', type = '${details.select}', shortdescription = '${details.shortdesc}', image = '${req.file.originalname}', authorname = '${details.author}', metatitle = '${details.metatitle}', metakeywords = '${details.metakeyword}', metadescription = '${details.metadesc}',date = '${date}' WHERE id = '${details.bid}' `;
      //con.query(sql, function (err, result) {
      //  if (err) throw err;
      console.log("blog edited!!!", result);
      //});
    } catch (err) {
      console.log(err);
    }
  }
});

//deleting messages records (contact form)
app.post("/deleteMessage", async (req, res) => {
  const details = req.body;
  console.log('deleet messsage', details.id);

  try {
    //var sql = `DELETE FROM contact WHERE id = ${details.id}`;
    //con.query(sql, function (err, result) {
    //  if (err) throw err;
    let result = await CONTACT.deleteOne({ _id: details.id })
    console.log(result)
    console.log("Number of records deleted: " + result.deletedCount);
    res.send({ deletedCount: result.deletedCount });
    //add feature to tell frontend that record has been deleted
    //});
  } catch (err) {
    console.log(err);
  }
});

//------------------------USERBLOG-----------------------------
//usersBlog (blogs send by the users inserted into db in two phase)
//this recive the note editor content 4sec after the rest of the form data submits[for userblog summernote]
app.post("/usersblogdataEditor", async (req, res) => {
  const details = req.body;
  console.log("editor", details);

  if (details.summernote !== "<p><br></p>") {
    console.log("yes", details.summernote.length);

    try {
      let result = await USERBLOG.findOneAndUpdate({ email: details.email, title: details.title, url: details.url, shortdescription: details.shortdesc, authorname: details.author, metatitle: details.metatitle, metakeywords: details.metakeyword, metadescription: details.metadesc, }, { detail: details.summernote }, { new: true })


      //var sql = `UPDATE usersblog SET detail = '${details.summernote}' WHERE  email = '${details.email}' AND title = '${details.title}' AND url = '${details.url}' AND shortdescription = '${details.shortdesc}' AND authorname = '${details.author}' AND metatitle = '${details.metatitle}' AND metakeywords = '${details.metakeyword}' AND metadescription = '${details.metadesc}' `;
      //con.query(sql, function (err, result) {
      // console.log("last errrrr");
      // if (err) throw err;
      console.log("last errrrr dnt run");
      console.log("summernote added", result);
      res.redirect("back");
      //});
    } catch (err) {
      console.log(err);
    }
  }
});

//usersblog form data[this adds the new blog from user]
app.post("/usersblogdata", async (req, res) => {
  const details = req.body;
  //console.log("DD", details);

  if (req.file === undefined) {
    console.log("req.file is undefined / no image");

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
        metatitle: details.metatitle,
        metakeywords: details.metakeyword,
        metadescription: details.metadesc,
        date: date,
        detail: details.summernote
      })
      userblog.save()

      //var sql = `INSERT INTO usersblog (email, title, url, category, type, shortdescription, authorname, metatitle, metakeywords, metadescription,date) VALUES ?`;
      //var values = [
      //   [
      //     details.email,
      //     details.title,
      //     details.url,
      //     details.category,
      //     details.select,
      //     details.shortdesc,
      //     details.author,
      //     details.metatitle,
      //     details.metakeyword,
      //     details.metadesc,
      //     date,
      //   ],
      // ];
      //con.query(sql, [values], function (err, result) {
      //  if (err) throw err;
      // console.log("data inserted!!!", result);
      // });
    } catch (err) {
      console.log(err);
    }
  } else {
    const tempPath = req.file.path;
    //console.log(tempPath);

    const targetPath = path.join(
      __dirname,
      `./views/upload/${req.file.originalname}`
    );

    // for uploading image  file in the folder(only the .png etc files will be saved)
    if (
      path.extname(req.file.originalname).toLowerCase() === ".png" ||
      path.extname(req.file.originalname).toLowerCase() === ".jpg" ||
      path.extname(req.file.originalname).toLowerCase() === ".jpeg" ||
      path.extname(req.file.originalname).toUpperCase() === ".PNG" ||
      path.extname(req.file.originalname).toUpperCase() === ".JPG" ||
      path.extname(req.file.originalname).toUpperCase() === ".JPEG"
    ) {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
        console.log("image uploaded");
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);
        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png .jpg .jpeg files are allowed!");
      });
    }

    var date = new Date().toLocaleDateString();

    try {

      let userblog = await new USERBLOG({
        email: details.email,
        title: details.title,
        url: details.url,
        category: details.category,
        type: details.select,
        shortdescription: details.shortdesc,
        image: "",
        authorname: details.author,
        metatitle: details.metatitle,
        metakeywords: details.metakeyword,
        metadescription: details.metadesc,
        date: date,
      })
      userblog.save()

      // var sql = `INSERT INTO usersblog (email,title, url, category, type, shortdescription, image, authorname, metatitle, metakeywords, metadescription,date) VALUES ?`;
      // var values = [
      //   [
      //     details.email,
      //     details.title,
      //     details.url,
      //     details.category,
      //     details.select,
      //     details.shortdesc,
      //     req.file.originalname,
      //     details.author,
      //     details.metatitle,
      //     details.metakeyword,
      //     details.metadesc,
      //     date,
      //   ],
      // ];
      // con.query(sql, [values], function (err, result) {
      //   if (err) throw err;
      //   console.log("data inserted!!!", result);
      // });
    } catch (err) {
      console.log(err);
    }
  }
});

//gets all the blogs submitted by users
app.post("/usersubmittedblogs", async (req, res) => {
  const details = req.body;

  try {
    let ret = await USERBLOG.find({})
    //console.log("userbloggggggs-",ret)
    res.send(ret);
  } catch (err) {
    console.log(err);
  }
})
//------------------------USERBLOG-----------------------------


//catergory RElated

//for showing category records
app.post("/showCategory", async (req, res) => {
  //console.log("sc");

  try {
    let ret = await CATEGORY.find({})
    //console.log("RET",ret)

    res.send(ret);
    /*
    con.query("SELECT * FROM category", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      res.send(result);
    });*/
  } catch (err) {
    console.log(err);
  }
});

//for adding category records
app.post("/addCategory", async (req, res) => {
  const details = req.body;
  console.log('datils', details);

  try {
    // con.query("SELECT * FROM category", function (err, result, fields) {
    //   if (err) throw err;
    let result = await CATEGORY.find({})
    console.log("categories ", result)


    if (result.length === 0) {
      console.log("lengthiszero");
      // var sql = `INSERT INTO category (category) VALUES ('${details.cat}')`;
      // con.query(sql, function (err, result) {
      //  if (err) throw err;
      let category = new CATEGORY({ category: details.cat.toLowerCase() })
      category.save()//saving category in db
      console.log("category inserted!!!");
      res.send({ message: "categoryAdded" });
      //});
    } else {
      let answer = "";

      for (var i = 0; i < result.length; i++) {
        console.log("detcat", details.cat);
        console.log("rescat", result[i].category);

        if (result[i].category == details.cat.toLowerCase()) {
          console.log("it exists at", result[i]);
          answer += "exist";
          res.send({ message: "alreadyExists" }); //putting this will give error that cannoit set header after they are snet ,this might be bcz of the loop,,so whne the it loops for the first time and and its not the same ,,they are counting it asthe first time that res.send has apppear
          break; //so that it stop right there instead of looping till the end
        }
      }

      console.log(answer);
      if (answer !== "exist") {
        console.log("i work yeah");
        //  var sql = `INSERT INTO category (category) VALUES ('${details.cat}')`;
        //  con.query(sql, function (err, result) {
        //   if (err) throw err;
        let category = new CATEGORY({ category: details.cat.toLowerCase() })
        category.save()//saving category in db
        //console.log("categories ",r)
        console.log("category inserted!!!");
        res.send({ message: "categoryAdded" });
        // });
      }
    }
    // });
  } catch (err) {
    console.log(err);
  }
});

//for deleting category records
app.post("/deleteCategory", async (req, res) => {
  const details = req.body;
  console.log('details', details);
  try {
    let resp = await CATEGORY.deleteOne({ _id: details.id })
    console.log(resp)
    console.log("Number of records deleted: " + resp.deletedCount);
    res.send({ affectedRows: resp.deletedCount, message: "deleted" });
  } catch (err) {
    console.log(err);
  }
});

//search blog (from search bar)
app.post("/searchblog", async (req, res) => {
  const value = req.body;
  console.log(value);

  try {
    if (value.val == "") {
      res.send({}); //an empty data object is sent
    } else {
      let result = await BLOG.find({ "title": { "$regex": value.val, "$options": "i" } })
      console.log('search res', result);
      res.send(result);
    }
  } catch (err) {
    console.log(err);
  }
});

//ADMIN LOGIN
app.post("/admin/login", urlencodedParser, async (req, res) => {
  const credentials = req.body;
  console.log('cred', credentials);

  try {
    const result = await ADMIN.findOne({ username: credentials.username, password: credentials.password })
    if (result) {
      if (
        credentials.username === result.username &&
        credentials.password === result.password
      ) {
        console.log("admin logged in!!!");
        // var value = `${credentials.userName}`;
        // res.cookie("admin", value, { maxAge: 6000000, httpOnly: true });
        // return res.redirect("/admin/dashboard");
        res.send({ matched: true });
      }
    } else {
      console.log("wrong credentials");
      res.send({ matched: false });
    }
  } catch (err) {
    console.log(err);
  }
});

//needs to be attended return on both if and else
//change password
app.post("/cpswrd", async (req, res) => {
  const details = req.body;
  console.log("abc", details);

  try {
    let result = await ADMIN.findOneAndUpdate({ username: details.uname, password: details.password }, { password: details.newPassword }, { new: true })
    // If `new` isn't true, `findOneAndUpdate()` will return the document as it was _before_ it was updated.
    if (result) {
      console.log("password changed!!!");
      res.send({ message: "changed" });
    } else {
      console.log("something went wrong");
    }
    // });
  } catch (err) {
    console.log(err);
  }
});

//ADMIN LOGOUT
app.post("/logout", async (req, res) => {
  console.log("logout  route");
  res.clearCookie("admin");
  res.send({ message: "loggedOut" });
});

//this is to get the admin's username and send it to show on admin panel
app.post("/getAdminName", async (req, res) => {
  const adminCookie = req.cookies["admin"];
  res.send({ admin: adminCookie });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is running at ${port}`));
