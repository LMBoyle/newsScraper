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
      db.Saved.create(req.body)
      .then(dbSaved => res.json(dbSaved))
      .catch(err => console.log(err));
    },
    getSavedId: (req, res) => {
      db.Saved.findOne({
        _id: req.params.id 
      })
      .populate("note")
      .then(dbSaved => res.json(dbSaved))
      .catch(err => res.json(err));
    },
    updateSaved: (req, res) => {
      db.Saved.findOneAndUpdate({
        _id: req.params.id 
      }, { 
        isRead: true
      }, { 
        new: true 
      })
      .then(dbSaved => res.json(dbSaved))
      .catch(err => res.json(err));
    },
    deleteSaved: (req, res) => {
      db.Saved.findOneAndDelete({
        _id: req.params.id 
      })
      .then(dbSaved => res.json(dbSaved))
      .catch(err => res.json(err));
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
