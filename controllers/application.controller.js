const Application = require('../entities/Appliction');

class ApplicationController {
  constructor() {}

  create = async ({
    name,
    email,
    phone,
    tariff,
    course,
    amount,
    telegram,
    id,
    hasInstallmentPlan,
  }) => {
    const objDB = {
      name,
      email,
      phone,
      ...(tariff && { tariff }),
      ...(telegram && { telegram }),
      course,
      amount,
      id,
      hasInstallmentPlan,
    };

    return await Application.create(objDB);
  };

  findById = async (id) => {
    return await Application.findOne({ id }, { _id: 0, __v: 0 });
  };

  updateById = async (id, objDB) => {
    await Application.updateOne({ id }, { $set: objDB });
  };
}

module.exports = new ApplicationController();
