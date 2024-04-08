// const chalk = require("chalk");
// const mongoose = require("mongoose");

// const url = "mongodb://localhost:27017/NewVisitDB";

// try {
//   mongoose.connect(url);
// } catch (error) {
//   console.log(`Failed to connect to ${url}: ${error}`);
// }

// const db = mongoose.connection;
// db.on("error", (error) =>
//   console.log(chalk.red(`DB connection error: ${error}`))
// );
// db.once("open", () => {
//   console.log(chalk.green("connected to NewVisitDB in MongoDB"));
// });

const mongoose = require("mongoose");
const chalk = require("chalk");
const { User } = require("./models/users/User");
const initialUsers = require("../../../mockData/users.json");
const { registerUserMongo } = require("./services/userService");

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

async function initializeData() {
  const usersInDB = await User.find();
  if (usersInDB.length === 0) {
    for (const user of initialUsers) {
      await registerUserMongo(user);
    }
  }
}
