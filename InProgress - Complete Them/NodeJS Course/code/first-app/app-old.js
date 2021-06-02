var logger = require("./logger");
const path = require("path");
const os = require("os");
const fs = require("fs");

const EventEmitter = require("events");
const emitter = new EventEmitter();

function sayHello(name) {
  console.log("Hello " + name);
}

logger("Saad Needs help");

// console.log(path.parse(__filename));
// console.log("Total Memory:", os.totalmem(), "Free Memory:", os.freemem());
// ES6:
console.log(`Total Memory: ${os.totalmem()} \nFree Memory:  ${os.freemem()}`);

const files = fs.readdirSync("./"); // dir, Synchronous
// console.log(files);

const filesAsync = fs.readdir("./", function (err, files) {
  if (err) {
    console.log("Error", err);
  }
  if (files) {
    console.log("Result:", files);
  }
}); // dir, Async

// Registering a Listener:
emitter.on("messageLogged", function () {
  console.log("Event has been raised.");
});

// Emitting an event:
emitter.emit("messageLogged");

// ES6:

emitter.on("argMessage", (eventArg) => {
  console.log(eventArg);
});

emitter.emit("argMessage", { id: 1, url: "http://google.com" });
