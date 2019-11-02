// Dependencies =============================================================

const 
  router = require("express").Router(),
  cheerio = require("cheerio"),
  axios = require("axios"),
  mongoose = require("mongoose"),
  connection = mongoose.connection;

mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });

// Vars =====================================================================

const 
  currentDate = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()),
  currentDateString = JSON.stringify(currentDate).split("T")[0].split('"')[1];

let
  todayScraped = false,
  articleData,
  savedData;

// Routes ===================================================================
module.exports = db => {
  // Scrape the articles and show a loading page
  router.get("/news/loading", (req, res) => {
    // Search database for date collection
    db.Date.find({}, (err, data) => {
      console.log("\n================================================================================");
      console.log("Finding date");

      // If error
      if (err) {
        console.log(err);
      }
      // If no date in collection
      else if (data.length === 0) {
        todayScraped = false
        // Create a saved date
        db.Date.create({
          savedDate:currentDateString
        })
        .then(dbDate => console.log("Date created: ", dbDate))
        .catch(err => console.log(err));
      }
      // If todays date doesn't match db saved date
      else if (currentDateString != data[0].savedDate) {
        console.log("Dates don't match!")
        console.log("db date: ", data[0].savedDate)
        console.log("current date: ", currentDateString)
        todayScraped = false;
        // Update date
        db.Date.findOneAndUpdate({
          _id: data[0]._id
        },{
          savedDate: currentDateString
        })
        .then(() => console.log("Date updated to: ", currentDateString))
      }
      // If todays date matches db saved date
      else if (currentDateString === data[0].savedDate) {
        console.log("Dates match!")
        console.log("db date: ", data[0].savedDate)
        console.log("current date: ", currentDateString)
        todayScraped = true;
      }
      // Go and check article collection
    })
    .then(() => checkArtColl())

    // Check the article collection 
    checkArtColl = () => {
      console.log("Checking article collection")

      db.Article.find({}, (err, data) => {
        console.log("data length: ", data.length);
        console.log("today scraped: ", todayScraped);

        // If error
        if (err) {
          console.log(err);
        }
        else if (data.length === 0) {
          scrapeNews();
        }
        // If something is in database and today's news isn't scraped
        else if (data.length != 0 && !todayScraped) {
          connection.db.dropCollection("articles", () => console.log("Collection dropped"));
          scrapeNews();
        }
        else {
          showLoading();
        }
      });
    };

    // Scrape the news
    scrapeNews = () => {
      console.log("Scraping News")

      // Send get request to NY Times
      axios.get("https://www.nytimes.com")
      .then(response => {
        // Use Cheerio to load the response
        var $ = cheerio.load(response.data);
        var div = $("div.esl82me1")
        var result = {}

        // For each element 
        div.each((i, element) => {
          // Find the link
          result.link = "https://www.nytimes.com" + $(element).parent().parent().parent().find("a").attr("href")
          // Find the title
          result.title = $(element).find("span").attr("class", "esl82me0").text() || $(element).find("h2").attr("class", "esl82me0").text();

          // For each article, put it in the database
          db.Article.create(
            result
          )
          .then(dbArticle => console.log("Created articles: ", dbArticle))
          .catch(err => console.log(err));
        });
        console.log("Scrape Complete")
        showLoading()
      })
      .catch(err => console.error(err))
    }

    showLoading = () => {
      console.log("rendering loading");
      console.log("================================================================================\n");
      res.render("loading", {
        msg: "Fetching News"
      })
    }
  });

  // Find and send news data to handlebars to display
  router.get("/news", (req, res) => {
    console.log("\n================================================================================");
    console.log("Finding data to show");

    // Find articles
    db.Article.find({}, (err, data) => {
      console.log("finding articles")
      // If error
      if (err) {
        console.log(err);
      }
      // Else set article data
      // console.log("articles data: ", data)
      articleData = data
    })
    // Find saved
    db.Saved.find({})
    .populate("note")
    .then(data => {
      console.log("finding saved")
      // Set saved data
      // console.log("saved data: ", data)
      return savedData = data
    })
    // Render page
    .then(() => {
      console.log("rendering");
      console.log("================================================================================\n");

      res.render("index", {
        articles: articleData,
        saved: savedData
      })
    })
    .catch(err => console.log(err))
  });

  router.get("*", (req, res) => res.redirect("/news/loading"))

  return router;
}
