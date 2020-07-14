const { validationResult } = require("express-validator");
const models = require("../models");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getFeatures = asyncHandler(async (req, res, next) => {
  const default_features = await models.Default_feature.list();
  if (!default_features) return next(new ErrorResponse("Server error", 500));
  res.status(200).json(default_features);
});

exports.postFeature = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty())
    throw new ErrorResponse(
      "Validation failed, entered data is incorrect",
      422
    );

  const { title, description, frontend_days, backend_days } = req.body;

  const feature = await models.Default_feature.build({
    title,
    description,
    frontend_days,
    backend_days,
  });

  const newDefaultFeature = await feature.create();
  if (!newDefaultFeature) return next(new ErrorResponse("Server error", 500));
  res.status(201).json(newDefaultFeature);
});

exports.getFeature = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const feature = await models.Default_feature.read(id);
  if (!feature) return next(new ErrorResponse("Server error", 500));
  res.status(200).json(feature);
});

exports.patchFeature = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const updatedFeature = models.Default_feature.update(id, req.body);
  if (!updatedFeature) return next(new ErrorResponse("Server error", 500));
  const feature = await models.Default_feature.read(id);
  res.status(200).json(feature);
});

exports.deleteFeature = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const feature = await models.Default_feature.delete(id);
  if (!feature) return next(new ErrorResponse("Server error", 500));
  res.status(200).json({
    message: `Default feature by id ${id} was successfully deleted`,
  });
});
