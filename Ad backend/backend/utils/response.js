const successResponse = (res, message, data = null, statusCode = 200) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

const errorResponse = (res, message, details = null, statusCode = 500) =>
  res.status(statusCode).json({
    success: false,
    message,
    details,
  });

module.exports = {
  successResponse,
  errorResponse,
};
