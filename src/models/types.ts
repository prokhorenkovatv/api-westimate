import {
  Model,
  ModelCtor,
  Optional,
  BelongsToGetAssociationMixin,
  HasManyAddAssociationMixin,
  ModelStatic,
} from "sequelize";

//Models
export type Estimated_scopeModel = Model<
  EstimatedScopeAttributes,
  EstimatedScopeCreationAttributes
> &
  EstimatedScopeAttributes;
export type Estimated_featureModel = Model<
  EstimatedFeatureAttributes,
  EstimatedFeatureCreationAttributes
> &
  EstimatedFeatureAttributes;
export type ProjectModel = Model<ProjectAttributes, ProjectCreationAttributes> &
  ProjectAttributes;
export type Default_featureModel = Model<
  DefaultFeatureAttributes,
  DefaultFeatureCreationAttributes
> &
  DefaultFeatureAttributes;
export type UserModel = Model<UserAttributes>;
export type TokenModel = Model<TokenAttributes>;
export interface AllModels {
  Project: ModelCtor<ProjectModel>;
  Estimated_scope: ModelCtor<Estimated_scopeModel>;
  Estimated_feature: ModelCtor<Estimated_featureModel>;
  Default_feature: ModelCtor<Default_featureModel>;
  Token: ModelCtor<TokenModel>;
  User: ModelCtor<UserModel>;
}
//Attributes
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
  estimated_scope_id?: number;
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
