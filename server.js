const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Router
app.use(require("./routes/route"));

//Document Schema
const ADMIN = require("./schema/admin")
const BLOG = require("./schema/blog")
const CONTACT = require("./schema/contact")
const CATEGORY = require("./schema/category")
const USERBLOG = require("./schema/userblog")

dotenv.config({ path: './env/config.env' });
app.set("view engine", "ejs");//not needed
app.use(cookieParser());

var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//app.use(express.static(__dirname + "/views"));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));





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


//deleting blog record
app.post("/deleteblog", async (req, res) => {
  const details = req.body;
  console.log(details);

  try {
    let resp = await BLOG.deleteOne({ _id: details.id })
    console.log(resp)
    console.log("Number of records deleted: " + resp.deletedCount);
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

  try {
    let result = await BLOG.find({ url: details.blogurl })
    res.send(result);
  } catch (err) {
    console.log("error", err);
  }
});


//edited blog submission [this is the admin blog][updates the changes in the blog]
app.post("/blogeditsubmit", async (req, res) => {
  const details = req.body;
  console.log("blogeditsubmit", details);

  try {
    const result = await BLOG.findOneAndUpdate({ _id: details.blogid }, { title: details.title, url: details.url, category: details.category, type: details.select, detail:details.detail, shortdescription: details.shortdesc, image: details.image, authorname: details.author, metatitle: details.metatitle, metakeywords: details.metakeyword, metadescription: details.metadesc }, { new: true })
    console.log("blog edited!!!",result);
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
    res.send({ deletedCount: result.deletedCount });
  } catch (err) {
    console.log(err);
  }
});



//------------------------USERBLOG-----------------------------
//usersblog form data[this adds the new blog from user]
app.post("/userblog", async (req, res) => {
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
  try {
    let ret = await USERBLOG.find({})
    res.send(ret);
  } catch (err) {
    console.log(err);
  }
})

//deletes the user submitted blogs
app.post("/deleteuserblog", async (req, res) => {
  const details = req.body;

  try {
    let resp = await USERBLOG.deleteOne({ _id: details.id })
    console.log(resp)
    console.log("Number of records deleted: " + resp.deletedCount);
    res.send({isDeleted:true})
  } catch (err) {
    console.log(err);
  }
});
//------------------------USERBLOG-----------------------------



//------------------------CATEGORY-----------------------------
//for showing category records
app.post("/showCategory", async (req, res) => {
  try {
    let ret = await CATEGORY.find({})
    res.send(ret);
  } catch (err) {
    console.log(err);
  }
});

//for adding category records
app.post("/addCategory", async (req, res) => {
  const details = req.body;

  try {
    let result = await CATEGORY.find({})
    console.log("categories ", result)
    if (result.length === 0) {
      let category = new CATEGORY({ category: details.cat.toLowerCase() })
      category.save()//saving category in db
      console.log("category inserted!!!");
      res.send({ message: "categoryAdded" });
    } else {
      let answer = "";
      for (var i = 0; i < result.length; i++) {
        if (result[i].category == details.cat.toLowerCase()) {
          console.log("it exists at", result[i]);
          answer += "exist";
          res.send({ message: "alreadyExists" }); //putting this will give error that cannoit set header after they are snet ,this might be bcz of the loop,,so whne the it loops for the first time and and its not the same ,,they are counting it asthe first time that res.send has apppear
          break; //so that it stop right there instead of looping till the end
        }
      }

      console.log(answer);
      if (answer !== "exist") {
        let category = new CATEGORY({ category: details.cat.toLowerCase() })
        category.save()//saving category in db
        console.log("category inserted!!!");
        res.send({ message: "categoryAdded" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//for deleting category records
app.post("/deleteCategory", async (req, res) => {
  const details = req.body;
  try {
    let resp = await CATEGORY.deleteOne({ _id: details.id })
    console.log("Number of records deleted: " + resp.deletedCount);
    res.send({ affectedRows: resp.deletedCount, message: "deleted" });
  } catch (err) {
    console.log(err);
  }
});
//------------------------CATEGORY-----------------------------



//search blog (from search bar)
//NOTE::: Not in use but this uses regex to get documents containing a specific word in db
// app.post("/searchblog", async (req, res) => {
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
app.post("/admin/login", urlencodedParser, async (req, res) => {
  const credentials = req.body;

  try {
    const result = await ADMIN.findOne({ username: credentials.username, password: credentials.password })
    if (result) {
      if (
        credentials.username === result.username &&
        credentials.password === result.password
      ) {
        console.log("admin logged in!!!");
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
  } catch (err) {
    console.log(err);
  }
});

//cookie is being set at frontend
//ADMIN LOGOUT
// app.post("/logout", async (req, res) => {
//   res.clearCookie("admin");
//   res.send({ message: "loggedOut" });
// });

//this is to get the admin's username and send it to show on admin panel
// app.post("/getAdminName", async (req, res) => {
//   const adminCookie = req.cookies["admin"];
//   res.send({ admin: adminCookie });
// });
//------------------------------- ADMIN -------------------------------



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is running at ${port}`));