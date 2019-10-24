// Dependencies =============================================================

var router = require("express").Router();
var cheerio = require("cheerio");
var axios = require("axios");

// Routes ===================================================================

  router.get("/articles", function(req, res) {
    var testObject = {
      msg: "test"
    }
    res.render("index", testObject)
  });

  router.get("/saved", function (req, res) {
    var testObject = {
      msg: "test"
    }
    res.render("saved", testObject)
  })

// Export ===================================================================

module.exports = router;