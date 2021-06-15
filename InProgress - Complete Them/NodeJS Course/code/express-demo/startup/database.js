const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function (DBSTRING) {
  const db = mongoose
    .connect(DBSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info(`Connected to ${DBSTRING}...`))
    .catch((err) => {
      winston.info(err.message);
    });
};
