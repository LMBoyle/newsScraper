// Dependencies =============================================================

var router = require("express").Router();

// Routes ===================================================================
module.exports = function(db) {
  router.get("/articles", function(req, res) {
    db.Article.find({}, function(err, data) {
      if (err) {
        console.log(err);
      }
      var artObject = {
        title: data.title,
        link: data.link
      }
      res.render("index", artObject)
    })
  });

  // router.get("/saved", function (req, res) {
    
    // res.render("saved", testObject)
  // })
  return router;
}
