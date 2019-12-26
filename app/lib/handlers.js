/**
 * Request handlers
 */
// Dpendencies
var _data = require("./data");
var helpers = require("./helpers");

// Define handlers
var handlers = {};

// Users
handlers.users = (data, callback) => {
  var acceptableMethod = ["post", "get", "put", "delete"];
  if (acceptableMethod.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for the user submethod
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = (data, callback) => {
  var firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  var lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;
  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  var tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // Make sure that the user doesn't already exist
    _data.read("users", phone, (err, data) => {
      if (err) {
        // Hash the password
        var hashedPassword = helpers.hash(password);

        if (hashedPassword) {
          // Create User Object
          var userObject = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            hashedPassword: hashedPassword,
            tosAgreement: true
          };

          // Store the user
          _data.create("users", phone, userObject, err => {
            if (!err) {
              callback(200, { Message: "New user created successfully" });
            } else {
              console.log(err);
              callback(500, { Error: "Could not create the new user" });
            }
          });
        } else {
          callback(500, { Error: "Could not hash password" });
        }
      } else {
        // User already exists
        callback(400, { Error: "A userwith that phone number already exist" });
      }
    });
  } else {
    callback(400, { Error: "Missing Required field" });
  }
};

// Users - get
// Required data: phone
// Optional data: None
// @TODO: Only let an authorized user access their object. Don't let them access anyone else data
handlers._users.get = (data, callback) => {
  // Check that the phone number is valid
  var phone =
    typeof data.queryString.phone == "string" &&
    data.queryString.phone.trim().length == 10
      ? data.queryString.phone.trim()
      : false;

  if (phone) {
    // Lookup he user
    _data.read("users", phone, (err, data) => {
      if (!err && data) {
        // remove the hashed password from the user object before returning it to the requester
        delete data.hashedPassword;
        callback(200, data);
      } else {
        callback(400, { Error: "User not found" });
      }
    });
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Ping handler
handlers.ping = (data, callback) => {
  callback(200);
};

// Not found
handlers.notFound = (data, callback) => {
  callback(404);
};

// Export the handlers
module.exports = handlers;
