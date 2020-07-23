"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.featureValidationRules = exports.userValidationRules = exports.projectValidationRules = void 0;
const express_validator_1 = require("express-validator");
const projectValidationRules = () => {
    return [
        express_validator_1.body("title")
            .trim()
            .isLength({ min: 3 })
            .escape()
            .withMessage("Title must have more than 3 characters"),
        express_validator_1.body("description")
            .trim()
            .isLength({ min: 3 })
            .escape()
            .withMessage("Description must have more than 3 characters"),
    ];
};
exports.projectValidationRules = projectValidationRules;
const userValidationRules = () => {
    return [express_validator_1.body("email").isEmail(), express_validator_1.body("password").isLength({ min: 5 })];
};
exports.userValidationRules = userValidationRules;
const featureValidationRules = () => {
    return [
        express_validator_1.body("title")
            .trim()
            .isLength({ min: 3 })
            .escape()
            .withMessage("Title must have more than 3 characters"),
        express_validator_1.body("description")
            .trim()
            .isLength({ min: 3 })
            .escape()
            .withMessage("Description must have more than 3 characters"),
    ];
};
exports.featureValidationRules = featureValidationRules;
const validate = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (errors.isEmpty())
        return next();
    const extractedErrors = [];
    errors
        .array()
        .map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
exports.validate = validate;
