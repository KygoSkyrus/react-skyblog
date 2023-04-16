const express = require("express");
const router = express("router");
const nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//Documnets Schema
const BLOG=require("../schema/blog")
const CONTACT =require("../schema/contact")

//sender's email
const pswrd = "";
const emailAdd = "dheerajgupta.whyshy@gmail.com";

//use firebase email instead
//smtp server
var smtpTransport = nodemailer.createTransport({ 
  service: "gmail",
  auth: {
    user: emailAdd,
    pass: pswrd,
  },
});



//----------------------------- USER MESSAGES-----------------------------------------------
 //users messages related routes
router.post("/message", urlencodedParser, (req, res) => {
  const details=req.body;
  
  try { 
    //sending veriication email
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    host = req.get("host");
    console.log("host:" + fullUrl);

    mailOptions = { 
      from: emailAdd,
      to: "kygoskyrus@gmail.com",
      subject: "Message",
      html: `<div style="background-color: #f5f5f5;box-shadow: 0 0 3px #9d9d9d; border-radius:6px ; padding:10px 20px;"><div><h4 style="color:black;">Name</h4><p style="color:#545454">${details.name}</p></div><div><h4 style="color:black;">Email</h4><p style="color:#545454">${details.mail}</p></div><div><h4 style="color:black;">Phone</h4><p style="color:#545454">${details.phone}</p></div><div><h4 style="color:black;">Message</h4><p style="color:#545454">${details.textarea}</p></div></div>`,
    };
 
    console.log(mailOptions); 

  //send mail option is commented now,,due to testing i guess, although the messages will be saved in db
  //  res.redirect('back');
  //   smtpTransport.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //       //res.end("error");
  //     } else {
  //       console.log("Message sent: " + info.response);
  //       //return res.status(422).json({ message: "email sent" });
  //     }
  //   });

    //to insert a record
    let contact = new CONTACT({name:details.name,email:details.mail,phone:details.phone,note:details.textarea})
    contact.save();
      console.log("record inserted!!!");
      res.redirect('back')
  } catch (err) {
    console.log(err);
  }
  
});
 
//for showing database messages records
router.post("/showMessage", async (req, res) => {
  try {
    let ret =await CONTACT.find({})
    res.send(ret)
  } catch (err) {
    console.log(err);
  }
});
//the api endpoint(route) for deleting these msgs is in server.js
//----------------------------- USER MESSAGES-----------------------------------------------



//each and every blogs
router.post("/getallblogs", async (req, res) => {
  console.log('getallblogs api hit')
  try {
    let ret =await BLOG.find({})
    console.log('ret',ret)
    res.send(ret);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;