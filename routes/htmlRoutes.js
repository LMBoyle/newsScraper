// Dependencies =============================================================

var router = require("express").Router();
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });
var connection = mongoose.connection;


// Routes ===================================================================
module.exports = function(db) {
  router.get("/articles", function(req, res) {
    var currentDate = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
    var currentDateString = JSON.stringify(currentDate).split("T")[0].split('"')[1]

    // Search database for date collection
    db.Date.find({}, function(err, data) {
      if (err) {
        console.log(err)
      }
      // If nothing in collection
      else if (data.length === 0) {
        // Create a saved date
        db.Date.create({savedDate:currentDateString})
          .then(function(dbDate) {
            console.log("Date created: ", dbDate)
          })
          .catch(function(err) {
            console.log(err);
          });
        checkArtColl();
      }
      // If todays date doesn't match db saved date
      else if (currentDateString != data[0].savedDate){
        console.log("Dates don't match!")
        console.log("db date: ", data[0].savedDate)
        console.log("current date: ", currentDateString)
        // Update date and...
        
        // do a new scrape
        checkArtColl();
      }
      // If todays date matches db saved date
      else if (currentDateString === data[0].savedDate){
        console.log("Dates match!")
        console.log("db date: ", data[0].savedDate)
        console.log("current date: ", currentDateString)
      }
    })

    // Check the article collection 
    function checkArtColl() {
      db.Article.find({}, function(err, data) {
        console.log(data)
        console.log(data.length)
        if (err) {
          console.log(err)
        }
        // If something is in database
        else if (data.length != 0) {
          mongoose.connection.db.dropCollection("articles",function(err, result) {
            console.log("Collection dropped");
          }
        );
        // Scrape new articles
        scrapeNews()
        }
        // If nothing is in datebase
        else {
          console.log("nothing in db")
          // Scrape new articles
          scrapeNews()
        }
      })
    }

    function scrapeNews() {
      // Send get request to nytimes
      axios.get("https://www.nytimes.com").then(function(response) {
        // Use Cheerio to load the response
        var $ = cheerio.load(response.data);

        // For each element 
        $("div.esl82me1").each(function(i, element) {
          var result = {}
          // Find the link
          result.link = $(element).parent().parent().parent().find("a").attr("href")
          // Find the title
          result.title = $(element).find("span").attr("class", "esl82me0").text() || $(element).find("h2").attr("class", "esl82me0").text();

          // For each article, put it in the database
          db.Article.create(result)
            .then(function(dbArticle) {
              // console.log(dbArticle);
            })
            .catch(function(err) {
              console.log(err);
            });
        });
      }).then(function() {
        console.log("Scrape Complete")
      })
    }
      
    function displayArticles() {
      db.Article.find({}, function(err, data) {
        if (err) {
          console.log(err);
        }
        var artObject = {
          title: data.title,
          link: data.link,
          msg: "Hello"
        }
        res.render("index", artObject)
      })
    }
  });
  // router.get("/saved", function (req, res) {
    
    // res.render("saved", testObject)
  // })

  router.get("*", function(req, res) {
    res.redirect("/articles")
  })
  return router;
}
