const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

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

const appts = createApptsModels();
console.log(appts);
