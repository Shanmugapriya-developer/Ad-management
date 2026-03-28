const ApiError = require("../../utils/apiError");
const { ensureRequiredFields } = require("../../utils/validators");
const theaterModel = require("./model");

const addTheater = async (payload, currentUser) => {
  ensureRequiredFields(payload, ["name", "location"]);

  const ownerId = payload.owner_id || currentUser.id;
  if (!ownerId) {
    throw new ApiError(400, "owner_id is required");
  }

  const result = await theaterModel.createTheater({
    name: payload.name,
    location: payload.location,
    ownerId,
  });

  return result.rows[0];
};

const listTheaters = async () => {
  const result = await theaterModel.getAllTheaters();
  return result.rows;
};

const listTheatersByOwner = async (ownerId, currentUser) => {
  if (currentUser.role !== "admin" && String(currentUser.id) !== String(ownerId)) {
    throw new ApiError(403, "You can only view your own theaters");
  }

  const result = await theaterModel.getTheatersByOwner(ownerId);
  return result.rows;
};

module.exports = {
  addTheater,
  listTheaters,
  listTheatersByOwner,
};
