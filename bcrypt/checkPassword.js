const bcrypt = require("bcrypt");

const checkPassword = async (enteredPassword, savedHash) => {
  try {
    return await bcrypt.compare(enteredPassword, savedHash);
  } catch (error) {
    console.error(error);
  }
};

module.exports = checkPassword;
