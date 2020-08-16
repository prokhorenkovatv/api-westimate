"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const projects_1 = __importDefault(require("routes/projects"));
const default_features_1 = __importDefault(require("routes/default_features"));
const estimated_features_1 = __importDefault(require("routes/estimated_features"));
const admin_1 = __importDefault(require("routes/admin"));
const auth_1 = __importDefault(require("routes/auth"));
const user_1 = __importDefault(require("routes/user"));
const error_1 = require("middleware/error");
const errorResponse_1 = __importDefault(require("utils/errorResponse"));
const PORT = process.env.PORT || 3500;
const app = express_1.default();
dotenv_1.default.config();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, accept-language");
    next();
});
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/projects", projects_1.default);
app.use("/api/v1/default_features", default_features_1.default);
app.use("/api/v1/estimated_features", estimated_features_1.default);
app.use("/api/v1/users", user_1.default);
app.all("*", async (req, res, next) => {
    const err = new errorResponse_1.default(`${req.originalUrl} does not exist on the server`, 404);
    next(err);
});
app.use(error_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
