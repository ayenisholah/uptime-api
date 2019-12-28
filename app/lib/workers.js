/*
 * Worker-related tasks
 *
 */

// Dependencies
var url = require("url");
var path = require("path");
var fs = require("fs");
var http = require("http");
var https = require("https");
var _data = require("./data");
var helpers = require("./helpers");

// Instantiate the worker module object
var workers = {};

// Lookup all checks, get their data, send to validator
workers.gatherAllChecks = function() {
  // Get all the checks
  _data.list("checks", function(err, checks) {
    if (!err && checks && checks.length > 0) {
      checks.forEach(function(check) {
        // Read in the check data
        _data.read("checks", check, function(err, originalCheckData) {
          if (!err && originalCheckData) {
            // Pass it to the check validator, and let that function continue the function or log the error(s) as needed
            workers.validateCheckData(originalCheckData);
          } else {
            console.log("Error reading one of the check's data: ", err);
          }
        });
      });
    } else {
      console.log("Error: Could not find any checks to process");
    }
  });
};