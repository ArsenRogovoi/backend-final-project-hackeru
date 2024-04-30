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
      const error = new Error(`Email ${email} already exists. Try to login.`);
      error.name = "EmailAlreadyExistsError";
      throw error;
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
//for user owner or admin
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
//for admin
const getUsersMongo = async () => {
  try {
    const users = await User.find({}).select("-password -__v");
    return users;
  } catch (error) {
    throw error;
  }
};

const getExpertsMongo = async () => {
  try {
    const experts = await User.find({ isExpert: true }).select(
      "-password -__v -isAdmin -favExperts -appointmentIds -createdAt -updatedAt"
    );
    return experts;
  } catch (error) {
    throw error;
  }
};

const getExpertMongo = async (id) => {
  try {
    const expert = await User.findOne({ isExpert: true, _id: id }).select(
      "-password -__v -isAdmin -favExperts -appointmentIds -createdAt -updatedAt"
    );
    return expert;
  } catch (error) {
    throw error;
  }
};

const likeExpertMongo = async (userId, expertId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const updateOperation = user.favExperts.includes(expertId)
      ? { $pull: { favExperts: expertId } }
      : { $addToSet: { favExperts: expertId } };

    const updatedUser = await User.findByIdAndUpdate(userId, updateOperation, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUserMongo,
  registerUserMongo,
  getUserMongo,
  getUsersMongo,
  getExpertsMongo,
  getExpertMongo,
  likeExpertMongo,
};
