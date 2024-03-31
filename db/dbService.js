const chalk = require("chalk");
const config = require("config");
const DB = config.get("DB");

const connectToDB = () => {
  switch (DB) {
    case "mongoDB":
      require("./dataBases/mongoDB/connectToMongoDB");
      break;

    default:
      return console.log(
        chalk.red(
          "The only database available for applicatation at this time is mongoDB. Check your DB property on configuration file in 'config' directory"
        )
      );
  }
};

module.exports = connectToDB;
