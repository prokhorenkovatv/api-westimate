const { body, validationResult } = require("express-validator");

const projectValidationRules = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("Title must have more than 3 characters"),
    body("description")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("Description must have more than 3 characters"),
  ];
};
const userValidationRules = () => {
  return [body("email").isEmail(), body("password").isLength({ min: 5 })];
};
const featureValidationRules = () => {
  return [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("Title must have more than 3 characters"),
    body("description")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("Description must have more than 3 characters"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];

  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  projectValidationRules,
  userValidationRules,
  featureValidationRules,
  validate,
};
