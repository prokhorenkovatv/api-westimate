import { validationResult } from "express-validator";
import models from "models";
import { asyncHandler } from "middleware/async";
import ErrorResponse from "utils/errorResponse";
import { Request, Response, NextFunction } from "express";

const getFeatures = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const default_features = await models.Default_feature.list();
    if (!default_features) return next(new ErrorResponse("Server error", 500));
    res.status(200).json(default_features);
  }
);

const postFeature = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

const getFeature = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const feature = await models.Default_feature.read(+id);
    if (!feature) return next(new ErrorResponse("Server error", 500));
    res.status(200).json(feature);
  }
);

const patchFeature = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const updatedFeature = models.Default_feature.update(+id, req.body);
    if (!updatedFeature) return next(new ErrorResponse("Server error", 500));
    const feature = await models.Default_feature.read(+id);
    res.status(200).json(feature);
  }
);

const deleteFeature = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const feature = await models.Default_feature.delete(+id);
    if (!feature) return next(new ErrorResponse("Server error", 500));
    res.status(200).json({
      message: `Default feature by id ${id} was successfully deleted`,
    });
  }
);

export { getFeatures, getFeature, patchFeature, deleteFeature, postFeature };
