const chalk = require("chalk");
const morgan = require("morgan");

const logger = morgan((tokens, req, res) => {
  if (tokens.status(req, res) >= 400) {
    return chalk.redBright(
      [
        "[",
        tokens.date(req, res),
        "]:",
        tokens.method(req, res),
        ",",
        tokens.url(req, res),
        ",",
        tokens.status(req, res),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ")
    );
  } else {
    return chalk.cyanBright(
      [
        "[",
        tokens.date(req, res),
        "]:",
        tokens.method(req, res),
        ",",
        tokens.url(req, res),
        ",",
        tokens.status(req, res),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ")
    );
  }
});

module.exports = logger;
