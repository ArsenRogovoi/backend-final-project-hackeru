const express = require("express");
const app = express();
const morganLogger = require("./loggers/morgan");
const LOGGER = "morgan";

if (LOGGER === "morgan") {
  app.use(morganLogger);
}

module.exports = app;
