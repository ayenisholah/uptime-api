/**
 * create and export config variables
 */

//  Container for all the environments
var environments = {};

// staging (default) environment
environments.staging = {
  httpPort: 7777,
  httpsPort: 7778,
  envName: "staging",
  hashingSecret: "ThisIsASecret"
};

// production environmnet

environments.production = {
  httpPort: 8888,
  httpsPort: 8889,
  envName: "production",
  hashingSecret: "ThisIsAlsoASecret"
};

// Determine which one to be exported out
var currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// check that the current environment is one of the environment above, if not default to staging
var environmentToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export the module
module.exports = environmentToExport;
