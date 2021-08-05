const config = require("config");
module.exports = function () {
  // Configuration:

  console.log("Application Name: ", config.get("name"));
  console.log("Mail Server: ", config.get("mail.host"));
  console.log("Password:", config.get("mail.password"));

  if (!config.get("jwtPrivateKey")) {
    console.log(
      "FATAL ERROR: jwtPrivateKey is not defined",
      process.env.app_key,
      app.get("app_key")
    );
    throw new Error("FATAL ERROR");
  }
};
