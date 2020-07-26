import { TotalsType } from "types";
import {
  EstimatedFeatureAttributes,
  ProjectAttributes,
  EstimatedScopeAttributes,
} from "models/types";

export const calculateTotals = (
  p: ProjectAttributes,
  estimated_features: EstimatedFeatureAttributes[],
  estimated_scope: EstimatedScopeAttributes
): TotalsType => {
  const total_frontend_days = estimated_features.reduce(
    (a: number, b: EstimatedFeatureAttributes) => a + b.frontend_days,
    0
  );
  const total_backend_days = estimated_features.reduce(
    (a: number, b: EstimatedFeatureAttributes) => a + b.backend_days,
    0
  );
  const design_days = estimated_scope.isDesignActive
    ? (estimated_scope.design / 100) * total_frontend_days
    : 0;
  const qa_days = estimated_scope.isQaActive
    ? (estimated_scope.qa / 100) * (total_frontend_days + total_backend_days)
    : 0;
  const infrastructure_days = estimated_scope.isInfrastructureActive
    ? estimated_scope.infrastructure
      ? estimated_scope.infrastructure
      : 0
    : 0;
  const management_days = estimated_scope.isManagementActive
    ? (estimated_scope.management / 100) *
      (total_frontend_days + total_backend_days)
    : 0;
  const release_days = estimated_scope.isReleaseActive
    ? estimated_scope.release
      ? estimated_scope.release
      : 0
    : 0;
  const analysis_days = estimated_scope.isAnalysisActive
    ? estimated_scope.analysis
      ? estimated_scope.analysis
      : 0
    : 0;
  const support_days = estimated_scope.isSupportActive
    ? estimated_scope.support
      ? estimated_scope.support
      : 0
    : 0;
  const total_estimation_days =
    design_days +
    qa_days +
    infrastructure_days +
    management_days +
    release_days +
    analysis_days +
    support_days;
  const total_mandays =
    total_estimation_days + total_frontend_days + total_backend_days;

  const total_hours = p.hours_per_day * total_mandays;
  const total_price = p.price_per_hour * total_hours;
  return {
    total_frontend_days,
    total_backend_days,
    design_days,
    qa_days,
    infrastructure_days,
    management_days,
    release_days,
    analysis_days,
    support_days,
    total_estimation_days,
    total_mandays,
    total_hours,
    total_price,
  };
};
