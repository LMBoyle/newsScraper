// Dependencies =============================================================

var express = require("express");
var exphbs = require("express-handlebars");

// Express ==================================================================

var app = express();
var PORT = process.env.PORT || 1745;

// var db = require("./models")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars ===============================================================

var hbs = exphbs.create({
  defaultLayout: "main",
})

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// Routes ===================================================================

app.use('/api', require('./routes/apiRoutes'));
app.use(require("./routes/htmlRoutes.js"));

// Listen ===================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

module.exports = app;
