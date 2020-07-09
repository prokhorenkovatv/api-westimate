const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroSequelize = require("admin-bro-sequelizejs");

AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = require("../admin/index");
const { authenticate } = require("../admin/util");

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

module.exports = router;
