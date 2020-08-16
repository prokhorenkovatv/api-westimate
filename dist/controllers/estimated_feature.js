"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectFeature = exports.patchProjectFeature = exports.postProjectFeature = exports.getFeatures = void 0;
const express_validator_1 = require("express-validator");
const models_1 = __importDefault(require("models"));
const errorResponse_1 = __importDefault(require("utils/errorResponse"));
const async_1 = require("middleware/async");
const getFeatures = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const estimated_features = await models_1.default.Estimated_feature.list(+id);
    if (!estimated_features)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(200).json(estimated_features);
});
exports.getFeatures = getFeatures;
const postProjectFeature = async_1.asyncHandler(async (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        throw new errorResponse_1.default("Validation failed, entered data is incorrect", 422);
    const { id } = req.params;
    const { title, description, frontend_days, backend_days } = req.body;
    const feature = models_1.default.Estimated_feature.build({
        title,
        description,
        frontend_days,
        backend_days,
        project_id: +id,
    });
    const newEstimatedFeature = await feature.create();
    if (!newEstimatedFeature)
        return next(new errorResponse_1.default("Server error", 500));
    const project = await models_1.default.Project.read(+id);
    res.status(201).json(project);
});
exports.postProjectFeature = postProjectFeature;
//??
const patchProjectFeature = async_1.asyncHandler(async (req, res, next) => {
    const { id, featureId } = req.params;
    const updatedFeature = await models_1.default.Estimated_feature.updateEf(+featureId, req.body);
    if (!updatedFeature)
        return next(new errorResponse_1.default("Server error", 500));
    const project = await models_1.default.Project.read(+id);
    res.status(200).json(project);
});
exports.patchProjectFeature = patchProjectFeature;
const deleteProjectFeature = async_1.asyncHandler(async (req, res, next) => {
    const { featureId } = req.params;
    const feature = await models_1.default.Estimated_feature.delete(+featureId);
    if (!feature)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(200).json({
        message: `Estimated feature by id ${featureId} was successfully deleted`,
    });
});
exports.deleteProjectFeature = deleteProjectFeature;
