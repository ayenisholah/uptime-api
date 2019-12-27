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
// @TODO: 
handlers._users.get = (data, callback) => {
  // Check that the phone number is valid
  var phone =
    typeof data.queryString.phone == "string" &&
    data.queryString.phone.trim().length == 10
      ? data.queryString.phone.trim()
      : false;

  if (phone) {
    // Get the token from the headers
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;
    handlers._tokens.verifyToken(token, phone, tokenIsValid => {
      if (tokenIsValid) {
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
        callback(403, { Error: "Missing required token in header, or" });
      }
    });
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Users - put
// Required data : phone
// Optional data: firstName, lastName, password (atleast one must be specified)
// @TODO only let an authenticated user update their own object. Don't let them update anyone else's
handlers._users.put = (data, callback) => {
  // Check for the required string
  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  // Check for the optional field
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
  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  // Error if the phone is invalid
  if (phone) {
    // Error if nothing is sent to update
    if (firstName || lastName || password) {
      // Lookup the user
      _data.read("users", phone, (err, userData) => {
        if (!err && userData) {
          // Update the neccessary field
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.hashedPassword = helpers.hash(password);
          }
          // Store the new update
          _data.update("users", phone, userData, err => {
            if (!err) {
              callback(200, { Message: "User updated successfully" });
            } else {
              console.log(err);
              callback(500, { Error: "Could not update the user" });
            }
          });
        } else {
          callback(400, { Error: "The specified user does not exist" });
        }
      });
    } else {
      callback(400, { Error: "Missing field to update" });
    }
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Users - delete
// Required data : phone
// Optional data: none
// @TODO only let an authenticated user delete their own object. Don't let them delete anyone else's
// @TODO Cleanup (delete) any other files associatedwith the user
handlers._users.delete = (data, callback) => {
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
        _data.delete("users", phone, (err, data) => {
          if (!err) {
            callback(200, { Message: "user deleted successfully" });
          } else {
            callback(500, { error: "could not delete the specified user" });
          }
        });
      } else {
        callback(400, { Error: "Could not find the specified user" });
      }
    });
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Tokens
handlers.tokens = (data, callback) => {
  var acceptableMethod = ["post", "get", "put", "delete"];
  if (acceptableMethod.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the token methods
handlers._tokens = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = (data, callback) => {
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

  if (phone && password) {
    // Lookup the user who matches that phone number
    _data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        // Hash the sent password and compare it with the password stored in the user
        var hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword) {
          // If valid, create a new token with a randome name and 1hr expiration date
          var tokenID = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            phone: phone,
            id: tokenID,
            expires: expires
          };

          // Store the token
          _data.create("tokens", tokenID, tokenObject, err => {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { Error: "could not create the token" });
            }
          });
        } else {
          callback(400, { Error: "Incorrect password" });
        }
      } else {
        callback(400, { Error: "could not find the specified user" });
      }
    });
  } else {
    callback(400, { Error: "missing required field(s)" });
  }
};

// Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = (data, callback) => {
  // Check that the id sent is valid
  var id =
    typeof data.queryString.id == "string" &&
    data.queryString.id.trim().length == 20
      ? data.queryString.id.trim()
      : false;

  if (id) {
    // Lookup the token
    _data.read("tokens", id, (err, tokenData) => {
      if (!err && tokenData) {
        // remove the hashed password from the user object before returning it to the requester
        callback(200, tokenData);
      } else {
        callback(400, { Error: "token not found" });
      }
    });
  } else {
    callback(400, { Error: "invalid token" });
  }
};

// Tokens - put
// Required data: id, extend
// Optional data: none
handlers._tokens.put = (data, callback) => {
  var id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;
  var extend =
    typeof data.payload.extend == "boolean" && data.payload.extend == true
      ? true
      : false;

  if (id && extend) {
    // Look up the token
    _data.read("tokens", id, (err, tokenData) => {
      if (!err && tokenData) {
        // Check to make sure the token isn't already expired
        if (tokenData.expires > Date.now()) {
          // Set the expiration date 1 hr from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;

          // store the new update
          _data.update("tokens", id, tokenData, err => {
            if (!err) {
              callback(200, {
                Message: "Token expiration successfully extended by 1 hour"
              });
            } else {
              callback(500, {
                Error: "Could not update the token's expiration date"
              });
            }
          });
        } else {
          callback(400, {
            Error: "The token has already expired, and cannot be extended"
          });
        }
      } else {
        callback(400, { Error: "Specified token does not exist" });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required field(s) or field(s) are invalid"
    });
  }
};

// Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = (data, callback) => {
  // Check that the phone number is valid
  var id =
    typeof data.queryString.id == "string" &&
    data.queryString.id.trim().length == 20
      ? data.queryString.id.trim()
      : false;

  if (id) {
    // Lookup the token
    _data.read("tokens", id, (err, data) => {
      if (!err && data) {
        _data.delete("tokens", id, (err, data) => {
          if (!err) {
            callback(200, { Message: "token deleted successfully" });
          } else {
            callback(500, { error: "could not delete the specified token" });
          }
        });
      } else {
        callback(400, { Error: "Could not find the specified token" });
      }
    });
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Verify that a given token id is currently valid for a given user
handlers._tokens.verifyToken = (id, phone, callback) => {
  // Lookup the token
  _data.read("tokens", id, (err, tokenData) => {
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
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
