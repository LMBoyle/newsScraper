// Dependencies =============================================================

var cheerio = require("cheerio");
var axios = require("axios");

// Function =================================================================
module.exports = function(db) {
  return {
    // Make a request via axios to grab the HTML body from the site of your choice
    scrapeNews: (req, res) => {
      axios.get("https://www.nytimes.com").then(function(response) {

        var $ = cheerio.load(response.data);

        $("div.esl82me1").each(function(i, element) {
          var result = {}
          result.link = $(element).parent().parent().parent().find("a").attr("href")
          result.title = $(element).find("span").attr("class", "esl82me0").text() || $(element).find("h2").attr("class", "esl82me0").text();

          // For each article, put it in the database
          db.Article.create(result)
            .then(function(dbArticle) {
              console.log(dbArticle);
            })
            .catch(function(err) {
              console.log(err);
            });
        });
      }).then(function() {
        res.send("Scrape Complete")
      });
    },
    showNews: (req, res) => {
      // Find all the articles
      db.Article.find({})
        .then(function(data) {
          res.json(data)
        })
        .catch(function(err) {
          res.json(err)
        })
    }
  }
}

