const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function (DBSTRING) {
  const db = mongoose
    .connect(DBSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("Connected to MongoDB..."))
    .catch((err) => {
      winston.info(err.message);
    });
};
