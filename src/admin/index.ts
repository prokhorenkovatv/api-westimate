import AdminBro from "admin-bro";
import models from "models";
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
      resource: models.User,
      options: {
        ...UserResource,
        parent: sidebarGroups.User,
      },
    },
    {
      resource: models.Project,
    },
    {
      resource: models.Estimated_scope,
    },
    {
      resource: models.Estimated_feature,
    },
    {
      resource: models.Default_feature,
    },
  ],
  branding: {
    companyName: "Webmil",
    softwareBrothers: false,
  },
});
export default adminBro;
