/**
 * Request handlers
 */
// Dpendencies
var _data = require("./data");
var helpers = require("./helpers");
var config = require("./config");

// Define handlers
var handlers = {};
/**
 * HTML Handlers
 */
// Index handlers
handlers.index = (data, callback) => {
  // Rehect any request that isn't a get
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Uptime Monotoring - Made Simple",
      "head.description":
        "We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we'll send you a text to let you know",
      "body.class": "index"
    };
    // read the index template as a string
    helpers.getTemplate("index", templateData, (err, string) => {
      if (!err && string) {
        // Add the universal templates
        helpers.addUniversalTemplates(
          string,
          templateData,
          (err, fullString) => {
            if (!err && fullString) {
              // return the page as html
              callback(200, fullString, "html");
            } else {
              callback(500, undefined, "html");
            }
          }
        );
      } else {
        console.log(err);
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create Account
handlers.accountCreate = (data, callback) => {
  // Rehect any request that isn't a get
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Create and account",
      "head.description": "sign up is easy and only takes a few seconds",
      "body.class": "accountCreate"
    };
    // read the index template as a string
    helpers.getTemplate("accountCreate", templateData, (err, string) => {
      if (!err && string) {
        // Add the universal templates
        helpers.addUniversalTemplates(
          string,
          templateData,
          (err, fullString) => {
            if (!err && fullString) {
              // return the page as html
              callback(200, fullString, "html");
            } else {
              callback(500, undefined, "html");
            }
          }
        );
      } else {
        console.log(err);
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// session creation
handlers.sessionCreate = (data, callback) => {
  // Rehect any request that isn't a get
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Log in into your account",
      "head.description":
        "please enter your phone number and password to login",
      "body.class": "sessionCreate"
    };
    // read the index template as a string
    helpers.getTemplate("sessionCreate", templateData, (err, string) => {
      if (!err && string) {
        // Add the universal templates
        helpers.addUniversalTemplates(
          string,
          templateData,
          (err, fullString) => {
            if (!err && fullString) {
              // return the page as html
              callback(200, fullString, "html");
            } else {
              callback(500, undefined, "html");
            }
          }
        );
      } else {
        console.log(err);
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Edit Your Account
handlers.accountEdit = (data, callback) => {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Account Settings",
      "body.class": "accountEdit"
    };
    // Read in a template as a string
    helpers.getTemplate("accountEdit", templateData, (err, str) => {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, (err, str) => {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Session has been deleted
handlers.sessionDeleted = (data, callback) => {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Logged Out",
      "head.description": "You have been logged out of your account.",
      "body.class": "sessionDeleted"
    };
    // Read in a template as a string
    helpers.getTemplate("sessionDeleted", templateData, (err, str) => {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, (err, str) => {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Account has been deleted
handlers.accountDeleted = (data, callback) => {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Account Deleted",
      "head.description": "Your account has been deleted.",
      "body.class": "accountDeleted"
    };
    // Read in a template as a string
    helpers.getTemplate("accountDeleted", templateData, (err, str) => {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, (err, str) => {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create a new check
handlers.checksCreate = (data, callback) => {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Create a New Check",
      "body.class": "checksCreate"
    };
    // Read in a template as a string
    helpers.getTemplate("checksCreate", templateData, (err, str) => {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, (err, str) => {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};
// Dashboard (view all checks)
handlers.checksList = (data, callback) => {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Dashboard",
      "body.class": "checksList"
    };
    // Read in a template as a string
    helpers.getTemplate("checksList", templateData, (err, str) => {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, (err, str) => {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Edit a Check
handlers.checksEdit = (data, callback) => {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    var templateData = {
      "head.title": "Check Details",
      "body.class": "checksEdit"
    };
    // Read in a template as a string
    helpers.getTemplate("checksEdit", templateData, (err, str) => {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, (err, str) => {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// FAVICON
handlers.favicon = (data, callback) => {
  // Reject any method that isn't a get
  if (data.method == "get") {
    // Read in the favicon's data
    helpers.getStaticAsset("favicon.ico", (err, data) => {
      if (!err && data) {
        callback(200, data, "favicon");
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public
handlers.public = (data, callback) => {
  // Reject any method that isn't a get
  if (data.method == "get") {
    // Get the file name being requested
    var trimmedAssetName = data.trimmedPath.replace("public/", "").trim();
    if (trimmedAssetName.length > 0) {
      helpers.getStaticAsset(trimmedAssetName, (err, data) => {
        if (!err && data) {
          // Determine the content type and default to plain text
          var contentType = "plain";

          if (trimmedAssetName.indexOf(".css") > -1) {
            contentType = "css";
          }
          if (trimmedAssetName.indexOf(".png") > -1) {
            contentType = "png";
          }
          if (trimmedAssetName.indexOf(".jpg") > -1) {
            contentType = "jpg";
          }
          if (trimmedAssetName.indexOf(".ico") > -1) {
            contentType = "favicon";
          }

          // Callback the data
          callback(200, data, contentType);
        } else {
          callback(500);
        }
      });
    } else {
      callback(400);
    }
  } else {
    callback(405);
  }
};

/**
 * JSON API Handlers
 */

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

// Required data: phone
// Optional data: none
handlers._users.get = (data, callback) => {
  // Check that phone number is valid
  var phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    // Get token from headers
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, tokenIsValid => {
      if (tokenIsValid) {
        // Lookup the user
        _data.read("users", phone, (err, data) => {
          if (!err && data) {
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(400, {
          Error: "buggy"
        });
      }
    });
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Required data: phone
// Optional data: firstName, lastName, password (at least one must be specified)
handlers._users.put = (data, callback) => {
  // Check for required field
  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  // Check for optional fields
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

  // Error if phone is invalid
  if (phone) {
    // Error if nothing is sent to update
    if (firstName || lastName || password) {
      // Get token from headers
      var token =
        typeof data.headers.token == "string" ? data.headers.token : false;

      // Verify that the given token is valid for the phone number
      handlers._tokens.verifyToken(token, phone, tokenIsValid => {
        if (tokenIsValid) {
          // Lookup the user
          _data.read("users", phone, (err, userData) => {
            if (!err && userData) {
              // Update the fields if necessary
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }
              // Store the new updates
              _data.update("users", phone, userData, err => {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, { Error: "Could not update the user." });
                }
              });
            } else {
              callback(400, { Error: "Specified user does not exist." });
            }
          });
        } else {
          callback(403, {
            Error: "Missing required token in header, or token is invalid."
          });
        }
      });
    } else {
      callback(400, { Error: "Missing fields to update." });
    }
  } else {
    callback(400, { Error: "Missing required field." });
  }
};

// Users - delete
// Required data : phone
// Optional data: none
handlers._users.delete = (data, callback) => {
  // Check that phone number is valid
  var phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    // Get token from headers
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, tokenIsValid => {
      if (tokenIsValid) {
        // Lookup the user
        _data.read("users", phone, (err, userData) => {
          if (!err && userData) {
            // Delete the user's data
            _data.delete("users", phone, err => {
              if (!err) {
                // Delete each of the checks associated with the user
                var userChecks =
                  typeof userData.checks == "object" &&
                  userData.checks instanceof Array
                    ? userData.checks
                    : [];
                var checksToDelete = userChecks.length;
                if (checksToDelete > 0) {
                  var checksDeleted = 0;
                  var deletionErrors = false;
                  // Loop through the checks
                  userChecks.forEach(checkId => {
                    // Delete the check
                    _data.delete("checks", checkId, err => {
                      if (err) {
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if (checksDeleted == checksToDelete) {
                        if (!deletionErrors) {
                          callback(200, {
                            Message: "User and associated checks deleted"
                          });
                        } else {
                          callback(500, {
                            Error:
                              "Errors encountered while attempting to delete all of the user's checks. All checks may not have been deleted from the system successfully."
                          });
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500, { Error: "Could not delete the specified user" });
              }
            });
          } else {
            callback(400, { Error: "Could not find the specified user." });
          }
        });
      } else {
        callback(403, {
          Error: "Missing required token in header, or token is invalid."
        });
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
    callback(405, { sucess: false, error: "method not allowed" });
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
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;

  if (id) {
    // Lookup the token
    _data.read("tokens", id, (err, tokenData) => {
      if (!err && tokenData) {
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
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
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

// Checks
handlers.checks = (data, callback) => {
  var acceptableMethod = ["post", "get", "put", "delete"];
  if (acceptableMethod.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all check methods
handlers._checks = {};

// Checks - Post
// Required data: protocol, url, method, successCodes, timeoutSeconds
// Optional data: none
handlers._checks.post = (data, callback) => {
  // Validate all the inputs
  var protocol =
    typeof data.payload.protocol == "string" &&
    ["https", "http"].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : false;

  var url =
    typeof data.payload.url == "string" && data.payload.url.trim().length > 0
      ? data.payload.url
      : false;

  var method =
    typeof data.payload.method == "string" &&
    ["post", "get", "put", "delete"].indexOf(data.payload.method) > -1
      ? data.payload.method
      : false;

  var successCodes =
    typeof data.payload.successCodes == "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  var timeoutSeconds =
    typeof data.payload.timeoutSeconds == "number" &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    // Get the token from the header
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    // Lookup the user by reading the token
    _data.read("tokens", token, (err, tokenData) => {
      if (!err && tokenData) {
        var userPhone = tokenData.phone;

        // Lookup the user data
        _data.read("users", userPhone, (err, userData) => {
          if (!err && userData) {
            var userChecks =
              typeof userData.checks == "object" &&
              userData.checks instanceof Array
                ? userData.checks
                : [];

            // Verify that the user has less than the maximum number of checks per user
            if (userChecks.length < config.maxChecks) {
              // create a random id or the token
              var checkId = helpers.createRandomString(20);

              // Create the check object and include the user's phone
              var checkObject = {
                ID: checkId,
                userPhone: userPhone,
                protocol: protocol,
                url: url,
                method: method,
                successCodes: successCodes,
                timeoutSeconds: timeoutSeconds
              };

              // store the object
              _data.create("checks", checkId, checkObject, err => {
                if (!err) {
                  // Add the check id to the user object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  // Save the new user data
                  _data.update("users", userPhone, userData, err => {
                    if (!err) {
                      // Return data about the new check
                      callback(200, checkObject);
                    } else {
                      callback(500, {
                        Error: "Could not update the user with the new check"
                      });
                    }
                  });
                } else {
                  callback(500, { Error: "Could not create the new check" });
                }
              });
            } else {
              callback(400, {
                Error: `The user already has the maximum number of checks (${config.maxChecks})`
              });
            }
          } else {
            callback(403, { Error: "unauthorized" });
          }
        });
      } else {
        callback(403, { Error: "Unauthorized" });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required input(s) or input(s) are invalid"
    });
  }
};

// Checks - get
// required data: id,
// Optional data: none

handlers._checks.get = (data, callback) => {
  // Check that the ID is valid
  var checkId =
    typeof data.queryStringObject.checkId == "string" &&
    data.queryStringObject.checkId.trim().length == 20
      ? data.queryStringObject.checkId.trim()
      : false;

  if (checkId) {
    // Lookup the check
    _data.read("checks", checkId, (err, checkData) => {
      if (!err && checkData) {
        // Verify that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(
          token,
          checkData.userPhone,
          tokenIsValid => {
            if (tokenIsValid) {
              //  return the check data
              callback(200, checkData);
            } else {
              callback(403, {
                Error: "Missing required token in header, or invalid token"
              });
            }
          }
        );
      } else {
        callback(400, { Error: "Check not found" });
      }
    });
    // Get the token from the headers
    var token =
      typeof data.headers.token == "string" ? data.headers.token : false;
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Checks - put
// Required data : checkId
// Optional data: method, url,protocol, successCodes, timeoutSeconds (atleast one must be specified)
handlers._checks.put = (data, callback) => {
  // Check for the required string
  var checkId =
    typeof data.payload.checkId == "string" &&
    data.payload.checkId.trim().length == 20
      ? data.payload.checkId.trim()
      : false;
  // Check for optional fields
  var protocol =
    typeof data.payload.protocol == "string" &&
    ["https", "http"].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : false;

  var url =
    typeof data.payload.url == "string" && data.payload.url.trim().length > 0
      ? data.payload.url
      : false;

  var method =
    typeof data.payload.method == "string" &&
    ["post", "get", "put", "delete"].indexOf(data.payload.method) > -1
      ? data.payload.method
      : false;

  var successCodes =
    typeof data.payload.successCodes == "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  var timeoutSeconds =
    typeof data.payload.timeoutSeconds == "number" &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : false;

  // Error if the checkId is invalid
  if (checkId) {
    // Error if nothing is sent to update
    if (protocol || method || url || successCodes || timeoutSeconds) {
      _data.read("checks", checkId, (err, checkData) => {
        if (!err && checkData) {
          // Get token from header
          var token =
            typeof data.headers.token == "string" ? data.headers.token : false;
          // Verify that the token is valid and belongs to the user who created the check
          handlers._tokens.verifyToken(token, checkData.phone, tokenIsValid => {
            if (tokenIsValid) {
              // Update the check where necessary
              if (protocol) {
                checkData.protocol = protocol;
              }
              if (method) {
                checkData.method = method;
              }
              if (url) {
                checkData.url = url;
              }
              if (successCodes) {
                checkData.successCodes = successCodes;
              }
              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds;
              }

              // Store the update
              _data.update("checks", checkId, checkData, err => {
                if (!err) {
                  callback(200, { Message: "Check updated successfully" });
                } else {
                  callback(500, { Error: "Could not update check" });
                }
              });
            } else {
              callback(403, { Error: "Invalid token" });
            }
          });
        } else {
          callback(403, { Error: "Unauthorized" });
        }
      });
    } else {
      callback(400, { Error: "Missing field to update" });
    }
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Checks - delete
// Required data : checkId
// Optional data: none
// @TODO Cleanup (delete) any other files associatedwith the user
handlers._checks.delete = (data, callback) => {
  // Check that the phone number is valid
  var checkId =
    typeof data.queryStringObject.checkId == "string" &&
    data.queryStringObject.checkId.trim().length == 20
      ? data.queryStringObject.checkId.trim()
      : false;

  if (checkId) {
    // Lookup the check

    _data.read("checks", checkId, (err, checkData) => {
      if (!err && checkData) {
        var token =
          typeof data.headers.token == "string" ? data.headers.token : false;

        handlers._tokens.verifyToken(
          token,
          checkData.userPhone,
          tokenIsValid => {
            if (tokenIsValid) {
              // Delete the check data
              _data.delete("Checks", checkId, err => {
                if (!err) {
                  // Lookup he user
                  _data.read("users", checkData.userPhone, (err, userData) => {
                    if (!err && userData) {
                      var userChecks =
                        typeof userData.checks == "object" &&
                        userData.checks instanceof Array
                          ? userData.checks
                          : [];

                      // remove the deleted check from the list of their checks
                      var checkPosition = userChecks.indexOf(checkId);

                      if (checkPosition > -1) {
                        userChecks.splice(checkPosition, 1);
                        // Resave the user's data
                        _data.update(
                          "users",
                          checkData.userPhone,
                          userData,
                          err => {
                            if (!err) {
                              callback(200, {
                                Message: "Check deleted successfully"
                              });
                            } else {
                              callback(500, {
                                error: "could not update the specified user"
                              });
                            }
                          }
                        );
                      } else {
                        callback(500, {
                          Error:
                            "could not find the check on the user object so could not remove it"
                        });
                      }
                    } else {
                      callback(404, {
                        Error: "Could not find the user who created the check"
                      });
                    }
                  });
                } else {
                  callback(500, { Error: "Could not delete the check data" });
                }
              });
            } else {
              callback(403, {
                Error: "Missing required token in header, or invalid token"
              });
            }
          }
        );
      } else {
        callback(400, { Error: "The specified check id does not exist" });
      }
    });
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
