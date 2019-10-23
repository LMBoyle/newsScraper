// Dependencies =============================================================

var router = require("express").Router();
var cheerio = require("cheerio");
var axios = require("axios");

// Routes ===================================================================

  router.get("/", function(req, res) {
    var testObject = {
      msg: "test"
    }
    res.render("index", testObject)
  });

// Export ===================================================================

module.exports = router;