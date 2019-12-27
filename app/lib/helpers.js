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

// Create a string of random alphanumeric string with a given length
helpers.createRandomString = strLength => {
  strLength = typeof strLength == "number" && strLength > 0 ? strLength : false;
  if (strLength) {
    // Define all the possible characters that can go into the string
    var possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

    // start the final string as an empty string
    var str = "";
    for (let index = 0; index < strLength; index++) {
      // Get random character from the possibleCharacters
      var randomCharacter = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );

      // Append this character to the final string
      str += randomCharacter;
    }
    // return the final string
    return str;
  } else {
    return false;
  }
};
// Export the container
module.exports = helpers;
