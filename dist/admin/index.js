"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_bro_1 = __importDefault(require("admin-bro"));
const models_1 = __importDefault(require("models"));
const { UserResource } = require("./resources/userResource");
const sidebarGroups = {
    User: {
        name: "User Management",
        icon: "User",
    },
};
const adminBro = new admin_bro_1.default({
    databases: [],
    rootPath: "/api/v1/admin",
    loginPath: "/api/v1/admin/login",
    resources: [
        {
            resource: models_1.default.User,
            options: {
                ...UserResource,
                parent: sidebarGroups.User,
            },
        },
        {
            resource: models_1.default.Project,
        },
        {
            resource: models_1.default.Estimated_scope,
        },
        {
            resource: models_1.default.Estimated_feature,
        },
        {
            resource: models_1.default.Default_feature,
        },
    ],
    branding: {
        companyName: "Webmil",
        softwareBrothers: false,
    },
});
exports.default = adminBro;
