const { ensureRequiredFields } = require("../../utils/validators");
const resellerModel = require("./model");

const calculateCommissionValue = (buyPrice, sellPrice) => {
  const safeBuy = Number(buyPrice || 0);
  const safeSell = Number(sellPrice || 0);
  return safeSell - safeBuy;
};

const buyAd = async (payload, currentUser) => {
  ensureRequiredFields(payload, ["ad_id", "buy_price"]);

  const result = await resellerModel.createTransaction({
    resellerId: currentUser.id,
    adId: payload.ad_id,
    transactionType: "buy",
    buyPrice: payload.buy_price,
    sellPrice: null,
    commission: 0,
    counterpartyName: payload.counterparty_name || null,
    notes: payload.notes || null,
  });

  return result.rows[0];
};

const sellAd = async (payload, currentUser) => {
  ensureRequiredFields(payload, ["ad_id", "buy_price", "sell_price"]);

  const commission = calculateCommissionValue(payload.buy_price, payload.sell_price);
  const result = await resellerModel.createTransaction({
    resellerId: currentUser.id,
    adId: payload.ad_id,
    transactionType: "sell",
    buyPrice: payload.buy_price,
    sellPrice: payload.sell_price,
    commission,
    counterpartyName: payload.counterparty_name || null,
    notes: payload.notes || null,
  });

  return result.rows[0];
};

const calculateCommission = async (payload) => {
  ensureRequiredFields(payload, ["buy_price", "sell_price"]);
  const commission = calculateCommissionValue(payload.buy_price, payload.sell_price);
  return { commission };
};

module.exports = {
  buyAd,
  sellAd,
  calculateCommission,
};
