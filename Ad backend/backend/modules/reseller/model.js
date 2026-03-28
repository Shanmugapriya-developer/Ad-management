const db = require("../../config/db");

const createTransaction = async ({
  resellerId,
  adId,
  transactionType,
  buyPrice,
  sellPrice,
  commission,
  counterpartyName,
  notes,
}) =>
  db.query(
    `INSERT INTO reseller_transactions
      (reseller_id, ad_id, transaction_type, buy_price, sell_price, commission, counterparty_name, notes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [resellerId, adId, transactionType, buyPrice, sellPrice, commission, counterpartyName, notes]
  );

module.exports = {
  createTransaction,
};
