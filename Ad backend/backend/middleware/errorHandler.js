const { errorResponse } = require("../utils/response");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  const details = err.details || null;

  if (statusCode >= 500) {
    console.error(err);
  }

  return errorResponse(res, message, details, statusCode);
};

module.exports = errorHandler;
