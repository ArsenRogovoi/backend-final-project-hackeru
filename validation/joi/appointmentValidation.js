const Joi = require("joi");

const appointmentValidation = (appointment) => {
  const schema = Joi.object({
    expertId: Joi.string().required(),
    userId: Joi.string(),
    userName: Joi.string(),
    expertName: Joi.string(),
    isBooked: Joi.boolean(),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().required(),
  });

  const { error } = schema.validate(appointment);
  if (error) {
    return error.details[0].message;
  } else {
    return false;
  }
};

module.exports = appointmentValidation;
