/**
 * Helpers for various tasks
 */

// Dependencies
var crypto = require("crypto");
var config = require("./config");

// Container for helpers
var helpers = {};

// Create a SHA 256 hash
helpers.hash = str => {
  if (typeof str == "string" && str.length > 0) {
    var hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = str => {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (error) {
    return {};
  }
};
// Export the container
module.exports = helpers;