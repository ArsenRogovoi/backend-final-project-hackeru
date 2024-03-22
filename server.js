const express = require("express");
const app = express();
const logger = require("./logger/loggerAdaptor");
const { handleError } = require("./utils/errorHandler");
const router = require("./router/router");

app.use(logger);

app.use("/", (req, res) => {
  res.send("hello");
});

app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = "3500";
app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});
