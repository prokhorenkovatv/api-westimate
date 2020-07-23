"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFeature = exports.deleteFeature = exports.patchFeature = exports.getFeature = exports.getFeatures = void 0;
const express_validator_1 = require("express-validator");
const models_1 = __importDefault(require("models"));
const async_1 = require("middleware/async");
const errorResponse_1 = __importDefault(require("utils/errorResponse"));
const getFeatures = async_1.asyncHandler(async (req, res, next) => {
    const default_features = await models_1.default.Default_feature.list();
    if (!default_features)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(200).json(default_features);
});
exports.getFeatures = getFeatures;
const postFeature = async_1.asyncHandler(async (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
        throw new errorResponse_1.default("Validation failed, entered data is incorrect", 422);
    const { title, description, frontend_days, backend_days } = req.body;
    const feature = await models_1.default.Default_feature.build({
        title,
        description,
        frontend_days,
        backend_days,
    });
    const newDefaultFeature = await feature.create();
    if (!newDefaultFeature)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(201).json(newDefaultFeature);
});
exports.postFeature = postFeature;
const getFeature = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const feature = await models_1.default.Default_feature.read(+id);
    if (!feature)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(200).json(feature);
});
exports.getFeature = getFeature;
const patchFeature = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updatedFeature = models_1.default.Default_feature.update(+id, req.body);
    if (!updatedFeature)
        return next(new errorResponse_1.default("Server error", 500));
    const feature = await models_1.default.Default_feature.read(+id);
    res.status(200).json(feature);
});
exports.patchFeature = patchFeature;
const deleteFeature = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const feature = await models_1.default.Default_feature.delete(+id);
    if (!feature)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(200).json({
        message: `Default feature by id ${id} was successfully deleted`,
    });
});
exports.deleteFeature = deleteFeature;
