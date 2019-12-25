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

  // Get query string as an object
  const queryString = parsedUrl.query;

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // send the response
  res.end("Hello World\n");

  // log the request path
  console.log("Request received with these headers ", headers);
});

// Start the server, and have it listen on port 3000

server.listen(7777, () => {
  console.log("Magic happening on port 7777");
});
