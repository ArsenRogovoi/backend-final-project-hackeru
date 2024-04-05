const chalk = require("chalk");

const handleClientError = (
  res,
  status = 500,
  message = "Something went wrong"
) => {
  console.log(
    `${chalk.bgRed("[ Client error handler ]:")} ${chalk.red(message)}`
  );
  return res.status(status).send(message);
};

const handleServerError = (error) => {
  console.log(`${chalk.bgRed("[ Server error handler ]:")}`);
  console.log(error);
};

exports.handleClientError = handleClientError;
exports.handleServerError = handleServerError;
