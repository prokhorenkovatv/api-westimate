import { Model, ModelCtor, Optional } from "sequelize";

type ModelCreator<M extends Model<any, any>> = typeof Model & { new (): M };

export interface AllModels {
  Project: ModelCtor<Model<ProjectAttributes, ProjectCreationAttributes>>;
  Estimated_scope: ModelCtor<
    Model<EstimatedScopeAttributes, EstimatedScopeCreationAttributes>
  >;
  Estimated_feature: ModelCtor<Model<TokenAttributes>>;
  Default_feature: ModelCtor<
    Model<DefaultFeatureAttributes, DefaultFeatureCreationAttributes>
  >;
  Token: ModelCtor<Model<TokenAttributes>>;
  User: ModelCtor<Model<UserAttributes>>;
}
export interface AllModelsPure {
  [key: string]: Model<any, any>;
}

export interface TokenAttributes {
  token_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Status {
  DEVREVIEW = "dev_review",
  ACCEPTED = "accepted",
  INACTIVE = "inactive",
  INPROGRESS = "in_progress",
}
export interface ProjectAttributes {
  id?: number;
  title: string;
  description: string;
  status: Status;
  author_id?: number;
  price_per_hour: number;
  hours_per_day: number;
  created_at?: Date;
  updated_at?: Date;
  [key: string]: any;
}
export interface ProjectCreationAttributes
  extends Optional<ProjectAttributes, "id"> {}
export interface EstimatedScopeAttributes {
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
}
export interface EstimatedScopeCreationAttributes
  extends Optional<EstimatedScopeAttributes, "id"> {}
export interface EstimatedFeatureAttributes {
  id?: number;
  title: string;
  description: string;
  frontend_days: number;
  backend_days: number;
  project_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface EstimatedFeatureCreationAttributes
  extends Optional<EstimatedFeatureAttributes, "id"> {}
export interface DefaultFeatureAttributes {
  id?: number;
  title: string;
  description: string;
  frontend_days: number;
  backend_days: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface DefaultFeatureCreationAttributes
  extends Optional<DefaultFeatureAttributes, "id"> {}
export interface UserAttributes {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  gender: number;
  onboarding_at: Date;
}
