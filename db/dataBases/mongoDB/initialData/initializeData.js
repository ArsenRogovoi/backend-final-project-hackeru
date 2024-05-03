const chalk = require("chalk");
const { User } = require("../models/users/User");
const { createAppointmentMongo } = require("../services/appointmentService");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const initialUsers = require("./users.json");
const initialExperts = require("./experts.json");
const { registerUserMongo } = require("../services/userService");

const initializeData = async () => {
  try {
    const usersInDB = await User.find();

    if (usersInDB.length === 0) {
      console.log(
        chalk.bgGreen("Creating initial experts and appointments...")
      );
      for (const expert of initialExperts) {
        const newExp = await registerUserMongo(expert);
        if (newExp) {
          const appts = createApptsModels();
          for (let appt of appts) {
            appt.expertId = newExp._id;
            appt.expertName = `${newExp.username.firstName} ${newExp.username.lastName}`;
            await createAppointmentMongo(appt);
          }
        }
      }
      console.log(chalk.bgGreen("Initial experts and appointments created."));

      console.log(chalk.bgGreen("Creating initial users..."));
      for (const user of initialUsers) {
        await registerUserMongo(user);
      }
      console.log(chalk.bgGreen("Initial users created."));
    }
  } catch (error) {
    console.log(chalk.bgRed(`InitializeData Error: ${error.message}`));
  }
};

const createApptsModels = () => {
  const appts = [];

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      const appt = {};
      appt.startTime = dayjs()
        .add(i, "day")
        .hour(12 + j)
        .minute(0)
        .second(0)
        .utc()
        .format();
      appt.endTime = dayjs()
        .add(i, "day")
        .hour(13 + j)
        .minute(0)
        .second(0)
        .utc()
        .format();
      appts.push(appt);
    }
  }

  return appts;
};

module.exports = { initializeData };
