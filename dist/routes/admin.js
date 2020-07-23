"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_bro_1 = __importDefault(require("admin-bro"));
const admin_bro_expressjs_1 = __importDefault(require("admin-bro-expressjs"));
const admin_bro_sequelizejs_1 = __importDefault(require("admin-bro-sequelizejs"));
admin_bro_1.default.registerAdapter(admin_bro_sequelizejs_1.default);
const admin_1 = __importDefault(require("admin"));
const util_1 = require("admin/util");
const router = admin_bro_expressjs_1.default.buildAuthenticatedRouter(admin_1.default, {
    authenticate: util_1.authenticate,
    cookiePassword: "some-secret-password-used-to-secure-cookie",
}, null, {
    resave: false,
    saveUninitialized: true,
});
exports.default = router;
