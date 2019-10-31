// Dependencies =============================================================

var router = require("express").Router()

// Routes ===================================================================

module.exports = function(db) {
  var appController = require("../controllers/newsController.js")(db);
  
  // Get articles
  router.get("/articles", appController.showNews);
  // Get specific article
  router.get("/articles/:id", appController.getNewsId)
  // Get saved articles
  router.get("/articles/saved", appController.showSaved)
  // Add to specific saved article
  router.post("/articles/saved/:id", appController.postNote)
  // Add article to saved db
  router.post("/articles/saved", appController.saveArticle)

  return router;
}
