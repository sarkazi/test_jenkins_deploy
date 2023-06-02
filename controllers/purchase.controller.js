const Purchase = require('../entities/Purchases');

class PurchaseController {
  constructor() {}

  createNew = async (objDB) => {
    return await Purchase.create(objDB);
  };

  findOne = async (paymentId) => {
    return await Purchase.findOne({ paymentId });
  };

  markAsPaid = async (paymentId) => {
    return await Purchase.updateOne({ paymentId }, { status: true });
  };
}

module.exports = new PurchaseController();
