const Joi = require("joi");

const registerValidation = (user) => {
  const schema = Joi.object({
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
  });

  return schema.validate(user);
};

module.exports = registerValidation;
