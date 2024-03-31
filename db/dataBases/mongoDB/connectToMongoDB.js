const chalk = require("chalk");
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/NewVisitDB";

try {
  mongoose.connect(url);
} catch (error) {
  console.log(`Failed to connect to ${url}: ${error}`);
}

const db = mongoose.connection;
db.on("error", (error) =>
  console.log(chalk.red(`DB connection error: ${error}`))
);
db.once("open", () => {
  console.log(chalk.green("connected to NewVisitDB in MongoDB"));
});
