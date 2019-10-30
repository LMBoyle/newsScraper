// Function =================================================================
module.exports = function(db) {
  return {
    showNews: (req, res) => {
      // Find all the articles
      db.Article.find({
      }).then(function(data) {
        res.json(data)
      }).catch(function(err) {
        res.json(err)
      })
    },
  }
}
