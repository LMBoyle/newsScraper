// Dependencies =============================================================

var router = require("express").Router()

// Routes ===================================================================

module.exports = function(db) {
  var appController = require("../controllers/newsController.js")(db);
  
  router.get("/articles", appController.scrapeNews)
  router.get("/articles", appController.showNews);
  // router.put("/articles/:id", appController.addNote)

  return router;
}
