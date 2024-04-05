const mongoose = require("mongoose");
const Expert = require("../models/users/Expert");
const { User } = require("../models/users/User");
const hashPassword = require("../../../../bcrypt/hashPassword");
const checkPassword = require("../../../../bcrypt/checkPassword");
const { generateAuthToken } = require("../../../../auth/authService");

// searches user in DB and returns auth token!
const loginUserMongo = async (user) => {
  const { email, password } = user;
  try {
    const userInDB = await User.findOne({ email });
    if (!userInDB) throw new Error("Invalid email or password");
    const isPasswordRight = checkPassword(password, userInDB.password);
    if (!isPasswordRight) throw new Error("Invalid email or password");

    const token = generateAuthToken(userInDB);
    return Promise.resolve(token);
  } catch (error) {
    throw error;
  }
};

//  searches if user is already in DB if not save new user in DB
const registerUserMongo = async (user) => {
  const { email, isExpert } = user;
  const Model = isExpert ? Expert : User;
  try {
    let userInDB = await Model.findOne({ email });

    if (userInDB) {
      throw new Error(`Email ${email} already exists. Try to login.`);
    }
    userInDB = new Model(user);
    userInDB.password = hashPassword(userInDB.password);
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
