const express = require("express");
const app = express();
const logger = require("./logger/loggerAdaptor");
const { handleClientError } = require("./utils/errorHandlers");
const router = require("./router/router");
const config = require("config");
const connectToDB = require("./db/dbService");
const chalk = require("chalk");
const cors = require("cors");
const corsConfig = config.get("CORS_ORIGIN");

app.use(logger);
app.use(express.json());
// it will be better if there will be some error handler for cors:
app.use(
  cors({
    origin: corsConfig,
  })
);
app.use(router);
app.use((err, req, res, next) => {
  handleClientError(res, 500, err.message);
});

const PORT = config.get("PORT");
const HOST = config.get("SERVER_HOST");
app.listen(PORT, () => {
  console.log(chalk.yellow(`listening to: ${HOST}:${PORT}`));
  connectToDB();
});
