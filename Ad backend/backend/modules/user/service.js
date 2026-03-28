const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const ApiError = require("../../utils/apiError");
const { ensureRequiredFields, ensureValidRole, ensureMobileNumber } = require("../../utils/validators");
const userModel = require("./model");

const ALLOWED_ROLES = ["admin", "theater_owner", "reseller", "user"];
let bcrypt;

try {
  bcrypt = require("bcryptjs");
} catch (error) {
  bcrypt = null;
}

const sanitizeUser = (user) => {
  const safeUser = {
    id: user.id,
    mobile: user.mobile,
    role: user.role || "user",
  };

  return safeUser;
};

const passwordsMatch = async (plainPassword, storedPassword) => {
  if (!storedPassword) {
    return false;
  }

  const looksHashed = storedPassword.startsWith("$2");

  if (looksHashed && bcrypt) {
    return bcrypt.compare(plainPassword, storedPassword);
  }

  return plainPassword === storedPassword;
};

const registerUser = async (payload) => {
  ensureRequiredFields(payload, ["mobile", "password"]);
  ensureMobileNumber(payload.mobile);

  if (payload.role) {
    ensureValidRole(payload.role, ALLOWED_ROLES);
  }

  const existingUser = await userModel.findByMobile(payload.mobile);
  if (existingUser.rows[0]) {
    throw new ApiError(409, "Mobile number already registered");
  }

  const result = await userModel.createUser({
    mobile: payload.mobile,
    password: payload.password,
    role: payload.role || "user",
  });

  return {
    user: sanitizeUser(result.rows[0]),
  };
};

const loginUser = async ({ mobile, password }) => {
  ensureRequiredFields({ mobile, password }, ["mobile", "password"]);
  ensureMobileNumber(mobile);

  const userResult = await userModel.findByMobile(mobile);
  const user = userResult.rows[0];

  if (!user) {
    throw new ApiError(401, "Invalid mobile or password");
  }

  const isValidPassword = await passwordsMatch(password, user.password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid mobile or password");
  }

  if (env.jwtSecret) {
    jwt.sign(
      {
        id: user.id,
        mobile: user.mobile,
        role: user.role || "user",
      },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn }
    );
  }

  return {
    user: sanitizeUser(user),
  };
};

module.exports = {
  registerUser,
  loginUser,
};
