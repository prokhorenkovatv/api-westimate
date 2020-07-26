import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import models from "models";
import ErrorResponse from "utils/errorResponse";
import { asyncHandler } from "middleware/async";

const getFeatures = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const estimated_features = await models.Estimated_feature.list(+id);
    if (!estimated_features)
      return next(new ErrorResponse("Server error", 500));
    res.status(200).json(estimated_features);
  }
);

const postProjectFeature = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
    if (!newEstimatedFeature)
      return next(new ErrorResponse("Server error", 500));
    const project = await models.Project.read(+id);
    res.status(201).json(project);
  }
);
//??
const patchProjectFeature = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, featureId } = req.params;
    const updatedFeature = await models.Estimated_feature.updateEf(
      +featureId,
      req.body
    );
    if (!updatedFeature) return next(new ErrorResponse("Server error", 500));
    const project = await models.Project.read(+id);
    res.status(200).json(project);
  }
);

const deleteProjectFeature = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { featureId } = req.params;
    const feature = await models.Estimated_feature.delete(+featureId);
    if (!feature) return next(new ErrorResponse("Server error", 500));
    res.status(200).json({
      message: `Estimated feature by id ${featureId} was successfully deleted`,
    });
  }
);
export {
  getFeatures,
  postProjectFeature,
  patchProjectFeature,
  deleteProjectFeature,
};
