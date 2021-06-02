const Logger = require("./logger");
const logger = new Logger();

const http = require("http");

logger.on("argMessage", (eventArg) => {
  console.log(eventArg);
});

logger.log("Hello");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello User");
    res.end();
  }
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3, 4, 5, 6]));
    res.end();
  }
});
// Basically an event emitter + other things

// server.on("connection", (socket) => {
//   console.log("New connection...");
// });
server.listen(4200);
console.log("listening on port 4200...");
