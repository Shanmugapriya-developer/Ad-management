const { ensureRequiredFields } = require("../../utils/validators");
const adsModel = require("./model");

const createAd = async (payload, currentUser) => {
  ensureRequiredFields(payload, ["title"]);

  const result = await adsModel.createAd({
    title: payload.title,
    description: payload.description || null,
    mediaUrl: payload.media_url || null,
    budget: payload.budget || null,
    status: payload.status || "draft",
    createdBy: currentUser.id,
    startDate: payload.start_date || null,
    endDate: payload.end_date || null,
  });

  return result.rows[0];
};

const listAds = async () => {
  const result = await adsModel.getAllAds();
  return result.rows;
};

module.exports = {
  createAd,
  listAds,
};
