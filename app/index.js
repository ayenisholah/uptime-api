/**
 * Primary file for the API
 */

// Dependencies
var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

// The server should respond to all request with a string

var server = http.createServer((req, res) => {
  // get the url and parse it
  var parsedUrl = url.parse(req.url, true);

  // get the path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get query string as an object
  var queryString = parsedUrl.query;

  // Get the HTTP Method
  var method = req.method.toLowerCase();

  // Get the headers as an object
  var headers = req.headers;

  // Get the payload if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", data => {
    buffer += decoder.write(data);
  });
  req.on("end", () => {
    buffer += decoder.end();

    // Choose the router this request should go to. If route does not exist, use th notFoundHandler
    var chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // construct data to send to the chosen hander
    var data = {
      trimmedPath: trimmedPath,
      queryString: queryString,
      method: method,
      headers: headers,
      payload: buffer
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
      // use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // use the payload called back by the handler, or default to an empty object
      payload = typeof payload == "object" ? payload : {};

      //convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // send the response
      res.writeHead(statusCode);
      res.end(payloadString);
      // log the response
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
});

// Start the server, and have it listen on port 3000

server.listen(7777, () => {
  console.log("Magic happening on port 7777");
});

// Define handlers
var handlers = {};

// Sample handler
handlers.sample = (data, callback) => {
  // callback a http status code , and a payload object
  callback(406, { name: "sample handler" });
};

// Not found
handlers.notFound = (data, callback) => {
  callback(404);
};

// Define a request router
var router = {
  sample: handlers.sample
};
