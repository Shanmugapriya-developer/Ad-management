const ApiError = require("./apiError");

const ensureRequiredFields = (payload, fields) => {
  const missing = fields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || value === "";
  });

  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(", ")}`);
  }
};

const ensureValidRole = (role, allowedRoles) => {
  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, `Invalid role. Allowed roles: ${allowedRoles.join(", ")}`);
  }
};

const ensureMobileNumber = (mobile) => {
  if (!/^\d{10,15}$/.test(String(mobile || ""))) {
    throw new ApiError(400, "Invalid mobile number");
  }
};

module.exports = {
  ensureRequiredFields,
  ensureValidRole,
  ensureMobileNumber,
};
