const winston = require("winston");
const morgan = require("morgan");
require("winston-mongodb");
require("express-async-errors");

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

module.exports = function (DBSTRING, app) {
  winston.add(
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(new winston.transports.MongoDB({ db: DBSTRING, level: "info" }));

  console.log("NODE_ENV:", process.env.NODE_ENV); // can be undefined
  console.log("app_ENV:", app.get("env"));

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    startupDebugger("Morgan Enabled....");
    dbDebugger("Dabtabase connected...");
  }
  // Error Handler:

  // process.on("uncaughtException", (ex) => {
  //   console.log("UnCaught Exception");
  //   winston.log("error", ex.message, ex);
  //   process.exit(1);
  // });
  // process.on("unhandledRejection", (ex) => {
  //   console.log("UnHandled Rejection");
  //   winston.log("error", ex.message, ex);
  //   process.exit(1);
  // });

  // Alternative to process.on("uncaughtExpcetion")

  winston.exceptions.handle(
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
    })
  );
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
