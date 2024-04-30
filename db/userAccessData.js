const config = require("config");
const DB = config.get("DB");
const {
  loginUserMongo,
  registerUserMongo,
  getUserMongo,
  getUsersMongo,
  getExpertsMongo,
  getExpertMongo,
  likeExpertMongo,
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
    try {
      const users = await getUsersMongo();
      return users;
    } catch (error) {
      throw error;
    }
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const getExperts = async () => {
  if (DB === "mongoDB") {
    try {
      const experts = await getExpertsMongo();
      return experts;
    } catch (error) {
      throw error;
    }
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const getExpert = async (id) => {
  if (DB === "mongoDB") {
    try {
      const expert = await getExpertMongo(id);
      return expert;
    } catch (error) {
      throw error;
    }
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

const likeExpert = async (userId, expertId) => {
  if (DB === "mongoDB") {
    const updatedUser = await likeExpertMongo(userId, expertId);
    return updatedUser;
  } else {
    handleServerError(
      "Currently only the MongoDB is supported. Please check your DB property in config files."
    );
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUser,
  getUsers,
  getExperts,
  getExpert,
  likeExpert,
};
