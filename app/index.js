/**
 * Primary file for the API
 */

// Dependencies
const http = require("http");
const url = require("url");

// The server should respond to all request with a string

const server = http.createServer((req, res) => {
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);

  // get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // send the response
  res.end("Hello World\n");
  // log the request path
  console.log("Request is received on path: " + trimmedPath);
});

// Start the server, and have it listen on port 3000

server.listen(7777, () => {
  console.log("Magic happening on port 7777");
});
