const EventEmitter = require("events");

//ES6:

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("argMessage", { id: 1, url: "http://google.com" });
  }
}

module.exports = Logger;
