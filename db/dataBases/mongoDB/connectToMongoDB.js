const mongoose = require("mongoose");
const chalk = require("chalk");
const { initializeData } = require("./initialData/initializeData");

const url = "mongodb://localhost:27017/NewVisitDB";

mongoose
  .connect(url)
  .then(() => {
    console.log(chalk.green("connected to NewVisitDB in MongoDB"));
    initializeData();
  })
  .catch((error) => {
    console.log(`Failed to connect to ${url}: ${error}`);
  });

const db = mongoose.connection;

db.on("error", (error) =>
  console.log(chalk.red(`DB connection error: ${error}`))
);
