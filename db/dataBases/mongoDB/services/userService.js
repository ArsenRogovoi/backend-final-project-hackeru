const chalk = require("chalk");
const Expert = require("../models/users/Expert");
const { User } = require("../models/users/User");
const {
  handleServerError,
  handleClientError,
} = require("../../../../utils/errorHandlers");

// searches user in DB and returns jwt!
const loginUserMongo = async (user) => {
  const token = user;
  return token;
};

//  searches if user is already in DB if not save new user in DB
const registerUserMongo = async (user) => {
  console.log(user);
  const { email, isExpert } = user;
  const Model = isExpert ? Expert : User;
  try {
    let userInDB = await Model.findOne({ email });

    if (userInDB) {
      throw new Error(`Email ${email} already exists. Try to login.`);
    }
    userInDB = new Model(user);
    await userInDB.save();

    return {
      _id: userInDB._id,
      username: userInDB.username,
      email: userInDB.email,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { loginUserMongo, registerUserMongo };
