const express = require("express");
const app = express();
const logger = require("./logger/loggerAdaptor");
const { handleError } = require("./utils/errorHandler");
const router = require("./router/router");
const config = require("config");
const connectToDB = require("./db/dbService");
const chalk = require("chalk");

app.use(logger);
app.use(router);
app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = config.get("PORT");
const HOST = config.get("SERVER_HOST");
app.listen(PORT, () => {
  console.log(chalk.yellow(`listening to: ${HOST}:${PORT}`));
  connectToDB();
});
