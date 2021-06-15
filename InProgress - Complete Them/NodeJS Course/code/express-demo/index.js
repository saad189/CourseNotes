//Imports:

const express = require("express");
const app = express();
const config = require("config");

const DBSTRING = config.get("db");

require("./startup/logging")(DBSTRING, app);
require("./startup/configuration")();
require("./startup/routes")(app);
require("./startup/database")(DBSTRING);

//Listen:
const PORT = process.env.PORT || 4200;

const server = app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}...`);
});

module.exports = server;
