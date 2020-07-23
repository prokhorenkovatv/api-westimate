import AdminBro from "admin-bro";
import AdminBroExpress from "admin-bro-expressjs";
import AdminBroSequelize from "admin-bro-sequelizejs";

AdminBro.registerAdapter(AdminBroSequelize);

import adminBro from "admin";
import { authenticate } from "admin/util";

const router = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    authenticate,
    cookiePassword: "some-secret-password-used-to-secure-cookie",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
  }
);

export default router;
