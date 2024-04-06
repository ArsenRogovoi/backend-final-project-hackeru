const Expert = require("../models/users/Expert");
const { User } = require("../models/users/User");
const hashPassword = require("../../../../bcrypt/hashPassword");
const checkPassword = require("../../../../bcrypt/checkPassword");
const { generateAuthToken } = require("../../../../auth/authService");

// searches user in DB and returns auth token!
const loginUserMongo = async (user) => {
  const { email, password } = user;
  const clientError = new Error("Invalid email or password");
  try {
    const userInDB = await User.findOne({ email });
    if (!userInDB) throw clientError;
    const isPasswordRight = await checkPassword(password, userInDB.password);
    if (!isPasswordRight) throw clientError;

    const token = generateAuthToken(userInDB);
    return token;
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
    userInDB.password = await hashPassword(userInDB.password);
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

//search user in 'users' collection. if user isn't in DB returns null.
const getUserMongo = async (id) => {
  try {
    const user = await User.findById(id).select("-password -__v");
    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
};

//search user in 'users' collection. if user isn't in DB returns null.
const getUsersMongo = async (id) => {
  try {
    const users = await User.findById(id).select("-password -__v");
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUserMongo,
  registerUserMongo,
  getUserMongo,
  getUsersMongo,
};
