const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);

  // get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Choose the rouer the request should go to.
  const chosenHandler =
    typeof router[trimmedPath] !== "undefined"
      ? router[trimmedPath]
      : handlers.notFound;

  // Construct data to send to the chosen handler
  const data = {
    trimmedPath: trimmedPath
  };
  // Route the request to the handler specified in the router
  chosenHandler(data, (statusCode, payload) => {
    // use the status code called back by the handler, or default to 200
    statusCode = typeof statusCode == "number" ? statusCode : 200;

    // use the payload called back by the handler, or default to an empty object
    payload = typeof payload == "object" ? payload : {};

    // Convert the payload to a string
    const payloadString = JSON.stringify(payload);

    // Return the response
    res.setHeader("Content-Type", "application/json");
    res.writeHead(statusCode);
    res.end(payloadString);
  });
});

// Start the server
server.listen(4000, () => {
  console.log("Magic happening on port 4000");
});
// Define handlers
const handlers = {};

handlers.hello = (data, callback) => {
  callback(200, { message: "Hello World" });
};

handlers.notFound = (data, callback) => {
  callback(404);
};

const router = {
  hello: handlers.hello
};
