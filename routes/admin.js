const express = require("express");
const router = express("router");

//for all admin routes
router.get("/:admin", (req, res) => {

  const adminCookie = req.cookies["admin"];
  console.log(adminCookie);

  const link = req.url;
  var lastPart = link.substring(link.lastIndexOf("/") + 1, link.length);
  console.log(lastPart);

  // switch (lastPart) {
  //   case "login":
  //     console.log("login");
  //     // res.render("../views/panel/login.ejs", { text: "..." });
  //     res.redirect("/admin/login");
  //     break;
  //   case "blogs-management":
  //     console.log("bm");
  //     if (adminCookie == null) {
  //       console.log("cookie doesn't exist");
  //       res.redirect("/admin/login");
  //     } else {
  //       // res.render("../views/panel/blogs-admin.ejs", { text: "..." });
  //       res.redirect("/admin/blogs-management");
  //     }
  //     break;
  //     case "messages":
  //       console.log("bm");
  //       if (adminCookie == null) {
  //         console.log("cookie doesn't exist");
  //         res.redirect("/admin/login");
  //       } else {
  //         // res.render("../views/panel/messages.ejs", { text: "..." });
  //         res.redirect("/admin/messages");
  //       }
  //       break;
  //       case "dashboard":
  //         console.log("bm");
  //         if (adminCookie == null) {
  //           console.log("cookie doesn't exist");
  //           res.redirect("/admin/login");
  //         } else {
  //           // res.render("../views/panel/dashboard.ejs", { text: "..." });
  //           res.redirect("/admin/dashboard");
  //         }
  //         break;
  //   default:res.redirect("/admin");
  //     // res.render("../views/error.ejs", { text: "..." });
  // }

});

module.exports = router;
