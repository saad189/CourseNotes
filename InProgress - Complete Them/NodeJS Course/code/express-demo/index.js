//Imports:

const express = require("express");

const app = express();

const DBSTRING = "mongodb://localhost/playground";

require("./startup/logging")(DBSTRING, app);
require("./startup/configuration")();
require("./startup/routes")(app);
require("./startup/database")(DBSTRING);

//Listen:
const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}...`);
});
