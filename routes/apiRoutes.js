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
  router.get("/saved", appController.showSaved)
  // Add article to saved db
  router.post("/saved", appController.saveArticle)
  // Get specific saved article
  router.get("/saved/:id", appController.getSavedId)
  // Update specific saved article
  router.post("/saved/:id", appController.updateSaved)
  // Delete specific saved article
  router.post("/saved/delete/:id", appController.deleteSaved)
  // Add to specific saved article
  router.post("/saved/note/:id", appController.postNote)

  return router;
}
