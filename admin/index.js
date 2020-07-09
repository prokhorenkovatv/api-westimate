const AdminBro = require("admin-bro");
const sequelize = require("sequelize");
const {
  User,
  Project,
  Estimated_scope,
  Estimated_feature,
  Default_feature,
} = require("../models");
const { UserResource } = require("./resources/userResource");
const sidebarGroups = {
  User: {
    name: "User Management",
    icon: "User",
  },
};
const adminBro = new AdminBro({
  databases: [],
  rootPath: "/api/v1/admin",
  loginPath: "/api/v1/admin/login",
  resources: [
    {
      resource: User,
      options: {
        ...UserResource,
        parent: sidebarGroups.user,
      },
    },
    {
      resource: Project,
    },
    {
      resource: Estimated_scope,
    },
    {
      resource: Estimated_feature,
    },
    {
      resource: Default_feature,
    },
  ],
  branding: {
    companyName: "Webmil",
    softwareBrothers: false,
  },
});
module.exports = adminBro;
