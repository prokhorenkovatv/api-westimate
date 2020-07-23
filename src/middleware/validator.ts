import { body, validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";
import { ValidationError } from "admin-bro";
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

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors: ValidationError[] = [];

  errors
    .array()
    .map(err =>
      extractedErrors.push({ [err.param]: err.msg } as ValidationError)
    );

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export {
  projectValidationRules,
  userValidationRules,
  featureValidationRules,
  validate,
};
