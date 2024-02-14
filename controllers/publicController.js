const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config({ path: './env/config.env' });

//Document Schema
const BLOG = require("../schema/blog")
const CONTACT = require("../schema/contact")
const CATEGORY = require("../schema/category")
const USERBLOG = require("../schema/userblog");


const getAllBlogs = async (req, res) => {
    try {
        let ret = await BLOG.find({})
        res.send(ret);
    } catch (err) {
        console.log(err);
    }
}

const getTheBlog = async (req, res) => {
    const details = req.body;

    try {
        let result = await BLOG.find({ url: details.blogurl })
        res.send(result);
    } catch (err) {
        console.log("error", err);
    }
}

const getAllCategory = async (req, res) => {
    try {
        let ret = await CATEGORY.find({})
        res.send(ret);
    } catch (err) {
        console.log(err);
    }
}

const userSubmittedBlog = async (req, res) => {
    const details = req.body;

    var date = new Date().toLocaleDateString();
    try {
        let blog = USERBLOG({
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
        blog.save().
            then(response => {
                res.send({ blog_received: true, message:"Blog submitted for review successfully" });
            })
            .catch(err => {
                console.log(err)
                res.send({ blog_received: false, message:"Something went worng" });
            })
    } catch (err) {
        console.log(err);
        res.send({ message:"Internal server error" });
    }
}

const addMessage = (req, res) => {
    const details = req.body;

    try {
        //sending veriication email
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        host = req.get("host");

        //use firebase email instead
        //smtp server
        var smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.PASSWORD,
            },
        });

        mailOptions = {
            from: process.env.EMAIL_ID,
            to: "kygoskyrus@gmail.com",
            subject: "Message",
            html: `<div style="background-color: #f5f5f5;box-shadow: 0 0 3px #9d9d9d; border-radius:6px ; padding:10px 20px;"><div><h4 style="color:black;">Name</h4><p style="color:#545454">${details.name}</p></div><div><h4 style="color:black;">Email</h4><p style="color:#545454">${details.mail}</p></div><div><h4 style="color:black;">Phone</h4><p style="color:#545454">${details.phone}</p></div><div><h4 style="color:black;">Message</h4><p style="color:#545454">${details.textarea}</p></div></div>`,
        };

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

        let contact = CONTACT({ name: details.name, email: details.mail, phone: details.phone, note: details.textarea })
        contact.save();
        res.redirect('back')
    } catch (err) {
        console.log(err);
    }

}



module.exports = { userSubmittedBlog, getAllCategory, getTheBlog, getAllBlogs, addMessage };