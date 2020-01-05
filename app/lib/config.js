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
  hashingSecret: "ThisIsASecret",
  maxChecks: 5,
  twilio: {
    accountSid: "AC78615daa2c4d19fd05b0c4e2f730e230",
    authToken: "5da6e4cc489840a9f4149080e6bafc8a",
    fromPhone: "+19892832574"
  },
  templateGlobals: {
    appName: "Uptime Monitor",
    companyName: "Pirple, Node Masterclass",
    yearCreated: "2018",
    baseUrl: "http://localhost:7777/"
  }
};

// production environmnet
environments.production = {
  httpPort: 8888,
  httpsPort: 8889,
  envName: "production",
  hashingSecret: "ThisIsAlsoASecret",
  maxChecks: 5,
  twilio: {
    accountSid: "AC0e40eac3492b2f45146b5c168d19cb39",
    authToken: "ab2b7164fadba98efa30cc2df8091bb5",
    fromPhone: "+19892832574"
  },
  templateGlobals: {
    appName: "Uptime Monitor",
    companyName: "Pirple, Node Masterclass",
    yearCreated: "2018",
    baseUrl: "http://localhost:8888/"
  }
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
