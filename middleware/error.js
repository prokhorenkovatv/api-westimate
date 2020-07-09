const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.status = err.status || "error";

  res.status(error.statusCode || 500).json({
    status: err.status,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
