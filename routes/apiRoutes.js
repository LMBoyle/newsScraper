// Dependencies =============================================================

var router = require("express").Router()

// Routes ===================================================================

module.exports = function(db) {
  var appController = require("../controllers/newsController.js")(db);

  router.get("/news", appController.getNews);

  return router;
}