/**
 * Helpers for various tasks
 */

// Dependencies
var crypto = require("crypto");
var config = require("./config");
var https = require("https");
var querystring = require("querystring");
var path = require("path");
var fs = require("fs");

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

// Get the string content of a template
helpers.getTemplate = (templateName, data, callback) => {
  templateName =
    typeof templateName == "string" && templateName.length > 0
      ? templateName
      : false;
  data = typeof data == "object" && data != null ? data : "";

  if (templateName) {
    var templateDirectory = path.join(__dirname, "/../templates/");
    fs.readFile(
      templateDirectory + templateName + ".html",
      "utf8",
      (err, str) => {
        if (!err && str && str.length > 0) {
          // Do the interpolation on the string before returning it
          var finalString = helpers.interpolate(str, data);
          callback(false, finalString);
        } else {
          callback("No template could be found");
        }
      }
    );
  } else {
    callback("A valid template name was not specified");
  }
};

// Add the universal header and footer string

helpers.addUniversalTemplates = (str, data, callback) => {
  templateName =
    typeof templateName == "string" && templateName.length > 0
      ? templateName
      : false;
  data = typeof data == "object" && data != null ? data : "";

  // Get headers
  helpers.getTemplate("_header", data, (err, headerString) => {
    if (!err && headerString) {
      // Get footer
      helpers.getTemplate("_footer", data, (err, footerString) => {
        if (!err && footerString) {
          var fullString = headerString + str + footerString;
          callback(false, fullString);
        } else {
          callback("could not get the header templatex");
        }
      });
    } else {
      callback("could not get the header templatex");
    }
  });
};

// Take a given string and a data object, and find/replace all the strings in it
helpers.interpolate = (str, data) => {
  str = typeof str == "string" && str.length > 0 ? str : "";
  data = typeof data == "object" && data != null ? data : "";

  // Add the templateGlobals to the data object, prepending their key namewith global
  for (let keyname in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyname)) {
      data["global." + keyname] = config.templateGlobals[keyname];
    }
  }

  // For each key in the data object, insert its value into he string t the coressponding placeholder
  for (let key in data) {
    if (data.hasOwnProperty(key) && typeof data[key] == "string") {
      var replace = data[key];
      var find = "{" + key + "}";
      str = str.replace(find, replace);
    }
  }
  return str;
};

// Get the content of a static (public) asset

helpers.getStaticAsset = (fileName, callback) => {
  fileName =
    typeof fileName == "string" && fileName.length > 0 ? fileName : false;

  if (fileName) {
    var publicDir = path.join(__dirname, "/../public/");
    fs.readFile(publicDir + fileName, (err, data) => {
      if (!err && data) {
        callback(false, data);
      } else {
        callback("No file could be found");
      }
    });
  } else {
    callback("A valid file name was not specified");
  }
};

// Export the container
module.exports = helpers;
