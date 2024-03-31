const config = require("config");
const DB = config.get("DB");
const loginUserMongo = require("./dataBases/mongoDB/services/userService");
const { handleServerError } = require("../utils/errorHandlers");

const loginUser = async (user) => {
  if (DB === "mongoDB") {
    const token = await loginUserMongo(user);
    return token;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

module.exports = loginUser;
