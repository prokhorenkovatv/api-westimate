"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
exports.errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    error.status = err.status || "error";
    res.status(error.statusCode || 500).json({
        status: err.status,
        error: error.message || "Server Error",
    });
};
