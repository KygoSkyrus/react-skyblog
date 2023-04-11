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
    //findByIdAndUpdate: is the alternatice to directly use id
    let result = await BLOG.findOneAndUpdate({ _id: details.id }, { status: details.val }, { new: true })
    console.log("result in visibility", result);
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





//edited blog submission [this is the admin blog][updates the changes in the blog]
app.post("/blogeditsubmit", async (req, res) => {
  const details = req.body;
  console.log("blogeditsubmit", details);

  try {
    const result = await BLOG.findOneAndUpdate({ _id: details.blogid }, { title: details.title, url: details.url, category: details.category, type: details.select, shortdescription: details.shortdesc, image: details.image, authorname: details.author, metatitle: details.metatitle, metakeywords: details.metakeyword, metadescription: details.metadesc }, { new: true })
   
    console.log("blog edited!!!");
    if(result){
      res.send({isBlogEdited:true})
    }else{
      res.send({isBlogEdited:false})
    } 
  } catch (err) {
    console.log(err);
  }

});



//deleting messages records (contact form)
app.post("/deleteMessage", async (req, res) => {
  const details = req.body;
  console.log('delete messsage', details.id);

  try {
    let result = await CONTACT.deleteOne({ _id: details.id })
    //console.log("Number of records deleted: " + result.deletedCount);
    res.send({ deletedCount: result.deletedCount });
  } catch (err) {
    console.log(err);
  }
});



//------------------------USERBLOG-----------------------------
//usersblog form data[this adds the new blog from user]
app.post("/userblog", async (req, res) => {
  const details = req.body;
  console.log("DD", details);

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
        console.log('res', response)
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
app.post("/usersubmittedblogs", async (req, res) => {
  const details = req.body;

  try {
    let ret = await USERBLOG.find({})
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
