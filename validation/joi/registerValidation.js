const chalk = require("chalk");
const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.object({
    firstName: Joi.string().min(2).max(32).required(),
    lastName: Joi.string().min(2).max(32).required(),
  })
    .required()
    .messages({
      "object.base": `"username" must be an object with fields "firstName" and "lastName"`,
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": `"email" must be a valid email address`,
      "any.required": `"email" input is required`,
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d{4,})(?=.*[!@#$%^&*\\-_*]).{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base": `"password" must contain at least capital letter, small letter, 4 digits, at least one special symbol (!@#$%^&*-_*), password must contain at least 8 symbols`,
      "any.required": `"password" input is required`,
    }),
  isExpert: Joi.boolean().required().messages({
    "boolean.base": '"isExpert" must be a boolean',
    "any.required": '"isExpert" is required',
  }),
});

const expertSchema = userSchema.append({
  specialization: Joi.string().required(),
  bio: Joi.string().required(),
  contactPhone: Joi.string()
    .pattern(
      new RegExp(
        /^\+?\d{1,4}?[-.\s]?(?:\(\d{1,3}\)|\d{1,3})[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
      )
    )
    .required()
    .messages({
      "string.pattern.base": `"contactPhone" must be a valid phone number`,
      "any.required": `"contactPhone" property is required`,
    }),
  address: Joi.object({
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNum: Joi.string().required(),
  })
    .required()
    .messages({
      "object.base": `"address" must be an object with fields "country", "city", "street" and "houseNum"`,
    }),
});

const validateIsExpertProperty = (isExpert) => {
  const isExpertSchema = Joi.boolean().required().messages({
    "boolean.base": '"isExpert" must be a boolean',
    "any.required": '"isExpert" is required',
  });
  const { error } = isExpertSchema.validate(isExpert);
  if (error) {
    return error.details[0].message;
  } else {
    return false;
  }
};

const registerValidation = (user) => {
  const { error } = validateIsExpertProperty(user.isExpert);
  if (error) {
    return error.details[0].message;
  }

  switch (user.isExpert) {
    case false: {
      const { error } = userSchema.validate(user);
      if (error) {
        return error.details[0].message;
      } else {
        return false;
      }
    }
    case true: {
      const { error } = expertSchema.validate(user);
      if (error) {
        return error.details[0].message;
      } else {
        return false;
      }
    }
    default:
      return "isExpert must be boolean";
  }
};

module.exports = registerValidation;
