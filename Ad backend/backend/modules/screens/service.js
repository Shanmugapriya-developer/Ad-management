const { ensureRequiredFields } = require("../../utils/validators");
const screensModel = require("./model");

const addScreen = async (payload) => {
  ensureRequiredFields(payload, ["theater_id", "name"]);

  const result = await screensModel.createScreen({
    theaterId: payload.theater_id,
    name: payload.name,
    screenType: payload.screen_type || null,
    capacity: payload.capacity || null,
  });

  return result.rows[0];
};

const listScreensByTheater = async (theaterId) => {
  const result = await screensModel.getScreensByTheater(theaterId);
  return result.rows;
};

module.exports = {
  addScreen,
  listScreensByTheater,
};
