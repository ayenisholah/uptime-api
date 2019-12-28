/**
 * Helpers for various tasks
 */

// Dependencies
var crypto = require("crypto");
var config = require("./config");
var https = require("https");
var querystring = require("querystring");

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

// Send SMS via Twilio
helpers.sendTwilioSms = (phone, msg, callback) => {
  // Validate the parameters
  phone =
    typeof phone == "string" && phone.trim().length == 10
      ? phone.trim()
      : false;

  msg =
    typeof msg == "string" && msg.trim().length > 0 && msg.trim().length < 1600
      ? msg.trim()
      : false;

  if (phone && msg) {
    // Configure the request payload
    var payload = {
      From: config.twilio.fromPhone,
      To: "+234" + phone,
      Body: msg
    };

    // Stringify the payload
    var stringPayload = querystring.stringify(payload);

    // Configure the request details
    var requestDetails = {
      protocol: "https:",
      hostname: "api.twilio.com",
      method: "POST",
      path:
        "/2010-04-01/Accounts/" + config.twilio.accountSid + "/Messages.json",
      auth: config.twilio.accountSid + ":" + config.twilio.authToken,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(stringPayload)
      }
    };

    // Instantiate the request object
    var req = https.request(requestDetails, res => {
      // Grab the status of the sent request
      var status = res.statusCode;

      // Callback successfully if the request went through
      if (status == 200 || status == 201) {
        callback(false);
      } else {
        callback(`status code returned was ${status}`);
      }
    });

    // Bind to the error eventso it doesn't get thrown
    req.on("error", error => {
      callback(error);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();
  } else {
    callback("Missing or invalid parameter(s)");
  }
};

// Export the container
module.exports = helpers;
