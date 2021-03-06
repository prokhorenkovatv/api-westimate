const { validationResult } = require("express-validator");
const models = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.getFeatures = asyncHandler(async (req, res, next) => {
  const estimated_features = await models.Estimated_feature.list();
  if (!estimated_features) return next(new ErrorResponse("Server error", 500));
  res.status(200).json(estimated_features);
});
//??
exports.postProjectFeature = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ErrorResponse(
      "Validation failed, entered data is incorrect",
      422
    );
  const { id } = req.params;

  const { title, description, frontend_days, backend_days } = req.body;

  const feature = await models.Estimated_feature.build({
    title,
    description,
    frontend_days,
    backend_days,
    project_id: +id,
  });

  const newEstimatedFeature = await feature.create();
  if (!newEstimatedFeature) return next(new ErrorResponse("Server error", 500));
  const project = await models.Project.read(id);
  res.status(201).json(project);
});
//??
exports.patchProjectFeature = asyncHandler(async (req, res, next) => {
  const { id, featureId } = req.params;
  const updatedFeature = await models.Estimated_feature.update(
    featureId,
    req.body
  );
  if (!updatedFeature) return next(new ErrorResponse("Server error", 500));
  const project = await models.Project.read(id);
  res.status(200).json(project);
});

exports.deleteProjectFeature = asyncHandler(async (req, res, next) => {
  const { featureId } = req.params;
  const feature = await models.Estimated_feature.delete(
    featureId,
    models.Estimated_feature
  );
  if (!feature) return next(new ErrorResponse("Server error", 500));
  res.status(200).json({
    message: `Estimated feature by id ${featureId} was successfully deleted`,
  });
});
