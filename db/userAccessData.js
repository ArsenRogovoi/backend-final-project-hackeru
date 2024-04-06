const config = require("config");
const DB = config.get("DB");
const {
  loginUserMongo,
  registerUserMongo,
  getUserMongo,
  getUsersMongo,
} = require("./dataBases/mongoDB/services/userService");
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

const registerUser = async (user) => {
  if (DB === "mongoDB") {
    const newUser = await registerUserMongo(user);
    return newUser;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const getUser = async (id) => {
  if (DB === "mongoDB") {
    const user = await getUserMongo(id);
    return user;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const getUsers = async () => {
  if (DB === "mongoDB") {
    const users = await getUsersMongo();
    return users;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

module.exports = { loginUser, registerUser, getUser, getUsers };
