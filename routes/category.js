const express = require("express");
const router = express("router");

const CATEGORY = require("../schema/category")


router.get("/:category", async (req, res) => {
   
  console.log("category - im workin");

  const link = req.url;
  var lastPart = link.substring(link.lastIndexOf("/") + 1, link.length);
  console.log(lastPart);

  try {
   
    let result =await CATEGORY.find({})
    console.log("RET",result)

    // for (var i = 0; i < result.length; i++){
    //      if(result[i].category==lastPart){
    //         res.render("../views/category-single.ejs", {text:"..."} );
    //         break;
    //      }
    //      else{
    //         if(i===result.length-1){
    //            res.render("../views/error.ejs", {text:"..."} );
    //         }
    //      }
    //   }

  } catch (err) {
    console.log(err);
  }

  //res.render("../views/category-single.ejs", {text:"..."} );
});

module.exports = router;
