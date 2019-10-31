// Function =================================================================
module.exports = db => {
  return {
    showNews: (req, res) => {
      // Find all the articles
      db.Article.find({})
      .then(data => res.json(data))
      .catch(err => res.json(err))
    },
    getNewsId: (req, res) => {
      db.Article.findOne({
        _id: req.params.id 
      })
      .populate("note")
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
    },
    showSaved: (req, res) => {
      db.Saved.find({})
      .populate("note")
      .then(dbSaved => res.json(dbSaved))
      .catch(err => res.json(err))
    },
    saveArticle: (req, res) => {
      console.log(req.body)
      db.Saved.create(req.body)
      .then(dbSaved => console.log("Saved articles: ", dbSaved))
      .catch(err => console.log(err));
    },
    postNote: (req, res) => {
      db.Note.create(req.body)
      .then(dbNote => {
        return db.Saved.findOneAndUpdate({
          _id: req.params.id 
        }, { 
          note: dbNote._id 
        }, { 
          new: true 
        });
      })
      .then(dbSaved => res.json(dbSaved))
      .catch(err => res.json(err));
    },

  }
}
