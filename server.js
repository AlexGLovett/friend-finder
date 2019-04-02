var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Configure express to run handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./routes/user-api-routes.js")(app);
require("./routes/dataset-api-routes.js")(app);
require("./routes/dashboard-api-routes.js")(app);
require("./routes/graph-api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});