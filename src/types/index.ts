import { Status } from "models/types";

export type UserType = {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  gender: number;
  onboarding_at: Date;
  created_at?: Date;
  updated_at?: Date;
};

export type TokenType = {
  id: number;
  token_id: string;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
};

export type ProjectExtendedType = ProjectType &
  TotalsType & {
    estimated_scope_id?: number;
    estimated_scope: EstimatedScopeType;
    estimated_features: EstimatedFeatureType[];
  };

export type TotalsType = {
  total_frontend_days: number;
  total_backend_days: number;
  design_days: number;
  qa_days: number;
  infrastructure_days: number;
  management_days: number;
  release_days: number;
  analysis_days: number;
  support_days: number;
  total_estimation_days: number;
  total_mandays: number;
  total_hours: number;
  total_price: number;
};

export type ProjectType = {
  id?: number;
  title: string;
  description: string;
  status: Status;
  author_id: number;
  price_per_hour: number;
  hours_per_day: number;
  created_at?: Date;
  updated_at?: Date;
  estimated_scope_id?: number;
};

export type EstimatedScopeType = {
  id?: number;
  analysis: number;
  isAnalysisActive: boolean;
  infrastructure: number;
  isInfrastructureActive: boolean;
  design: number;
  isDesignActive: boolean;
  qa: number;
  isQaActive: boolean;
  management: number;
  isManagementActive: boolean;
  release: number;
  isReleaseActive: boolean;
  support: number;
  isSupportActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type EstimatedFeatureType = {
  id?: number;
  title: string;
  description: string;
  frontend_days: number;
  backend_days: number;
  project_id: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DefaultFeatureType = {
  id?: number;
  title: string;
  description: string;
  frontend_days: number;
  backend_days: number;
  createdAt?: Date;
  updatedAt?: Date;
};
